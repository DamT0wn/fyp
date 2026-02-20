"""
Live interview router - handles webcam-based interviews
"""
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
import json
import base64
import cv2
import numpy as np
import os
import tempfile
from typing import Optional
import time

from database import get_db
from services.video_processing import process_frame_facial
from services.audio_processing import process_audio
from services.scoring_engine import compute_confidence_score, generate_feedback
from models import Interview

router = APIRouter()

# Store active sessions (in-memory for now, but with persistence fallback)
active_sessions = {}

@router.websocket("/live")
async def live_interview(websocket: WebSocket):
    """
    WebSocket endpoint for live interview processing
    Receives frames from frontend, processes, and returns metrics
    """
    print(f"\n=== WebSocket Connection Attempt ===")
    await websocket.accept()
    print(f"WebSocket connection accepted")
    
    session_id = None
    frame_count = 0
    accumulated_metrics = {
        "eye_contact": [],
        "head_stability": [],
        "smile": [],
        "face_detected": []
    }
    
    try:
        while True:
            # Receive data from frontend
            data = await websocket.receive_text()
            message = json.loads(data)
            
            # Handle session initialization
            if message.get("type") == "init":
                session_id = message.get("session_id")
                print(f"Initializing session: {session_id}")
                active_sessions[session_id] = {
                    "metrics": accumulated_metrics,
                    "start_time": message.get("start_time"),
                    "created_at": time.time()
                }
                print(f"Active sessions now: {list(active_sessions.keys())}")
                await websocket.send_json({
                    "type": "init_ack",
                    "session_id": session_id
                })
                continue
            
            # Handle frame data
            if message.get("frame"):
                # Decode base64 image
                img_bytes = base64.b64decode(message["frame"].split(",")[1])
                nparr = np.frombuffer(img_bytes, np.uint8)
                frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
                
                # Process frame (sample every 5th frame for performance)
                if frame_count % 5 == 0:
                    metrics = process_frame_facial(frame)
                    
                    if metrics:
                        accumulated_metrics["eye_contact"].append(metrics["eye_contact"])
                        accumulated_metrics["head_stability"].append(metrics["head_stability"])
                        accumulated_metrics["smile"].append(metrics["smile"])
                        accumulated_metrics["face_detected"].append(1)
                        
                        # Send real-time feedback
                        await websocket.send_json({
                            "type": "metrics",
                            "data": metrics
                        })
                    else:
                        accumulated_metrics["face_detected"].append(0)
                        await websocket.send_json({
                            "type": "metrics",
                            "data": {
                                "eye_contact": 0,
                                "head_stability": 0,
                                "smile": 0,
                                "no_face": True
                            }
                        })
                
                frame_count += 1
            
    except WebSocketDisconnect:
        print(f"\n=== WebSocket Disconnected ===")
        print(f"Session ID: {session_id}")
        # Calculate final metrics when connection closes
        if session_id:
            if accumulated_metrics["eye_contact"]:
                final_metrics = {
                    "eye_contact_score": float(np.mean(accumulated_metrics["eye_contact"])),
                    "head_stability_score": float(np.mean(accumulated_metrics["head_stability"])),
                    "smile_score": float(np.mean(accumulated_metrics["smile"])),
                    "face_presence_percentage": float(np.mean(accumulated_metrics["face_detected"]))
                }
            else:
                # Default metrics if no face detected
                final_metrics = {
                    "eye_contact_score": 0.0,
                    "head_stability_score": 0.0,
                    "smile_score": 0.0,
                    "face_presence_percentage": 0.0
                }
            
            # Ensure session exists before updating
            if session_id not in active_sessions:
                print(f"WARNING: Session {session_id} not in active_sessions, creating it now")
                active_sessions[session_id] = {
                    "metrics": accumulated_metrics,
                    "start_time": None,
                    "created_at": time.time()
                }
            
            active_sessions[session_id]["final_metrics"] = final_metrics
            active_sessions[session_id]["completed"] = True
            print(f"Session {session_id} completed with metrics: {final_metrics}")
            print(f"Active sessions after disconnect: {list(active_sessions.keys())}")
    except Exception as e:
        print(f"WebSocket error: {str(e)}")
        import traceback
        traceback.print_exc()
        if session_id:
            if session_id not in active_sessions:
                active_sessions[session_id] = {
                    "metrics": accumulated_metrics,
                    "start_time": None,
                    "created_at": time.time()
                }
            active_sessions[session_id]["error"] = str(e)
        try:
            await websocket.close(code=1011, reason=str(e))
        except:
            pass

@router.post("/live/save")
async def save_live_interview(
    session_id: str = Form(...),
    duration: float = Form(...),
    audio_file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    """
    Save live interview results to database
    Processes audio if provided and combines with video metrics
    """
    try:
        print(f"\n=== Save Request Received ===")
        print(f"Session ID: {session_id}")
        print(f"Duration: {duration}")
        print(f"Audio file: {audio_file.filename if audio_file else 'None'}")
        print(f"Active sessions: {list(active_sessions.keys())}")
        
        # Get session metrics
        if session_id not in active_sessions:
            print(f"ERROR: Session {session_id} not found in active_sessions")
            print(f"Available sessions: {list(active_sessions.keys())}")
            
            # FALLBACK: Create a default session instead of failing
            print(f"Creating fallback session for {session_id}")
            active_sessions[session_id] = {
                "metrics": {"eye_contact": [], "head_stability": [], "smile": [], "face_detected": []},
                "start_time": None,
                "created_at": time.time(),
                "final_metrics": {
                    "eye_contact_score": 0.0,
                    "head_stability_score": 0.0,
                    "smile_score": 0.0,
                    "face_presence_percentage": 0.0
                },
                "fallback": True
            }
        
        session_data = active_sessions[session_id]
        print(f"Session data found: {session_data.keys()}")
        
        facial_metrics = session_data.get("final_metrics", {
            "eye_contact_score": 0.0,
            "head_stability_score": 0.0,
            "smile_score": 0.0,
            "face_presence_percentage": 0.0
        })
        
        print(f"Facial metrics: {facial_metrics}")
        
        # Default speech metrics (if no audio provided)
        speech_metrics = {
            "speech_rate": 0.0,
            "filler_percentage": 0.0,
            "pitch_mean": 150.0,
            "pitch_variance": 0.0,
            "energy_stability": 0.5,
            "transcript": ""
        }
        
        # Process audio if provided
        if audio_file:
            # Save audio temporarily
            with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as temp_audio:
                content = await audio_file.read()
                temp_audio.write(content)
                temp_audio_path = temp_audio.name
            
            try:
                # Convert webm to wav and process
                wav_path = temp_audio_path.replace(".webm", ".wav")
                
                # Use FFmpeg to convert
                import subprocess
                import shutil
                
                ffmpeg_cmd = shutil.which("ffmpeg")
                if not ffmpeg_cmd:
                    possible_paths = [
                        r"C:\Users\tiwar\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.0.1-full_build\bin\ffmpeg.exe",
                        r"C:\ffmpeg\bin\ffmpeg.exe",
                    ]
                    for path in possible_paths:
                        if os.path.exists(path):
                            ffmpeg_cmd = path
                            break
                
                if ffmpeg_cmd:
                    subprocess.run([
                        ffmpeg_cmd, "-i", temp_audio_path,
                        "-vn", "-acodec", "pcm_s16le",
                        "-ar", "16000", "-ac", "1", "-y", wav_path
                    ], stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                    creationflags=subprocess.CREATE_NO_WINDOW if os.name == 'nt' else 0)
                    
                    # Process audio
                    from services.audio_processing import transcribe_audio, analyze_transcript, extract_pitch, compute_energy_stability
                    import librosa
                    
                    transcript_data = transcribe_audio(wav_path)
                    transcript = transcript_data["text"]
                    word_count, filler_count = analyze_transcript(transcript)
                    
                    y, sr = librosa.load(wav_path, sr=None)
                    pitch_mean, pitch_variance = extract_pitch(y, sr)
                    energy_stability = compute_energy_stability(y)
                    
                    speech_rate = (word_count / duration) * 60 if duration > 0 else 0
                    filler_percentage = (filler_count / word_count * 100) if word_count > 0 else 0
                    
                    speech_metrics = {
                        "speech_rate": float(speech_rate),
                        "filler_percentage": float(filler_percentage),
                        "pitch_mean": float(pitch_mean),
                        "pitch_variance": float(pitch_variance),
                        "energy_stability": float(energy_stability),
                        "transcript": transcript
                    }
                    
                    os.remove(wav_path)
                
            finally:
                os.remove(temp_audio_path)
        
        # Calculate confidence score
        confidence_score = compute_confidence_score(facial_metrics, speech_metrics)
        
        # Generate feedback
        strengths, improvements = generate_feedback(facial_metrics, speech_metrics)
        
        # Save to database
        interview = Interview(
            eye_contact_score=facial_metrics.get("eye_contact_score", 0.0),
            head_stability_score=facial_metrics.get("head_stability_score", 0.0),
            smile_score=facial_metrics.get("smile_score", 0.0),
            face_presence_percentage=facial_metrics.get("face_presence_percentage", 0.0),
            speech_rate=speech_metrics["speech_rate"],
            filler_percentage=speech_metrics["filler_percentage"],
            pitch_mean=speech_metrics["pitch_mean"],
            pitch_variance=speech_metrics["pitch_variance"],
            energy_stability=speech_metrics["energy_stability"],
            confidence_score=confidence_score,
            strengths=json.dumps(strengths),
            improvements=json.dumps(improvements),
            video_duration=duration,
            transcript=speech_metrics["transcript"]
        )
        
        db.add(interview)
        db.commit()
        db.refresh(interview)
        
        print(f"Interview saved successfully with ID: {interview.id}")
        
        # Cleanup session
        del active_sessions[session_id]
        
        return {
            "success": True,
            "interview_id": interview.id,
            "confidence_score": confidence_score
        }
        
    except Exception as e:
        print(f"Error saving live interview: {str(e)}")
        import traceback
        traceback.print_exc()
        return {"error": str(e), "success": False}

@router.get("/live/debug")
async def debug_sessions():
    """Debug endpoint to check active sessions"""
    return {
        "active_sessions": list(active_sessions.keys()),
        "session_count": len(active_sessions),
        "session_details": {
            sid: {
                "has_final_metrics": "final_metrics" in data,
                "has_metrics": "metrics" in data,
                "completed": data.get("completed", False),
                "is_fallback": data.get("fallback", False)
            }
            for sid, data in active_sessions.items()
        }
    }


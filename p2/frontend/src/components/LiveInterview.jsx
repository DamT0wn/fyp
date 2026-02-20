import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'

function LiveInterview() {
  const [isRecording, setIsRecording] = useState(false)
  const [metrics, setMetrics] = useState(null)
  const [duration, setDuration] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const [wsConnected, setWsConnected] = useState(false)
  
  const videoRef = useRef(null)
  const wsRef = useRef(null)
  const streamRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const frameIntervalRef = useRef(null)
  const timerIntervalRef = useRef(null)
  const startTimeRef = useRef(null)
  
  const navigate = useNavigate()

  const startRecording = async () => {
    try {
      // Check if browser supports required APIs
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Your browser does not support camera/microphone access. Please use a modern browser like Chrome, Firefox, or Edge.')
        return
      }

      // Get media stream with better error handling
      let stream
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }, 
          audio: {
            echoCancellation: true,
            noiseSuppression: true
          }
        })
      } catch (mediaError) {
        console.error('Media access error:', mediaError)
        if (mediaError.name === 'NotAllowedError' || mediaError.name === 'PermissionDeniedError') {
          alert('Camera/microphone access denied. Please allow permissions in your browser settings and try again.')
        } else if (mediaError.name === 'NotFoundError' || mediaError.name === 'DevicesNotFoundError') {
          alert('No camera or microphone found. Please connect a camera/microphone and try again.')
        } else if (mediaError.name === 'NotReadableError' || mediaError.name === 'TrackStartError') {
          alert('Camera/microphone is already in use by another application. Please close other apps and try again.')
        } else {
          alert(`Could not access camera/microphone: ${mediaError.message}`)
        }
        return
      }
      
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      // Generate session ID
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      console.log('Generated session ID:', newSessionId)
      setSessionId(newSessionId)
      startTimeRef.current = Date.now()

      // Setup audio recording
      audioChunksRef.current = []
      
      // Check for supported MIME types with better fallbacks
      let mimeType = 'audio/webm;codecs=opus'
      const supportedTypes = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/ogg;codecs=opus',
        'audio/mp4',
        'audio/mpeg',
        ''  // Empty string means use browser default
      ]
      
      for (const type of supportedTypes) {
        if (type === '' || MediaRecorder.isTypeSupported(type)) {
          mimeType = type
          console.log('Using MIME type:', mimeType || 'browser default')
          break
        }
      }
      
      try {
        if (mimeType) {
          mediaRecorderRef.current = new MediaRecorder(stream, { mimeType })
        } else {
          mediaRecorderRef.current = new MediaRecorder(stream)
        }
        
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data)
          }
        }
        
        mediaRecorderRef.current.start(1000) // Collect data every second
        console.log('✅ Audio recording started')
      } catch (recorderError) {
        console.error('MediaRecorder error:', recorderError)
        alert('Audio recording is not supported in your browser. The interview will continue without audio analysis.')
        // Continue without audio recording
        mediaRecorderRef.current = null
      }

      // Connect to WebSocket for real-time facial analysis
      try {
        console.log('🔌 Attempting WebSocket connection to: ws://localhost:8000/api/live')
        wsRef.current = new WebSocket('ws://localhost:8000/api/live')
        
        wsRef.current.onopen = () => {
          console.log('✅ WebSocket connected successfully')
          setWsConnected(true)
          // Initialize session
          const initMessage = {
            type: 'init',
            session_id: newSessionId,
            start_time: startTimeRef.current
          }
          console.log('📤 Sending init message:', initMessage)
          wsRef.current.send(JSON.stringify(initMessage))
        }
        
        wsRef.current.onmessage = (event) => {
          const data = JSON.parse(event.data)
          console.log('📥 WebSocket message received:', data.type)
          if (data.type === 'metrics') {
            setMetrics(data.data)
          } else if (data.type === 'init_ack') {
            console.log('✅ Session initialized on backend:', data.session_id)
          }
        }

        wsRef.current.onerror = (error) => {
          console.error('❌ WebSocket error:', error)
          console.log('⚠️ Continuing without real-time facial analysis')
          setWsConnected(false)
        }

        wsRef.current.onclose = (event) => {
          console.log('🔌 WebSocket closed. Code:', event.code, 'Reason:', event.reason)
          setWsConnected(false)
        }
      } catch (wsError) {
        console.error('Failed to create WebSocket:', wsError)
        console.log('⚠️ Continuing without real-time facial analysis')
      }

      setIsRecording(true)
      
      // Start timer
      timerIntervalRef.current = setInterval(() => {
        setDuration(Math.floor((Date.now() - startTimeRef.current) / 1000))
      }, 1000)
      
      // Send frames periodically if WebSocket is connected
      try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        if (ctx) {
          const sendFrame = () => {
            if (!videoRef.current || videoRef.current.readyState !== videoRef.current.HAVE_ENOUGH_DATA) {
              return
            }
            
            if (wsRef.current?.readyState === WebSocket.OPEN) {
              canvas.width = videoRef.current.videoWidth
              canvas.height = videoRef.current.videoHeight
              ctx.drawImage(videoRef.current, 0, 0)
              
              const frameData = canvas.toDataURL('image/jpeg', 0.8)
              wsRef.current.send(JSON.stringify({ frame: frameData }))
            }
          }
          
          frameIntervalRef.current = setInterval(sendFrame, 200)
        }
      } catch (canvasError) {
        console.error('Failed to setup canvas:', canvasError)
        console.log('⚠️ Continuing without frame capture')
      }
      
    } catch (err) {
      console.error('Error starting recording:', err)
      alert('An unexpected error occurred. Please try again.')
    }
  }

  const stopRecording = () => {
    console.log('⏹️ Stopping recording...')
    // Stop all intervals
    if (frameIntervalRef.current) {
      clearInterval(frameIntervalRef.current)
      frameIntervalRef.current = null
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
      timerIntervalRef.current = null
    }
    
    // Stop media recorder
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop()
        console.log('🎤 Audio recording stopped')
      } catch (e) {
        console.log('Audio recorder already stopped')
      }
    }
    
    // Stop stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      console.log('📹 Camera stream stopped')
    }
    
    // Close WebSocket
    if (wsRef.current) {
      if (wsRef.current.readyState === WebSocket.OPEN) {
        console.log('🔌 Closing WebSocket connection...')
        wsRef.current.close()
      }
      wsRef.current = null
    }
    
    setIsRecording(false)
    setWsConnected(false)
    console.log('✅ Recording stopped successfully')
  }

  const saveInterview = async () => {
    if (!sessionId) {
      alert('No session to save')
      return
    }

    setIsSaving(true)
    
    try {
      // Wait longer for WebSocket disconnect to complete on backend
      console.log('Waiting for session to finalize...')
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Create audio blob
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
      console.log('Audio blob size:', audioBlob.size, 'bytes')
      
      // Prepare form data
      const formData = new FormData()
      formData.append('session_id', sessionId)
      formData.append('duration', duration.toString())
      
      if (audioBlob.size > 0) {
        formData.append('audio_file', audioBlob, 'interview_audio.webm')
      }
      
      console.log('Sending save request for session:', sessionId)
      
      // Send to backend with retry logic
      let retries = 3
      let response = null
      
      while (retries > 0) {
        try {
          response = await api.post('/live/save', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            timeout: 30000 // 30 second timeout
          })
          break // Success, exit retry loop
        } catch (error) {
          retries--
          if (retries > 0) {
            console.log(`Save failed, retrying... (${retries} attempts left)`)
            await new Promise(resolve => setTimeout(resolve, 1000))
          } else {
            throw error
          }
        }
      }
      
      if (response && response.data.success) {
        console.log('Interview saved successfully:', response.data.interview_id)
        // Navigate to results page
        navigate(`/results/${response.data.interview_id}`)
      } else {
        const errorMsg = response?.data?.error || 'Unknown error'
        console.error('Save failed:', errorMsg)
        alert('Failed to save interview: ' + errorMsg)
      }
      
    } catch (error) {
      console.error('Error saving interview:', error)
      if (error.response) {
        alert(`Failed to save interview: ${error.response.data?.error || error.message}`)
      } else if (error.request) {
        alert('Failed to save interview: No response from server. Please check if the backend is running.')
      } else {
        alert('Failed to save interview: ' + error.message)
      }
    } finally {
      setIsSaving(false)
      // Reset state
      setSessionId(null)
      setDuration(0)
      setMetrics(null)
      audioChunksRef.current = []
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (frameIntervalRef.current) clearInterval(frameIntervalRef.current)
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
      if (wsRef.current) wsRef.current.close()
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop()
      }
    }
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Cache buster: 20260220-1610 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Live Interview Mode (v2.0)</h2>
        <div className="flex items-center gap-4">
          {wsConnected && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span>Ready</span>
            </div>
          )}
          {isRecording && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-lg font-mono font-semibold">{formatTime(duration)}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ height: '400px' }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          {!isRecording && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
              <div className="text-center">
                <p className="text-white text-lg mb-2">Camera preview will appear here</p>
                <p className="text-gray-400 text-sm">Click "Start Live Interview" to begin</p>
              </div>
            </div>
          )}
          {isRecording && metrics?.no_face && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-4 py-2 rounded-md">
              ⚠️ No face detected
            </div>
          )}
        </div>

        {metrics && !metrics.no_face && (
          <div className="grid grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-gray-600">Eye Contact</p>
              <p className="text-2xl font-bold text-blue-600">
                {(metrics.eye_contact * 100).toFixed(0)}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Stability</p>
              <p className="text-2xl font-bold text-blue-600">
                {(metrics.head_stability * 100).toFixed(0)}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Smile</p>
              <p className="text-2xl font-bold text-blue-600">
                {(metrics.smile * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          {!isRecording && !sessionId && (
            <button
              onClick={startRecording}
              className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md
                hover:bg-green-700 transition-colors duration-200 font-semibold"
            >
              Start Live Interview
            </button>
          )}
          
          {isRecording && (
            <button
              onClick={stopRecording}
              className="flex-1 bg-red-600 text-white py-3 px-4 rounded-md
                hover:bg-red-700 transition-colors duration-200 font-semibold"
            >
              Stop Recording
            </button>
          )}
          
          {!isRecording && sessionId && (
            <>
              <button
                onClick={saveInterview}
                disabled={isSaving}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md
                  hover:bg-blue-700 transition-colors duration-200 font-semibold
                  disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save & View Results'}
              </button>
              <button
                onClick={() => {
                  setSessionId(null)
                  setDuration(0)
                  setMetrics(null)
                  audioChunksRef.current = []
                }}
                disabled={isSaving}
                className="px-6 bg-gray-300 text-gray-700 py-3 rounded-md
                  hover:bg-gray-400 transition-colors duration-200 font-semibold
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Discard
              </button>
            </>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700 font-semibold mb-2">📌 Tips for best results:</p>
          <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
            <li>Ensure good lighting on your face</li>
            <li>Look directly at the camera for eye contact</li>
            <li>Keep your head stable and centered</li>
            <li>Speak clearly into the microphone</li>
            <li>Record for at least 30 seconds for accurate analysis</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default LiveInterview

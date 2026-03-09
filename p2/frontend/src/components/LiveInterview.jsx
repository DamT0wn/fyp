import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, SkipForward, FileText, Briefcase } from 'lucide-react'
import { startAIInterview, submitAnswer, completeInterview } from '../api/api'
import api from '../api/api'

function LiveInterview() {
  const [step, setStep] = useState('setup')
  const [resume, setResume] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [numQuestions, setNumQuestions] = useState(5)
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiSessionId, setAiSessionId] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [isRecording, setIsRecording] = useState(false)
  const [metrics, setMetrics] = useState(null)
  const [duration, setDuration] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const [wsConnected, setWsConnected] = useState(false)
  const [faceDetectionCount, setFaceDetectionCount] = useState(0)
  const [totalFramesProcessed, setTotalFramesProcessed] = useState(0)
  const [currentEmotion, setCurrentEmotion] = useState(null)
  const [emotionConfidence, setEmotionConfidence] = useState(0)
  const [sessionId, setSessionId] = useState(null)
  
  // Results state
  const [overallResults, setOverallResults] = useState(null)
  
  const videoRef = useRef(null)
  const wsRef = useRef(null)
  const streamRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const frameIntervalRef = useRef(null)
  const timerIntervalRef = useRef(null)
  const startTimeRef = useRef(null)
  
  const navigate = useNavigate()

  const handleStartInterview = async (e) => {
    e.preventDefault()
    
    if (!resume) {
      alert('Please upload your resume first')
      return
    }
    
    if (!jobDescription.trim()) {
      alert('Please provide the job description for the company you want to interview with')
      return
    }
    setIsGenerating(true)
    try {
      const formData = new FormData()
      formData.append('resume', resume)
      formData.append('job_description', jobDescription)
      formData.append('num_questions', numQuestions)
      
      console.log('Starting AI interview with:', {
        resume: resume.name,
        jobDescLength: jobDescription.length,
        numQuestions
      })
      
      const response = await api.post('/ai-interview/start', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      
      console.log('Interview started:', response.data)
      
      if (response.data.success) {
        setAiSessionId(response.data.session_id)
        setQuestions(response.data.questions)
        setStep('interview')
        // Auto-start the interview after questions are generated
        setTimeout(() => startInterview(), 500)
      }
    } catch (error) {
      console.error('Error starting interview:', error)
      const errorMsg = error.response?.data?.detail || error.message || 'Failed to start interview'
      alert(`Error: ${errorMsg}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const startInterview = async () => {
    try {
      // Try to get camera and microphone with higher quality settings
      let stream = null
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 1920, min: 1280 }, 
            height: { ideal: 1080, min: 720 },
            facingMode: 'user',
            frameRate: { ideal: 30 }
          }, 
          audio: { 
            echoCancellation: true, 
            noiseSuppression: true,
            autoGainControl: true,
            sampleRate: 48000
          }
        })
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          // Mirror the video for natural self-view
          videoRef.current.style.transform = 'scaleX(-1)'
        }

        // Generate session ID for facial analysis
        const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        setSessionId(newSessionId)

        // Setup WebSocket for facial analysis
        try {
          wsRef.current = new WebSocket('ws://localhost:8000/api/live')
          wsRef.current.onopen = () => {
            setWsConnected(true)
            wsRef.current.send(JSON.stringify({ type: 'init', session_id: newSessionId, start_time: Date.now() }))
          }
          wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data)
            if (data.type === 'metrics') {
              setMetrics(data.data)
              setTotalFramesProcessed(prev => prev + 1)
              if (!data.data.no_face) {
                setFaceDetectionCount(prev => prev + 1)
              }
              
              // Debug: Log all received data
              console.log('📊 Metrics received:', {
                eye_contact: data.data.eye_contact,
                engagement: data.data.engagement,
                has_emotion: !!data.data.emotion,
                emotion: data.data.emotion,
                emotion_confidence: data.data.emotion_confidence
              })
              
              // Update emotion state if available
              if (data.data.emotion) {
                console.log('🎭 Emotion received:', data.data.emotion, 'Confidence:', data.data.emotion_confidence)
                setCurrentEmotion(data.data.emotion)
                setEmotionConfidence(data.data.emotion_confidence || 0)
              } else {
                console.log('⚠️ No emotion in this frame')
              }
            }
          }
          wsRef.current.onerror = () => {
            console.log('WebSocket error - continuing without facial analysis')
          }
          wsRef.current.onerror = () => console.log('WebSocket error')
        } catch (wsError) {
          console.log('Could not connect WebSocket')
        }

        // Send video frames if WebSocket connected (higher frequency for better accuracy)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        frameIntervalRef.current = setInterval(() => {
          if (videoRef.current && wsRef.current?.readyState === WebSocket.OPEN) {
            canvas.width = videoRef.current.videoWidth
            canvas.height = videoRef.current.videoHeight
            // Flip the canvas horizontally to match the mirrored video
            ctx.save()
            ctx.scale(-1, 1)
            ctx.drawImage(videoRef.current, -canvas.width, 0, canvas.width, canvas.height)
            ctx.restore()
            wsRef.current.send(JSON.stringify({ frame: canvas.toDataURL('image/jpeg', 0.85) }))
          }
        }, 150)  // Send frames every 150ms for better accuracy
      } catch (mediaError) {
        console.error('Media access error:', mediaError)
        const proceed = confirm('Could not access camera/microphone. Continue without video?')
        if (!proceed) return
      }
      startTimeRef.current = Date.now()
      startQuestionRecording()
    } catch (error) {
      console.error('Error starting interview:', error)
      alert('Failed to start interview: ' + error.message)
    }
  }

  const startQuestionRecording = () => {
    audioChunksRef.current = []
    if (!startTimeRef.current) startTimeRef.current = Date.now()
    if (streamRef.current) {
      try {
        const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' : 'audio/webm'
        mediaRecorderRef.current = new MediaRecorder(streamRef.current, { mimeType })
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) audioChunksRef.current.push(event.data)
        }
        mediaRecorderRef.current.start(1000)
      } catch (error) {
        console.error('Could not start MediaRecorder:', error)
      }
    }
    setIsRecording(true)
    setDuration(0)
    timerIntervalRef.current = setInterval(() => {
      setDuration(Math.floor((Date.now() - startTimeRef.current) / 1000))
    }, 1000)
  }

  const finishQuestion = async () => {
    // Check face detection rate
    const facePresenceRate = totalFramesProcessed > 0 ? faceDetectionCount / totalFramesProcessed : 0
    
    if (facePresenceRate < 0.5) {
      const proceed = confirm(
        `⚠️ WARNING: Your face was only detected in ${(facePresenceRate * 100).toFixed(0)}% of frames.\n\n` +
        `This will result in a score of 0 for this question.\n\n` +
        `Recommendations:\n` +
        `• Ensure your camera is not blocked\n` +
        `• Improve lighting on your face\n` +
        `• Position yourself clearly in frame\n` +
        `• Check camera permissions\n\n` +
        `Do you want to continue anyway?`
      )
      
      if (!proceed) {
        return
      }
    }
    
    if (duration < 5) {
      alert('Please answer for at least 5 seconds')
      return
    }
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }
    setIsRecording(false)
    await new Promise(resolve => setTimeout(resolve, 500))
    setIsSaving(true)
    try {
      let response
      if (audioChunksRef.current.length > 0) {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        response = await submitAnswer(aiSessionId, currentQuestionIndex, audioBlob, null, duration)
      } else {
        response = await submitAnswer(aiSessionId, currentQuestionIndex, null, `Answer ${currentQuestionIndex + 1}`, duration)
      }
      if (response.success) {
        setAnswers([...answers, {
          question: questions[currentQuestionIndex].question,
          answer: response.answer_text,
          score: response.analysis.score,
          feedback: response.analysis.feedback
        }])
      }
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        // Reset face detection counters for next question
        setFaceDetectionCount(0)
        setTotalFramesProcessed(0)
        setTimeout(() => startQuestionRecording(), 1000)
      } else {
        finishInterview()
      }
    } catch (error) {
      console.error('Error submitting answer:', error)
      alert('Failed to submit answer')
    } finally {
      setIsSaving(false)
    }
  }

  const finishInterview = async () => {
    if (frameIntervalRef.current) clearInterval(frameIntervalRef.current)
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') mediaRecorderRef.current.stop()
    if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop())
    if (wsRef.current) wsRef.current.close()
    setIsRecording(false)
    setWsConnected(false)
    try {
      const response = await completeInterview(aiSessionId)
      if (response.success) {
        setOverallResults(response.overall_results)
        setAnswers(response.detailed_answers)
        setStep('results')
      }
    } catch (error) {
      console.error('Error completing interview:', error)
      alert('Failed to get results')
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    return () => {
      if (frameIntervalRef.current) clearInterval(frameIntervalRef.current)
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
      if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop())
      if (wsRef.current) wsRef.current.close()
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') mediaRecorderRef.current.stop()
    }
  }, [])


  return (
    <AnimatePresence mode="wait">
      {step === 'setup' && (
        <form onSubmit={handleStartInterview} className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-blue-800 font-semibold mb-2">
              📌 How it works:
            </p>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Upload your resume (PDF, DOCX, or TXT)</li>
              <li>Enter the job description for the company you're targeting</li>
              <li>Our AI will scan your resume and generate personalized interview questions</li>
              <li>Answer questions via video while we analyze your performance</li>
            </ol>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Resume (PDF, DOCX, or TXT)
            </label>
            <input
              type="file"
              accept=".pdf,.docx,.doc,.txt"
              onChange={(e) => setResume(e.target.files[0])}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0 file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
            {resume && (
              <p className="mt-2 text-sm text-green-600">✓ {resume.name}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description / Company & Role
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste the job description here, or describe the company and role you're interviewing for (e.g., 'Software Engineer at Google - Full stack development with React and Python')..."
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              The AI will analyze your resume against this job description to generate relevant questions
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Number of Questions
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[3, 5, 7].map((num) => (
                <motion.button
                  key={num}
                  type="button"
                  onClick={() => setNumQuestions(num)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`py-3 px-4 rounded-md font-semibold transition-all ${
                    numQuestions === num
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {num}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isGenerating || !resume || !jobDescription.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 
              transition-colors duration-200 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing Resume & Generating Questions...
              </span>
            ) : (
              '🚀 Generate Questions & Start Interview'
            )}
          </motion.button>
        </form>
      )}

      {step === 'interview' && (
        <div className="space-y-4">
          {/* Interview Context Summary */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm font-semibold text-gray-800 mb-2">📋 Interview Context:</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600">Resume:</span>
                <span className="ml-2 font-medium text-gray-900">{resume?.name}</span>
              </div>
              <div>
                <span className="text-gray-600">Questions:</span>
                <span className="ml-2 font-medium text-gray-900">{questions.length} personalized questions</span>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-gray-600 text-sm">Target Role:</span>
              <p className="text-gray-900 font-medium text-sm mt-1 line-clamp-2">{jobDescription.substring(0, 150)}...</p>
            </div>
          </div>
          
          {/* Question Display */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg">
            <p className="text-sm mb-1 opacity-90">
              Question {currentQuestionIndex + 1} of {questions.length} • Based on your resume
            </p>
            <p className="text-lg font-medium">
              {questions[currentQuestionIndex]?.question}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs px-2 py-1 bg-white bg-opacity-20 rounded">
                Type: {questions[currentQuestionIndex]?.type}
              </span>
              {questions[currentQuestionIndex]?.topic && (
                <span className="text-xs px-2 py-1 bg-white bg-opacity-20 rounded">
                  Topic: {questions[currentQuestionIndex]?.topic}
                </span>
              )}
            </div>
          </div>
          
          {/* Video Preview */}
          <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl" style={{ height: '480px' }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(1.05) contrast(1.05)' }}
            />
            {!isRecording && answers.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-600 flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-white text-lg mb-2">Ready to start your interview</p>
                  <p className="text-gray-400 text-sm">Click "Start Interview" below</p>
                </div>
              </div>
            )}
            {isRecording && metrics?.no_face && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-900 bg-opacity-90">
                <div className="text-center p-8">
                  <svg className="w-20 h-20 text-white mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-white text-2xl font-bold mb-2">⚠️ Camera Blocked or No Face Detected</p>
                  <p className="text-white text-lg mb-4">Your interview cannot be scored without visible face detection</p>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4 text-left">
                    <p className="text-white font-semibold mb-2">Please ensure:</p>
                    <ul className="text-white space-y-1">
                      <li>• Camera is not blocked or covered</li>
                      <li>• Your face is clearly visible</li>
                      <li>• Adequate lighting on your face</li>
                      <li>• You are centered in the frame</li>
                      <li>• Camera permissions are granted</li>
                    </ul>
                  </div>
                  <p className="text-yellow-300 text-sm mt-4 font-semibold">
                    ⚠️ Scores will be 0 if face is not detected during recording
                  </p>
                </div>
              </div>
            )}
            {isRecording && metrics && !metrics.no_face && (
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {metrics.eye_contact < 0.5 && (
                  <div className="bg-blue-600 bg-opacity-90 text-white px-3 py-1 rounded-md text-sm">
                    💡 Look at the camera
                  </div>
                )}
                {metrics.centering && metrics.centering < 0.6 && (
                  <div className="bg-purple-600 bg-opacity-90 text-white px-3 py-1 rounded-md text-sm">
                    💡 Center yourself in frame
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Real-time Metrics */}
          {metrics && !metrics.no_face && (
            <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1">Confidence</p>
                <div className="relative w-16 h-16 mx-auto">
                  <svg className="transform -rotate-90 w-16 h-16">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="#e5e7eb"
                      strokeWidth="6"
                      fill="none"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="#3b82f6"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${(metrics.eye_contact * 100 * 175.93) / 100} 175.93`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-blue-600">
                      {(metrics.eye_contact * 100).toFixed(0)}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Eye Contact</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1">Clarity</p>
                <div className="relative w-16 h-16 mx-auto">
                  <svg className="transform -rotate-90 w-16 h-16">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="#e5e7eb"
                      strokeWidth="6"
                      fill="none"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="#8b5cf6"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${(metrics.head_stability * 100 * 175.93) / 100} 175.93`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-purple-600">
                      {(metrics.head_stability * 100).toFixed(0)}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Composure</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1">Engagement</p>
                <div className="relative w-16 h-16 mx-auto">
                  <svg className="transform -rotate-90 w-16 h-16">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="#e5e7eb"
                      strokeWidth="6"
                      fill="none"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="#10b981"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${((metrics.engagement || metrics.smile) * 100 * 175.93) / 100} 175.93`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-green-600">
                      {((metrics.engagement || metrics.smile) * 100).toFixed(0)}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Expression</p>
              </div>
            </div>
          )}

          {/* Emotion Detection Display - ALWAYS VISIBLE FOR TESTING */}
          <div style={{
            padding: '20px',
            background: 'linear-gradient(to right, #faf5ff, #fce7f3)',
            border: '4px solid #9333ea',
            borderRadius: '8px',
            marginTop: '16px',
            marginBottom: '16px',
            boxShadow: '0 10px 40px rgba(147, 51, 234, 0.5)'
          }}>
            <h3 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#581c87',
              marginBottom: '16px'
            }}>
              🎭 EMOTION DETECTION - ALWAYS VISIBLE TEST
            </h3>
            <p style={{ color: '#1f2937', marginBottom: '8px' }}>
              isRecording: {isRecording ? 'TRUE ✅' : 'FALSE ❌'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '48px' }}>
                {currentEmotion === 'happy' && '😊'}
                {currentEmotion === 'sad' && '😢'}
                {currentEmotion === 'angry' && '😠'}
                {currentEmotion === 'surprise' && '😲'}
                {currentEmotion === 'fear' && '😨'}
                {currentEmotion === 'disgust' && '🤢'}
                {currentEmotion === 'neutral' && '😐'}
                {!currentEmotion && '⏳'}
              </span>
              <div>
                <p style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
                  Emotion: {currentEmotion || 'Detecting...'}
                </p>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>
                  Confidence: {emotionConfidence ? emotionConfidence.toFixed(1) : '0.0'}%
                </p>
              </div>
            </div>
          </div>
          
          {/* Debug Display - Remove after testing */}
          {isRecording && (
            <div className="p-2 bg-gray-100 rounded text-xs">
              <p>Debug: currentEmotion = {currentEmotion || 'null'}</p>
              <p>Debug: emotionConfidence = {emotionConfidence}</p>
              <p>Debug: isRecording = {isRecording ? 'true' : 'false'}</p>
              <p>Debug: Condition met = {(currentEmotion && isRecording) ? 'YES' : 'NO'}</p>
            </div>
          )}
          
          {/* Face Detection Status */}
          {isRecording && totalFramesProcessed > 10 && (
            <div className={`p-3 rounded-lg border ${
              (faceDetectionCount / totalFramesProcessed) >= 0.8 ? 'bg-green-50 border-green-200' :
              (faceDetectionCount / totalFramesProcessed) >= 0.5 ? 'bg-yellow-50 border-yellow-200' :
              'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className={`w-5 h-5 ${
                    (faceDetectionCount / totalFramesProcessed) >= 0.8 ? 'text-green-600' :
                    (faceDetectionCount / totalFramesProcessed) >= 0.5 ? 'text-yellow-600' :
                    'text-red-600'
                  }`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className={`text-sm font-semibold ${
                    (faceDetectionCount / totalFramesProcessed) >= 0.8 ? 'text-green-800' :
                    (faceDetectionCount / totalFramesProcessed) >= 0.5 ? 'text-yellow-800' :
                    'text-red-800'
                  }`}>
                    Face Detection: {((faceDetectionCount / totalFramesProcessed) * 100).toFixed(0)}%
                  </span>
                </div>
                <span className={`text-xs ${
                  (faceDetectionCount / totalFramesProcessed) >= 0.8 ? 'text-green-600' :
                  (faceDetectionCount / totalFramesProcessed) >= 0.5 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {(faceDetectionCount / totalFramesProcessed) >= 0.8 ? 'Excellent' :
                   (faceDetectionCount / totalFramesProcessed) >= 0.5 ? 'Fair - Improve positioning' :
                   'Poor - Scores will be 0'}
                </span>
              </div>
            </div>
          )}

            {/* Controls */}
            <div className="flex space-x-3">
              {!isRecording && answers.length === 0 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startInterview}
                  className="flex-1 px-6 py-3 bg-gradient-accent text-white rounded-xl font-semibold 
                    flex items-center justify-center space-x-2 professional-glow"
                >
                  <Play className="w-5 h-5" />
                  <span>Start Interview</span>
                </motion.button>
              ) : isRecording && !isSaving ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={finishQuestion}
                  disabled={duration < 5}
                  className="flex-1 px-6 py-3 glass glass-hover text-white rounded-xl font-semibold 
                    flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <SkipForward className="w-5 h-5" />
                  <span>{duration < 5 ? `Wait ${5 - duration}s` : 'Next Question'}</span>
                </motion.button>
              ) : isSaving ? (
                <div className="flex-1 px-6 py-3 glass text-white rounded-xl font-semibold 
                  flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing...</span>
                </div>
              ) : null}
            </div>

            {answers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 bg-green-500/10 border border-green-500/30 rounded-xl p-3"
              >
                <div className="flex items-center space-x-2 text-sm text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>{answers.length} of {questions.length} questions answered</span>
                </div>
              </motion.div>
            )}

          {/* Right Panel - User Video */}
          <div className="glass rounded-2xl p-8 border border-white/10">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">Your Video</h3>
                <p className="text-sm text-gray-400">AI is analyzing in real-time</p>
              </div>
              {wsConnected && (
                <div className="flex items-center space-x-2 text-sm text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Live</span>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700 font-semibold mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Interview Tips:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>Look directly at the camera for strong eye contact</li>
                <li>Position yourself centered in the frame</li>
                <li>Speak clearly at a natural pace (120-160 words/min)</li>
                <li>Minimize filler words like "um", "uh", "like"</li>
                <li>Show natural expressions and maintain good posture</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {step === 'results' && overallResults && (
        <motion.div
          key="results"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-2xl"
          >
            <div className="text-center mb-6">
              <span className="text-6xl mb-4 block">🎉</span>
              <h3 className="text-3xl font-bold mb-2">Interview Complete!</h3>
              <p className="text-blue-100">Here's how you performed</p>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-5xl font-bold mb-2">{overallResults.overall_score}</p>
                <p className="text-sm opacity-90">Overall</p>
              </div>
              <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-5xl font-bold mb-2">{overallResults.technical_score}</p>
                <p className="text-sm opacity-90">Technical</p>
              </div>
              <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-5xl font-bold mb-2">{overallResults.behavioral_score}</p>
                <p className="text-sm opacity-90">Behavioral</p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-white">Detailed Feedback</h4>
            {answers.map((answer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-6 border border-white/10"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white mb-3">{answer.question}</p>
                    <p className="text-sm text-gray-400 mb-4">{answer.answer?.substring(0, 150)}...</p>
                    <div className="flex items-center space-x-4">
                      <span className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                        answer.score >= 80 ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        answer.score >= 60 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                        'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        Score: {answer.score}/100
                      </span>
                      <p className="text-sm text-gray-400">{answer.feedback}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex space-x-4">
            <motion.button
              onClick={() => {
                setStep('setup')
                setAiSessionId(null)
                setQuestions([])
                setCurrentQuestionIndex(0)
                setAnswers([])
                setOverallResults(null)
                setResume(null)
                setJobDescription('')
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-6 py-3 bg-gradient-accent text-white rounded-xl font-semibold professional-glow"
            >
              Start New Interview
            </motion.button>
            <motion.button
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-6 py-3 glass glass-hover text-white rounded-xl font-semibold"
            >
              Back to Home
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LiveInterview

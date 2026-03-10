import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Video, Mic, MicOff, VideoOff, Play, Square, SkipForward, ArrowLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PolishedNavbar from '../components/PolishedNavbar';

const LiveInterview = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(0);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const videoRef = useRef(null);
  
  // Emotion detection state
  const [currentEmotion, setCurrentEmotion] = useState(null);
  const [emotionConfidence, setEmotionConfidence] = useState(0);
  const [wsConnected, setWsConnected] = useState(false);
  const wsRef = useRef(null);
  const frameIntervalRef = useRef(null);

  const questions = [
    "Tell me about yourself and your background.",
    "What interests you about this role?",
    "Describe a challenging project you've worked on.",
    "How do you handle tight deadlines?",
    "Where do you see yourself in 5 years?"
  ];

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Countdown effect
  useEffect(() => {
    let countdownInterval;
    if (showCountdown && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (showCountdown && countdown === 0) {
      setShowCountdown(false);
      setCountdown(3);
      handleStartRecording();
    }
    return () => clearInterval(countdownInterval);
  }, [showCountdown, countdown]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (frameIntervalRef.current) {
        clearInterval(frameIntervalRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    // Initialize webcam
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          
          // Setup WebSocket for emotion detection
          try {
            const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            wsRef.current = new WebSocket('ws://localhost:8000/api/live');
            
            wsRef.current.onopen = () => {
              console.log('WebSocket connected for emotion detection');
              setWsConnected(true);
              wsRef.current.send(JSON.stringify({
                type: 'init',
                session_id: sessionId,
                start_time: Date.now()
              }));
            };
            
            wsRef.current.onmessage = (event) => {
              const data = JSON.parse(event.data);
              if (data.type === 'metrics' && data.data.emotion) {
                console.log('Emotion received:', data.data.emotion, data.data.emotion_confidence);
                setCurrentEmotion(data.data.emotion);
                setEmotionConfidence(data.data.emotion_confidence || 0);
              }
            };
            
            wsRef.current.onerror = (error) => {
              console.log('WebSocket error:', error);
            };
            
            // Send video frames for emotion detection
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            frameIntervalRef.current = setInterval(() => {
              if (videoRef.current && wsRef.current?.readyState === WebSocket.OPEN) {
                canvas.width = videoRef.current.videoWidth;
                canvas.height = videoRef.current.videoHeight;
                ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                wsRef.current.send(JSON.stringify({ 
                  frame: canvas.toDataURL('image/jpeg', 0.8) 
                }));
              }
            }, 200); // Send frame every 200ms
            
          } catch (wsError) {
            console.log('Could not connect WebSocket:', wsError);
          }
        })
        .catch(err => console.error('Error accessing media devices:', err));
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    // Close WebSocket
    if (frameIntervalRef.current) {
      clearInterval(frameIntervalRef.current);
    }
    if (wsRef.current) {
      wsRef.current.close();
      setWsConnected(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <PolishedNavbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-4 group transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span>Home</span>
              <ChevronRight className="w-4 h-4 mx-2 text-gray-600" />
              <span>Live Interview</span>
            </Link>
            <h1 className="text-4xl font-bold mb-2">Live AI Interview</h1>
            <p className="text-gray-400">Practice with our AI interviewer in real-time</p>
          </div>

          {/* Countdown Modal */}
          {showCountdown && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4"
                >
                  {countdown}
                </motion.div>
                <p className="text-white text-xl">Get ready...</p>
              </motion.div>
            </motion.div>
          )}

          {/* Main Interview Area - 60/40 Layout */}
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
            {/* Left Panel - AI Interviewer (60%) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all"
            >
              {/* AI Avatar with Animated Orb */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16">
                    {/* Animated gradient orb */}
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0 rounded-full bg-white/20 opacity-80"
                    />
                    <div className="absolute inset-1 bg-slate-950 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🤖</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-white">AI Interviewer</div>
                    {/* Status Chip */}
                    <motion.div
                      className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mt-1"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-2 h-2 bg-white rounded-full"
                      />
                      <span className="text-xs text-white font-medium">
                        {isRecording ? 'Listening...' : 'Ready'}
                      </span>
                    </motion.div>
                  </div>
                </div>
                {/* Timer with circular progress */}
                <div className="relative w-20 h-20">
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#334155" strokeWidth="2" />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeDasharray={`${(timer / 300) * 282.7} 282.7`}
                      transition={{ duration: 0.5 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-mono font-bold text-white">
                        {Math.floor(timer / 60).toString().padStart(2, '0')}:{(timer % 60).toString().padStart(2, '0')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Question Card with Typewriter Animation */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={currentQuestion}
                className="glass rounded-xl p-6 mb-6 min-h-[180px] flex items-center border-l-4 border-white/30 bg-white/5"
              >
                <div className="w-full">
                  {/* Question Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-4"
                  >
                    <span className="text-xs font-semibold text-white">
                      Question {currentQuestion + 1} of {questions.length}
                    </span>
                  </motion.div>
                  <p className="text-lg text-white leading-relaxed font-medium">
                    {questions[currentQuestion]}
                  </p>
                </div>
              </motion.div>

              {/* Segmented Progress Indicator */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-400 mb-3">
                  <span>Progress</span>
                  <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="flex gap-2">
                  {questions.map((_, idx) => (
                    <motion.div
                      key={idx}
                      className={`flex-1 h-2 rounded-full transition-all ${
                        idx < currentQuestion
                          ? 'bg-white'
                          : idx === currentQuestion
                          ? 'bg-white'
                          : 'bg-white/10'
                      }`}
                      animate={idx === currentQuestion ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="flex space-x-3">
                {!isRecording ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCountdown(true)}
                    className="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-white/20 transition-all"
                  >
                    <Play className="w-5 h-5" />
                    <span>Start Interview</span>
                  </motion.button>
                ) : (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextQuestion}
                      disabled={currentQuestion === questions.length - 1}
                      className="flex-1 px-6 py-4 glass glass-hover text-white rounded-xl font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 border border-white/10"
                    >
                      <SkipForward className="w-5 h-5" />
                      <span>Next Question</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleStopRecording}
                      className="flex-1 px-6 py-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl font-semibold flex items-center justify-center space-x-2 border border-red-500/20 transition-all"
                    >
                      <Square className="w-5 h-5" />
                      <span>End Interview</span>
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>

            {/* Right Panel - User Video (40%) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all flex flex-col"
            >
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">Your Feed</h3>
                  {isRecording && (
                    <motion.div
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <span className="text-xs font-medium text-red-400">LIVE</span>
                    </motion.div>
                  )}
                </div>
                <p className="text-sm text-gray-400">AI is analyzing your responses in real-time</p>
              </div>

              {/* Video Preview */}
              <div className="relative bg-dark-800 rounded-xl overflow-hidden mb-6 aspect-video flex-1 flex items-center justify-center border border-white/10">
                {!isRecording ? (
                  <div className="text-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-3"
                    >
                      <Video className="w-8 h-8 text-purple-400" />
                    </motion.div>
                    <p className="text-gray-400 text-sm">Allow camera access to begin</p>
                  </div>
                ) : isVideoOff ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <VideoOff className="w-16 h-16 text-gray-600" />
                  </div>
                ) : (
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Video Controls */}
              <div className="flex space-x-3 mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMuted(!isMuted)}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all border ${
                    isMuted
                      ? 'bg-red-500/20 text-red-400 border-red-500/20'
                      : 'glass glass-hover border-white/10'
                  }`}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  <span className="text-sm">{isMuted ? 'Unmute' : 'Mute'}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all border ${
                    isVideoOff
                      ? 'bg-red-500/20 text-red-400 border-red-500/20'
                      : 'glass glass-hover border-white/10'
                  }`}
                >
                  {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                  <span className="text-sm">{isVideoOff ? 'Show' : 'Hide'}</span>
                </motion.button>
              </div>

              {/* Real-time Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: 'Eye Contact', value: isRecording ? 'Good' : '--', color: 'blue' },
                  { label: 'Posture', value: isRecording ? '✓' : '--', color: 'green' },
                  { label: 'Pace', value: isRecording ? 'Normal' : '--', color: 'purple' },
                ].map((metric, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`glass rounded-lg p-3 text-center border border-white/10 hover:border-white/20 transition-all`}
                  >
                    <div className={`text-lg font-bold text-${metric.color}-400`}>
                      {metric.value}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{metric.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Emotion Detection Box */}
              <div className="glass rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-white">Emotion Detection</h3>
                  <div className={`text-xs px-2 py-1 rounded-full ${wsConnected ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                    {wsConnected ? '● Live' : '● Connecting...'}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl"
                    >
                      {currentEmotion === 'happy' && '😊'}
                      {currentEmotion === 'sad' && '😢'}
                      {currentEmotion === 'angry' && '😠'}
                      {currentEmotion === 'surprise' && '😲'}
                      {currentEmotion === 'fear' && '😨'}
                      {currentEmotion === 'disgust' && '🤢'}
                      {currentEmotion === 'neutral' && '😐'}
                      {!currentEmotion && '⏳'}
                    </motion.div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-400 mb-1">
                      <span className="capitalize font-medium text-white">
                        {currentEmotion || 'Detecting...'}
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-white"
                        initial={{ width: 0 }}
                        animate={{ width: `${emotionConfidence || 0}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {emotionConfidence ? emotionConfidence.toFixed(0) : '0'}% confidence
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveInterview;

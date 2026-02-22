import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Video, Mic, MicOff, VideoOff, Play, Square, SkipForward, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const LiveInterview = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(0);
  const videoRef = useRef(null);

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
        })
        .catch(err => console.error('Error accessing media devices:', err));
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold mb-2">Live AI Interview</h1>
            <p className="text-gray-400">Practice with our AI interviewer in real-time</p>
          </div>

          {/* Main Interview Area */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Panel - AI Interviewer */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-2xl p-8 border border-white/10"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                  </div>
                  <div>
                    <div className="font-semibold">AI Interviewer</div>
                    <div className="text-sm text-gray-400">
                      {isRecording ? 'Listening...' : 'Ready to begin'}
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-mono text-blue-400">{formatTime(timer)}</div>
              </div>

              {/* Question Display */}
              <div className="glass rounded-xl p-6 mb-6 min-h-[200px] flex items-center">
                <div>
                  <div className="text-sm text-gray-400 mb-2">Question {currentQuestion + 1} of {questions.length}</div>
                  <p className="text-lg text-gray-200 leading-relaxed">
                    {questions[currentQuestion]}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="flex space-x-3">
                {!isRecording ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStartRecording}
                    className="flex-1 px-6 py-3 bg-gradient-accent text-white rounded-xl font-semibold flex items-center justify-center space-x-2 professional-glow"
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
                      className="flex-1 px-6 py-3 glass glass-hover text-white rounded-xl font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      <SkipForward className="w-5 h-5" />
                      <span>Next Question</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleStopRecording}
                      className="flex-1 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl font-semibold flex items-center justify-center space-x-2 border border-red-500/20"
                    >
                      <Square className="w-5 h-5" />
                      <span>End Interview</span>
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>

            {/* Right Panel - User Video */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-2xl p-8 border border-white/10"
            >
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Your Video</h3>
                <p className="text-sm text-gray-400">AI is analyzing your responses in real-time</p>
              </div>

              {/* Video Preview */}
              <div className="relative bg-dark-800 rounded-xl overflow-hidden mb-6 aspect-video">
                {isVideoOff ? (
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
                
                {isRecording && (
                  <div className="absolute top-4 left-4 flex items-center space-x-2 glass px-3 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">Recording</span>
                  </div>
                )}
              </div>

              {/* Video Controls */}
              <div className="flex space-x-3 mb-6">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all ${
                    isMuted ? 'bg-red-500/20 text-red-400 border border-red-500/20' : 'glass glass-hover'
                  }`}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                </button>
                <button
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all ${
                    isVideoOff ? 'bg-red-500/20 text-red-400 border border-red-500/20' : 'glass glass-hover'
                  }`}
                >
                  {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                  <span>{isVideoOff ? 'Show Video' : 'Hide Video'}</span>
                </button>
              </div>

              {/* Real-time Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="glass rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {isRecording ? Math.min(85 + Math.floor(Math.random() * 10), 95) : '--'}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Confidence</div>
                </div>
                <div className="glass rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {isRecording ? Math.min(80 + Math.floor(Math.random() * 15), 95) : '--'}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Clarity</div>
                </div>
                <div className="glass rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-pink-400">
                    {isRecording ? Math.min(82 + Math.floor(Math.random() * 12), 94) : '--'}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Engagement</div>
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

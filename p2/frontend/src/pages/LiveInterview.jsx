import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Video, Mic, MicOff, VideoOff, Play, Square, SkipForward, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const LiveInterview = () => {
  const location = useLocation();
  const interviewType = location.state?.type || 'general';
  const interviewField = location.state?.field || null;
  const difficulty = location.state?.difficulty || 'intermediate';
  const hasResume = location.state?.hasResume || false;
  const resumeScore = location.state?.resumeScore || null;
  
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

  // Question banks based on interview type
  const questionBanks = {
    hr: [
      "Tell me about yourself and your professional background.",
      "What are your greatest strengths and how do they apply to this role?",
      "Describe a time when you faced a conflict with a team member. How did you resolve it?",
      "How do you handle stress and pressure in the workplace?",
      "Tell me about a time when you demonstrated leadership skills.",
      "What motivates you in your career?",
      "Describe a situation where you had to adapt to significant changes at work.",
      "How do you prioritize tasks when you have multiple deadlines?",
      "Tell me about a time when you failed. What did you learn from it?",
      "Where do you see yourself in 5 years?"
    ],
    'software-engineering': [
      "Explain the difference between object-oriented and functional programming. When would you use each?",
      "How would you design a URL shortening service like bit.ly? Walk me through your system architecture.",
      "What is the time complexity of common sorting algorithms? Which would you choose for different scenarios?",
      "Explain how you would implement a cache with LRU (Least Recently Used) eviction policy.",
      "Describe your experience with microservices architecture. What are the main challenges?",
      "How do you ensure code quality and maintainability in your projects? What tools and practices do you use?",
      "Explain database indexing. When should you add an index and what are the tradeoffs?",
      "What are your strategies for debugging complex issues in production environments?",
      "How would you optimize a slow-running database query? Walk me through your approach.",
      "Describe your experience with CI/CD pipelines. How do you ensure reliable deployments?",
      "Explain the CAP theorem and how it applies to distributed systems.",
      "How would you handle a situation where your application needs to scale to 10x the current traffic?",
      "What's the difference between SQL and NoSQL databases? When would you choose one over the other?",
      "Describe a challenging technical problem you solved. What was your approach?",
      "How do you stay updated with new technologies and programming best practices?"
    ],
    'data-science': [
      "Explain the difference between supervised and unsupervised learning with real-world examples.",
      "How do you handle missing data in a dataset? What are the different imputation strategies?",
      "What is overfitting and how do you prevent it? Describe specific techniques you've used.",
      "Explain the bias-variance tradeoff and how it affects model performance.",
      "Describe your experience with feature engineering. How do you identify important features?",
      "How would you evaluate the performance of a classification model? What metrics would you use?",
      "Explain the difference between bagging and boosting. When would you use each?",
      "What is your approach to handling imbalanced datasets? Provide specific techniques.",
      "Describe a machine learning project you've worked on from start to finish. What were the challenges?",
      "How do you communicate technical findings to non-technical stakeholders?",
      "Explain cross-validation and why it's important in model evaluation.",
      "What's the difference between precision and recall? When would you optimize for one over the other?",
      "How would you approach a time series forecasting problem?",
      "Describe your experience with deep learning frameworks like TensorFlow or PyTorch.",
      "How do you ensure your models are fair and unbiased?"
    ],
    'product-management': [
      "How do you prioritize features in a product roadmap when you have limited resources?",
      "Describe your process for gathering and analyzing user feedback.",
      "How would you handle conflicting requirements from different stakeholders?",
      "Explain how you would measure the success of a new feature launch.",
      "Tell me about a time when you had to make a difficult product decision with incomplete information.",
      "How do you balance technical debt with new feature development?",
      "Describe your experience with A/B testing and experimentation. How do you design experiments?",
      "How do you work with engineering teams to define clear requirements?",
      "What frameworks do you use for product strategy? (e.g., RICE, MoSCoW, Kano)",
      "How would you approach entering a new market segment for your product?",
      "Describe a product you admire. What makes it successful?",
      "How do you identify and validate new product opportunities?",
      "What's your approach to competitive analysis?",
      "How do you ensure alignment between product vision and business goals?",
      "Describe a time when you had to pivot a product strategy. What led to that decision?"
    ],
    'business-analyst': [
      "How do you gather and document business requirements from stakeholders?",
      "Describe your experience with process improvement initiatives. What methodologies do you use?",
      "How do you handle stakeholder disagreements about requirements?",
      "Explain your approach to data analysis and reporting. What tools do you prefer?",
      "What tools and techniques do you use for requirements elicitation?",
      "How do you ensure requirements are testable and measurable?",
      "Describe a time when you identified a significant business opportunity through analysis.",
      "How do you prioritize competing business needs with limited resources?",
      "Explain your experience with business process modeling (BPMN, UML, etc.).",
      "How do you measure the success of your analysis and recommendations?",
      "Describe your experience with SQL and data querying. How do you use it in your role?",
      "How do you translate technical concepts for non-technical stakeholders?",
      "What's your approach to gap analysis between current and desired states?",
      "How do you validate that implemented solutions meet business requirements?",
      "Describe your experience with Agile methodologies as a business analyst."
    ],
    general: [
      "Tell me about yourself and your background.",
      "What interests you about this role?",
      "Describe a challenging project you've worked on.",
      "How do you handle tight deadlines?",
      "Where do you see yourself in 5 years?"
    ]
  };

  // Field-specific evaluation criteria
  const evaluationCriteria = {
    'software-engineering': {
      primary: ['Technical Depth', 'Problem Solving', 'System Design', 'Code Quality'],
      secondary: ['Communication', 'Scalability Thinking', 'Best Practices']
    },
    'data-science': {
      primary: ['Statistical Knowledge', 'ML Understanding', 'Data Analysis', 'Model Evaluation'],
      secondary: ['Communication', 'Business Acumen', 'Tool Proficiency']
    },
    'product-management': {
      primary: ['Strategic Thinking', 'Prioritization', 'User Focus', 'Stakeholder Management'],
      secondary: ['Communication', 'Data-Driven', 'Leadership']
    },
    'business-analyst': {
      primary: ['Requirements Analysis', 'Process Improvement', 'Stakeholder Communication', 'Data Analysis'],
      secondary: ['Documentation', 'Problem Solving', 'Technical Acumen']
    },
    'hr': {
      primary: ['Communication', 'Teamwork', 'Problem Solving', 'Adaptability'],
      secondary: ['Leadership', 'Conflict Resolution', 'Self-Awareness']
    },
    'general': {
      primary: ['Communication', 'Confidence', 'Clarity', 'Engagement'],
      secondary: ['Body Language', 'Articulation', 'Professionalism']
    }
  };

  // Get questions based on interview type
  const getQuestions = () => {
    if (interviewType === 'hr') {
      return questionBanks.hr;
    } else if (interviewType === 'field' && interviewField) {
      return questionBanks[interviewField] || questionBanks.general;
    }
    return questionBanks.general;
  };

  const questions = getQuestions();

  // Get evaluation criteria based on interview type
  const getCriteria = () => {
    if (interviewType === 'hr') {
      return evaluationCriteria.hr;
    } else if (interviewType === 'field' && interviewField) {
      return evaluationCriteria[interviewField] || evaluationCriteria.general;
    }
    return evaluationCriteria.general;
  };

  const criteria = getCriteria();

  // Get interview title
  const getInterviewTitle = () => {
    if (interviewType === 'hr') {
      return 'HR Interview';
    } else if (interviewType === 'field' && interviewField) {
      const fieldNames = {
        'software-engineering': 'Software Engineering',
        'data-science': 'Data Science',
        'product-management': 'Product Management',
        'business-analyst': 'Business Analyst'
      };
      return `${fieldNames[interviewField]} Interview`;
    }
    return 'Live AI Interview';
  };

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
            <Link to="/interview-selection" className="inline-flex items-center text-gray-400 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Interview Selection
            </Link>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold">{getInterviewTitle()}</h1>
                  {interviewType === 'field' && interviewField && (
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full">
                      {interviewField.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  )}
                  {interviewType === 'hr' && (
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold rounded-full">
                      Behavioral
                    </span>
                  )}
                </div>
                <p className="text-gray-400">
                  {interviewType === 'hr' 
                    ? 'Practice behavioral and soft skills questions'
                    : interviewType === 'field'
                    ? 'Practice technical and domain-specific questions'
                    : 'Practice with our AI interviewer in real-time'
                  }
                </p>
              </div>
              {hasResume && resumeScore && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass rounded-xl p-4 border border-green-500/20 bg-green-500/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-green-400">Resume Analyzed</p>
                      <p className="text-sm text-gray-400">Score: {resumeScore.overall}/100</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
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

              {hasResume && (
                <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-sm text-blue-400 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Questions personalized based on your resume
                  </p>
                </div>
              )}

              {/* Evaluation Criteria Display */}
              <div className="mb-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <h4 className="text-sm font-semibold text-purple-400 mb-2">Evaluation Focus:</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Primary Criteria:</p>
                    <div className="flex flex-wrap gap-2">
                      {criteria.primary.map((criterion, idx) => (
                        <span key={idx} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                          {criterion}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Secondary Criteria:</p>
                    <div className="flex flex-wrap gap-2">
                      {criteria.secondary.map((criterion, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded text-xs">
                          {criterion}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Question Display */}
              <div className="glass rounded-xl p-6 mb-6 min-h-[200px] flex items-center">
                <div>
                  <div className="text-sm text-gray-400 mb-2">Question {currentQuestion + 1} of {questions.length}</div>
                  <p className="text-lg text-gray-200 leading-relaxed">
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

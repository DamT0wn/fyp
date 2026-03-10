import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Video, Download, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PolishedNavbar from '../components/PolishedNavbar';

const Upload = () => {
  const [dragActive, setDragActive] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);

  const handleDrag = (e, cardType) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(cardType);
    } else if (e.type === 'dragleave') {
      setDragActive(null);
    }
  };

  const handleDrop = (e, cardType) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(null);
    // Handle file drop logic here
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <PolishedNavbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span>Home</span>
              <ChevronRight className="w-4 h-4 mx-2 text-gray-600" />
              <span>Upload & Analyze</span>
            </Link>
            <h1 className="text-5xl font-serif font-bold mb-3">Upload & Analyze</h1>
            <p className="text-lg text-gray-400 max-w-2xl">
              Drag files anywhere on this page to get instant AI-powered feedback
            </p>
          </motion.div>

          {/* Upload Options Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Resume Upload Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="group"
              onDragEnter={(e) => handleDrag(e, 'resume')}
              onDragLeave={(e) => handleDrag(e, 'resume')}
              onDragOver={(e) => handleDrag(e, 'resume')}
              onDrop={(e) => handleDrop(e, 'resume')}
            >
              <Link to="/profile">
                <div className={`glass rounded-2xl p-8 border transition-all h-full cursor-pointer group-hover:shadow-xl group-hover:shadow-white/10 ${
                  dragActive === 'resume' 
                    ? 'border-white/40 bg-white/5' 
                    : 'border-white/10 hover:border-white/20'
                }`}>
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold mb-3 text-white">Resume Upload</h2>
                  <p className="text-gray-300 mb-6">
                    Upload your professional resume to get personalized interview questions tailored to your experience and skills.
                  </p>

                  {/* Format Pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['PDF', 'DOC', 'DOCX', 'TXT'].map((format) => (
                      <span key={format} className="px-3 py-1 bg-white/10 text-white text-xs font-medium rounded-full border border-white/20">
                        {format}
                      </span>
                    ))}
                  </div>

                  {/* Size Indicator */}
                  <div className="mb-6">
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                      <span>Max size: 5 MB</span>
                      <span>0 MB</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-0 bg-white rounded-full" />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Upload Resume</span>
                  </motion.button>
                </div>
              </Link>
            </motion.div>

            {/* Video Upload Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="group"
              onDragEnter={(e) => handleDrag(e, 'video')}
              onDragLeave={(e) => handleDrag(e, 'video')}
              onDragOver={(e) => handleDrag(e, 'video')}
              onDrop={(e) => handleDrop(e, 'video')}
            >
              <Link to="/video-upload">
                <div className={`glass rounded-2xl p-8 border transition-all h-full cursor-pointer group-hover:shadow-xl group-hover:shadow-white/10 ${
                  dragActive === 'video' 
                    ? 'border-white/40 bg-white/5' 
                    : 'border-white/10 hover:border-white/20'
                }`}>
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all">
                      <Video className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold mb-3 text-white">Video Upload</h2>
                  <p className="text-gray-300 mb-6">
                    Upload your interview recording to get comprehensive AI analysis of your facial expressions, speech patterns, and overall performance.
                  </p>

                  {/* Format Pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['MP4', 'WebM', 'MOV', 'AVI'].map((format) => (
                      <span key={format} className="px-3 py-1 bg-white/10 text-white text-xs font-medium rounded-full border border-white/20">
                        {format}
                      </span>
                    ))}
                  </div>

                  {/* Video Preview Placeholder */}
                  <div className="mb-6 h-24 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl mb-1">🎬</div>
                      <p className="text-xs text-gray-500">Video preview</p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all"
                  >
                    <Video className="w-4 h-4" />
                    <span>Upload Video</span>
                  </motion.button>

                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Your video is processed locally and never stored
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-8 text-white">Why Upload?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">🎯</span>
                </div>
                <h3 className="font-semibold mb-2 text-white">Personalized Feedback</h3>
                <p className="text-sm text-gray-400">
                  Get AI-powered insights tailored to your specific interview performance
                </p>
              </div>
              <div className="glass rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">⚡</span>
                </div>
                <h3 className="font-semibold mb-2 text-white">Instant Analysis</h3>
                <p className="text-sm text-gray-400">
                  Receive detailed feedback within minutes of uploading
                </p>
              </div>
              <div className="glass rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">📈</span>
                </div>
                <h3 className="font-semibold mb-2 text-white">Track Progress</h3>
                <p className="text-sm text-gray-400">
                  Monitor your improvement over multiple practice sessions
                </p>
              </div>
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-8 border border-white/10 text-center"
          >
            <h3 className="text-2xl font-bold mb-4 text-white">Get Started</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Start by uploading your resume to get personalized interview questions, then record and upload your practice interviews to get detailed feedback.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/profile"
                className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all font-semibold flex items-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>Upload Resume</span>
              </Link>
              <Link
                to="/video-upload"
                className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all font-semibold flex items-center space-x-2"
              >
                <Video className="w-4 h-4" />
                <span>Upload Video</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Upload;

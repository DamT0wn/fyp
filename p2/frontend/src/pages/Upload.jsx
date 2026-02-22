import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload as UploadIcon, File, X, CheckCircle, ArrowLeft, Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            navigate('/dashboard');
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold mb-2">Upload Interview Recording</h1>
            <p className="text-gray-400">Upload your recorded interview for AI analysis</p>
          </div>

          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-8 border border-white/10 mb-8"
          >
            <div
              className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                dragActive
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-white/20 hover:border-white/40'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                multiple
                accept="video/*,audio/*"
                onChange={handleChange}
              />
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center mb-4">
                  <UploadIcon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2">
                  Drop your files here, or{' '}
                  <label htmlFor="file-upload" className="text-blue-400 cursor-pointer hover:text-blue-300">
                    browse
                  </label>
                </h3>
                
                <p className="text-gray-400 text-sm mb-4">
                  Supports: MP4, MOV, AVI, MP3, WAV (Max 500MB)
                </p>

                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>✓ Video interviews</span>
                  <span>✓ Audio recordings</span>
                  <span>✓ Screen recordings</span>
                </div>
              </div>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-6 space-y-3">
                <h4 className="font-semibold text-sm text-gray-400">Selected Files</h4>
                {files.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between glass rounded-lg p-4"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <File className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{file.name}</div>
                        <div className="text-xs text-gray-400">{file.size}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Upload Progress */}
            {uploading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6"
              >
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Uploading and analyzing...</span>
                  <span className="text-blue-400">{uploadProgress}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </motion.div>
            )}

            {/* Upload Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleUpload}
              disabled={files.length === 0 || uploading}
              className="w-full mt-6 px-6 py-4 bg-gradient-accent text-white rounded-xl font-semibold text-lg professional-glow hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {uploading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : uploadProgress === 100 ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Complete!</span>
                </>
              ) : (
                <>
                  <UploadIcon className="w-5 h-5" />
                  <span>Analyze Interview</span>
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-6 border border-white/10">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold mb-2">Accurate Analysis</h3>
              <p className="text-sm text-gray-400">
                Our AI analyzes every aspect of your interview performance
              </p>
            </div>
            <div className="glass rounded-xl p-6 border border-white/10">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold mb-2">Fast Processing</h3>
              <p className="text-sm text-gray-400">
                Get detailed feedback within minutes of uploading
              </p>
            </div>
            <div className="glass rounded-xl p-6 border border-white/10">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-semibold mb-2">Secure & Private</h3>
              <p className="text-sm text-gray-400">
                Your data is encrypted and never shared with third parties
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;

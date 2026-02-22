import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Upload } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-subtle" />
      
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-700/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-700/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-surface-card/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-300 border border-surface-border">
                Trusted by 2,000+ Candidates
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Prepare with Confidence.
              <span className="block text-accent-300 mt-2">
                Succeed with AI.
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 max-w-2xl">
              Professional interview preparation powered by advanced AI. 
              Get expert feedback, track your progress, and land your dream role.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/live-interview">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-gradient-accent text-white rounded-xl font-semibold text-lg professional-glow hover:shadow-xl transition-all flex items-center justify-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Start Practice Session</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link to="/upload">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-surface-card/80 backdrop-blur-sm hover:bg-surface-elevated border border-surface-border text-white rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 transition-all"
                >
                  <Upload className="w-5 h-5" />
                  <span>Upload Recording</span>
                </motion.button>
              </Link>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 grid grid-cols-3 gap-8"
            >
              <div>
                <div className="text-3xl font-bold text-white">2,000+</div>
                <div className="text-sm text-gray-400">Candidates Trained</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">94%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-gray-400">Companies</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - AI Interface Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main card */}
              <div className="card rounded-2xl p-8 card-shadow">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">AI Interviewer</div>
                    <div className="text-xs text-gray-400">Ready to begin</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-surface-elevated rounded-lg p-4 border border-surface-border">
                    <div className="text-sm text-gray-300">
                      "Tell me about a challenging project you've worked on..."
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <div className="h-2 flex-1 bg-surface-elevated rounded-full overflow-hidden border border-surface-border">
                      <motion.div
                        className="h-full bg-gradient-accent"
                        initial={{ width: 0 }}
                        animate={{ width: '70%' }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-surface-elevated rounded-lg p-3 text-center border border-surface-border">
                      <div className="text-2xl font-bold text-accent-300">85</div>
                      <div className="text-xs text-gray-400">Confidence</div>
                    </div>
                    <div className="bg-surface-elevated rounded-lg p-3 text-center border border-surface-border">
                      <div className="text-2xl font-bold text-accent-300">92</div>
                      <div className="text-xs text-gray-400">Clarity</div>
                    </div>
                    <div className="bg-surface-elevated rounded-lg p-3 text-center border border-surface-border">
                      <div className="text-2xl font-bold text-accent-300">88</div>
                      <div className="text-xs text-gray-400">Engagement</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 card rounded-xl p-4 card-shadow"
              >
                <div className="text-xs text-gray-400">Live Analysis</div>
                <div className="text-sm font-semibold text-accent-300">Active</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

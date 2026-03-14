import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Upload, CheckCircle, TrendingUp, Users } from 'lucide-react';

const SimpleHeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-slate-950 pt-20 pb-16">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950 opacity-50" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Role Tags */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start">
              {['Software Engineering', 'Data Science', 'Product Management', 'HR Interviews'].map((role) => (
                <Link
                  key={role}
                  to="/interview-selection"
                  className="px-3 py-1.5 bg-slate-800 text-gray-300 rounded-full text-sm border border-slate-700 hover:border-violet-500 hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  {role}
                </Link>
              ))}
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Master Every Interview
              <br />
              with <span className="text-violet-400">AI</span>-Powered Analytics
            </h1>

            <p className="text-xl text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0">
              Real-time performance tracking, instant feedback, and data-driven insights to land your dream role.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
              <Link to="/interview-selection">
                <button className="w-full sm:w-auto px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Start Free Session
                </button>
              </Link>

              <Link to="/upload">
                <button className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold text-lg border border-slate-700 transition-colors flex items-center justify-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Recording
                </button>
              </Link>
            </div>

            {/* Microcopy */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Free first session</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>No signup required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Instant AI feedback</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white mb-1">5,000+</div>
                <div className="text-sm text-gray-400">Mock Sessions</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white mb-1">38%</div>
                <div className="text-sm text-gray-400">Improvement</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white mb-1">94%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Simple AI Preview */}
          <div className="hidden lg:block">
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              {/* AI Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <div className="font-semibold text-white">AI Interviewer</div>
                  <div className="text-sm text-gray-400 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Live Analysis Active
                  </div>
                </div>
              </div>

              {/* Question */}
              <div className="bg-slate-800 rounded-lg p-4 mb-4">
                <div className="text-xs text-violet-400 mb-2 uppercase">Current Question</div>
                <div className="text-white">Tell me about your most impactful project...</div>
              </div>

              {/* Scores */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-slate-800 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-violet-400">95</div>
                  <div className="text-xs text-gray-400 mt-1">Overall</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-blue-400">88</div>
                  <div className="text-xs text-gray-400 mt-1">Eye Contact</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-400">92</div>
                  <div className="text-xs text-gray-400 mt-1">Confidence</div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-xs text-green-400">
                  Eye Contact Strong
                </span>
                <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs text-blue-400">
                  Confidence High
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleHeroSection;

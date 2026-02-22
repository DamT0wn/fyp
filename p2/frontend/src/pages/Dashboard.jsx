import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Award, Target, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  // Sample data
  const radarData = [
    { subject: 'Confidence', score: 85, fullMark: 100 },
    { subject: 'Communication', score: 92, fullMark: 100 },
    { subject: 'Body Language', score: 78, fullMark: 100 },
    { subject: 'Technical Depth', score: 88, fullMark: 100 },
    { subject: 'Clarity', score: 90, fullMark: 100 },
  ];

  const progressData = [
    { session: '1', confidence: 65 },
    { session: '2', confidence: 72 },
    { session: '3', confidence: 78 },
    { session: '4', confidence: 85 },
  ];

  const strengths = [
    'Clear and articulate communication',
    'Strong technical knowledge demonstration',
    'Good eye contact and engagement',
    'Structured responses using STAR method',
  ];

  const improvements = [
    'Reduce filler words (um, uh, like)',
    'Improve posture and body language',
    'Provide more specific examples',
    'Work on managing nervousness',
  ];

  const practiceQuestions = [
    'Describe a time when you had to work under pressure',
    'How do you handle conflicts in a team?',
    'What\'s your approach to learning new technologies?',
  ];

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
            <h1 className="text-4xl font-bold mb-2">Performance Dashboard</h1>
            <p className="text-gray-400">Your AI-powered interview analysis</p>
          </div>

          {/* Score Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              className="glass rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-3xl font-bold text-blue-400">85</span>
              </div>
              <h3 className="font-semibold mb-1">Confidence Score</h3>
              <p className="text-sm text-gray-400">+12% from last session</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-3xl font-bold text-purple-400">92</span>
              </div>
              <h3 className="font-semibold mb-1">Communication</h3>
              <p className="text-sm text-gray-400">Excellent clarity</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-pink-400" />
                </div>
                <span className="text-3xl font-bold text-pink-400">78</span>
              </div>
              <h3 className="font-semibold mb-1">Body Language</h3>
              <p className="text-sm text-gray-400">Room for improvement</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <span className="text-3xl font-bold text-green-400">88</span>
              </div>
              <h3 className="font-semibold mb-1">Technical Depth</h3>
              <p className="text-sm text-gray-400">Strong knowledge</p>
            </motion.div>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Radar Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-2xl p-8 border border-white/10"
            >
              <h2 className="text-2xl font-bold mb-6">Overall Performance</h2>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#94a3b8' }} />
                  <Radar name="Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Line Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-2xl p-8 border border-white/10"
            >
              <h2 className="text-2xl font-bold mb-6">Confidence Progress</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="session" stroke="#94a3b8" />
                  <YAxis domain={[0, 100]} stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#f1f5f9' }}
                  />
                  <Line type="monotone" dataKey="confidence" stroke="#0ea5e9" strokeWidth={3} dot={{ fill: '#0ea5e9', r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Feedback Sections */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Strengths */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-8 border border-white/10"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mr-3">
                  <Award className="w-5 h-5 text-green-400" />
                </div>
                Strengths
              </h2>
              <ul className="space-y-3">
                {strengths.map((strength, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-400 text-xs">✓</span>
                    </div>
                    <span className="text-gray-300">{strength}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Improvements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-8 border border-white/10"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center mr-3">
                  <TrendingUp className="w-5 h-5 text-orange-400" />
                </div>
                Areas for Improvement
              </h2>
              <ul className="space-y-3">
                {improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-orange-400 text-xs">!</span>
                    </div>
                    <span className="text-gray-300">{improvement}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Practice Questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-bold mb-6">Suggested Practice Questions</h2>
            <div className="space-y-4">
              {practiceQuestions.map((question, index) => (
                <div key={index} className="glass rounded-xl p-4 hover:bg-white/10 transition-all">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-400 font-semibold">{index + 1}</span>
                    </div>
                    <p className="text-gray-300 pt-1">{question}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/live-interview">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 px-6 py-4 bg-gradient-accent text-white rounded-xl font-semibold professional-glow hover:shadow-xl transition-all"
              >
                Practice These Questions
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

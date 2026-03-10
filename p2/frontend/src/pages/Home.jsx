import { useState } from 'react'
import PolishedNavbar from '../components/PolishedNavbar'
import UploadForm from '../components/UploadForm'
import LiveInterview from '../components/LiveInterview'
import AIInterview from '../components/AIInterview'

function Home() {
  const [activeTab, setActiveTab] = useState('upload')

  return (
    <div className="min-h-screen bg-slate-950">
      <PolishedNavbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-3">
              Analyze Your Interview Performance
            </h2>
            <p className="text-gray-400 text-lg">
              Get AI-powered feedback on your facial expressions, body language, speech patterns, and answers
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-white/10 mb-8 overflow-x-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('upload')}
              className={`px-6 py-3 font-medium transition-all whitespace-nowrap relative ${
                activeTab === 'upload'
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Upload Video
              {activeTab === 'upload' && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('ai')}
              className={`px-6 py-3 font-medium transition-all whitespace-nowrap relative flex items-center space-x-2 ${
                activeTab === 'ai'
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>🤖 AI Interview</span>
              {activeTab === 'ai' && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('live')}
              className={`px-6 py-3 font-medium transition-all whitespace-nowrap relative flex items-center space-x-2 ${
                activeTab === 'live'
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>🎥 Live Interview</span>
              {activeTab === 'live' && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          </div>

          {/* Tab Content */}
          {activeTab === 'upload' && <UploadForm />}
          {activeTab === 'ai' && <AIInterview />}
          {activeTab === 'live' && <LiveInterview />}

          {/* Features Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: '👁️', title: 'Facial Analysis', desc: 'Eye contact, head stability, and expressions' },
              { icon: '🎤', title: 'Speech Analysis', desc: 'Speech rate, filler words, and clarity' },
              { icon: '🤖', title: 'AI Questions', desc: 'Personalized questions from your resume' },
              { icon: '📊', title: 'Detailed Feedback', desc: 'Actionable insights to improve' }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ translateY: -4 }}
                className="glass rounded-xl p-6 text-center border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-sm text-gray-400">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

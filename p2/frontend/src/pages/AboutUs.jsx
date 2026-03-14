import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Users, Zap } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-8">About Intrex</h1>
        
        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <p className="text-xl text-gray-400 mb-6">
              Intrex is an AI-powered interview practice platform designed to help job seekers master their interview skills and land their dream roles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
            <p>
              We believe everyone deserves the opportunity to showcase their best self in interviews. Our mission is to democratize interview preparation by providing accessible, AI-powered feedback and analytics that help candidates improve their performance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">What We Offer</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                <Target className="w-8 h-8 text-violet-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Real-time Analysis</h3>
                <p className="text-sm text-gray-400">
                  Get instant feedback on your interview performance including emotion detection, speech analysis, and body language.
                </p>
              </div>
              
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                <Zap className="w-8 h-8 text-violet-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">AI-Powered Insights</h3>
                <p className="text-sm text-gray-400">
                  Leverage advanced AI to analyze your responses, tone, and presentation for actionable improvement suggestions.
                </p>
              </div>
              
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                <Users className="w-8 h-8 text-violet-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Practice Anywhere</h3>
                <p className="text-sm text-gray-400">
                  Practice interviews anytime, anywhere with our flexible platform supporting both live and recorded sessions.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Our Story</h2>
            <p>
              Intrex was born from the recognition that interview preparation is often inaccessible and expensive. We set out to create a platform that combines cutting-edge AI technology with practical interview coaching to help candidates at all levels improve their skills and confidence.
            </p>
          </section>

          <section className="bg-slate-900 p-8 rounded-lg border border-slate-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Join Our Community</h2>
            <p className="mb-4">
              Connect with other job seekers, share experiences, and get support from our community.
            </p>
            <a 
              href="https://discord.gg/Z3j9nedb" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
            >
              Join our Discord
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Rocket } from 'lucide-react';

const ComingSoon = ({ title = "Coming Soon" }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <Rocket className="w-20 h-20 text-violet-400 mx-auto mb-6" />
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl text-gray-400 mb-8">
          We're working hard to bring you this feature. Stay tuned for updates!
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link 
            to="/live-interview"
            className="px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
          >
            Try Live Interview
          </Link>
          <a 
            href="https://discord.gg/Z3j9nedb"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Join Discord
          </a>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;

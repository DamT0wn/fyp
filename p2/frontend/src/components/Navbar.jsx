import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-secondary/95 backdrop-blur-xl border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center professional-glow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              InterviewAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/live-interview"
              className={`text-sm font-medium transition-colors ${
                isActive('/live-interview') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Live Interview
            </Link>
            <Link
              to="/upload"
              className={`text-sm font-medium transition-colors ${
                isActive('/upload') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Upload
            </Link>
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-colors ${
                isActive('/dashboard') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Dashboard
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/live-interview">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-accent text-white rounded-lg font-medium text-sm professional-glow hover:shadow-xl transition-all"
              >
                Start Interview
              </motion.button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-surface-card border-t border-surface-border"
        >
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/"
              className="block text-sm font-medium text-gray-400 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/live-interview"
              className="block text-sm font-medium text-gray-400 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Live Interview
            </Link>
            <Link
              to="/upload"
              className="block text-sm font-medium text-gray-400 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Upload
            </Link>
            <Link
              to="/dashboard"
              className="block text-sm font-medium text-gray-400 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link to="/live-interview" onClick={() => setIsOpen(false)}>
              <button className="w-full px-6 py-2 bg-gradient-accent text-white rounded-lg font-medium text-sm">
                Start Interview
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;

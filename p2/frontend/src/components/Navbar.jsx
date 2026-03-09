import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Menu, X, User, LogIn } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  useEffect(() => {
    // Handle scroll for sticky navbar effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-lg' 
        : 'bg-transparent border-b border-white/5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center professional-glow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              Intrex
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
              className={`text-sm font-medium transition-colors flex items-center space-x-2 ${
                isActive('/live-interview') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>Live Interview</span>
              <span className="px-2 py-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-[10px] font-bold rounded-full">
                AI
              </span>
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
              to="/dashboard"
              className={`text-sm font-medium transition-colors ${
                isActive('/dashboard') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Dashboard
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <Link to="/profile">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg font-medium text-sm hover:bg-white/10 transition-all flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </motion.button>
              </Link>
            ) : (
              <Link to="/firebase-login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg font-medium text-sm hover:bg-white/10 transition-all flex items-center space-x-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </motion.button>
              </Link>
            )}
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
              to="/home"
              className="block text-sm font-medium text-gray-400 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Interviews
            </Link>
            <Link
              to="/live-interview"
              className="block text-sm font-medium text-gray-400 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Live Interview
            </Link>
            <Link
              to="/dashboard"
              className="block text-sm font-medium text-gray-400 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            {isLoggedIn ? (
              <Link to="/profile" onClick={() => setIsOpen(false)}>
                <button className="w-full px-6 py-2 bg-white/5 border border-white/10 text-white rounded-lg font-medium text-sm mb-2">
                  Profile
                </button>
              </Link>
            ) : (
              <Link to="/firebase-login" onClick={() => setIsOpen(false)}>
                <button className="w-full px-6 py-2 bg-white/5 border border-white/10 text-white rounded-lg font-medium text-sm mb-2">
                  Login
                </button>
              </Link>
            )}
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

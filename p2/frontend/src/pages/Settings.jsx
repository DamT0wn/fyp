import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, ShieldCheck, ShieldOff, Key, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { setupMFA, verifyMFA, disableMFA } from '../api/api';

const Settings = () => {
  const { user } = useAuth();
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [otpInput, setOtpInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDisableConfirm, setShowDisableConfirm] = useState(false);

  // Get user ID from stored user data
  const getUserId = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        return userData.uid || userData.id;
      } catch (err) {
        console.error('Error parsing user data:', err);
      }
    }
    return null;
  };

  const handleEnableMFA = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const userId = getUserId();
      if (!userId) {
        throw new Error('User ID not found. Please login again.');
      }

      const response = await setupMFA(userId);
      setQrCodeData(response);
      setShowQRCode(true);
      setSuccess('QR code generated! Scan it with your authenticator app.');
    } catch (err) {
      setError(err.message || 'Failed to setup MFA');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyMFA = async () => {
    if (otpInput.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const userId = getUserId();
      if (!userId) {
        throw new Error('User ID not found. Please login again.');
      }

      await verifyMFA(userId, otpInput);
      setMfaEnabled(true);
      setShowQRCode(false);
      setQrCodeData(null);
      setOtpInput('');
      setSuccess('MFA enabled successfully! Your account is now more secure.');
    } catch (err) {
      setError(err.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleDisableMFA = async () => {
    if (otpInput.length !== 6) {
      setError('Please enter a 6-digit code to disable MFA');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const userId = getUserId();
      if (!userId) {
        throw new Error('User ID not found. Please login again.');
      }

      await disableMFA(userId, otpInput);
      setMfaEnabled(false);
      setShowDisableConfirm(false);
      setOtpInput('');
      setSuccess('MFA disabled successfully');
    } catch (err) {
      setError(err.message || 'Failed to disable MFA');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link to="/dashboard" className="inline-flex items-center text-gray-400 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold mb-2">Account Settings</h1>
            <p className="text-gray-400">Manage your security and preferences</p>
          </div>

          {/* MFA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-8 border border-white/10 mb-6"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Multi-Factor Authentication</h2>
                <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
              </div>
            </div>

            {/* MFA Status */}
            <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {mfaEnabled ? (
                    <>
                      <ShieldCheck className="w-5 h-5 text-green-400 mr-3" />
                      <div>
                        <p className="font-semibold text-green-400">MFA Enabled</p>
                        <p className="text-sm text-gray-400">Your account is protected with 2FA</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <ShieldOff className="w-5 h-5 text-orange-400 mr-3" />
                      <div>
                        <p className="font-semibold text-orange-400">MFA Disabled</p>
                        <p className="text-sm text-gray-400">Enable MFA for better security</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start">
                <AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-start">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-green-400 text-sm">{success}</p>
              </div>
            )}

            {/* Enable MFA Flow */}
            {!mfaEnabled && !showQRCode && (
              <div>
                <div className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Key className="w-4 h-4 mr-2" />
                    How to Enable MFA
                  </h3>
                  <ol className="text-sm text-gray-300 space-y-2 ml-6 list-decimal">
                    <li>Click "Enable MFA" button below</li>
                    <li>Install an authenticator app (Google Authenticator, Microsoft Authenticator, Authy, etc.)</li>
                    <li>Scan the QR code with your authenticator app</li>
                    <li>Enter the 6-digit code from your app to confirm</li>
                  </ol>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEnableMFA}
                  disabled={loading}
                  className="w-full px-6 py-4 bg-gradient-accent text-white rounded-xl font-semibold professional-glow hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Generating QR Code...' : 'Enable MFA'}
                </motion.button>
              </div>
            )}

            {/* QR Code Display */}
            {showQRCode && qrCodeData && (
              <div>
                <div className="mb-6 p-6 rounded-xl bg-white flex flex-col items-center">
                  <h3 className="font-semibold mb-4 text-gray-900">Scan this QR Code</h3>
                  <img 
                    src={`data:image/png;base64,${qrCodeData.qr_code}`} 
                    alt="MFA QR Code"
                    className="w-64 h-64 mb-4"
                  />
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Or enter this code manually:</p>
                    <code className="px-4 py-2 bg-gray-100 rounded text-sm font-mono text-gray-900">
                      {qrCodeData.secret}
                    </code>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Enter 6-digit code from your authenticator app
                  </label>
                  <input
                    type="text"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    maxLength={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 text-center text-2xl tracking-widest font-mono"
                  />
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowQRCode(false);
                      setQrCodeData(null);
                      setOtpInput('');
                      setError('');
                    }}
                    className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleVerifyMFA}
                    disabled={loading || otpInput.length !== 6}
                    className="flex-1 px-6 py-3 bg-gradient-accent text-white rounded-xl font-semibold professional-glow hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Verifying...' : 'Verify & Enable'}
                  </motion.button>
                </div>
              </div>
            )}

            {/* Disable MFA Flow */}
            {mfaEnabled && !showDisableConfirm && (
              <div>
                <div className="mb-6 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                  <p className="text-sm text-gray-300">
                    Disabling MFA will make your account less secure. You'll need to enter your current 6-digit code to confirm.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowDisableConfirm(true)}
                  className="w-full px-6 py-4 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl font-semibold hover:bg-red-500/30 transition-all"
                >
                  Disable MFA
                </motion.button>
              </div>
            )}

            {/* Disable Confirmation */}
            {showDisableConfirm && (
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Enter your current 6-digit code to disable MFA
                  </label>
                  <input
                    type="text"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    maxLength={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-red-500 text-center text-2xl tracking-widest font-mono"
                  />
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowDisableConfirm(false);
                      setOtpInput('');
                      setError('');
                    }}
                    className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDisableMFA}
                    disabled={loading || otpInput.length !== 6}
                    className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Disabling...' : 'Confirm Disable'}
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Additional Settings Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-bold mb-4">More Settings Coming Soon</h2>
            <p className="text-gray-400">
              We're working on adding more customization options including profile settings, notification preferences, and more.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AdminAuth: React.FC = () => {
  const { login, signup, resetPassword, loading } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        await login(email, password);
        setSuccess('Login successful!');
      } else if (mode === 'signup') {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        await signup(email, password);
        setSuccess('Account created successfully! Please check your email for confirmation.');
      } else if (mode === 'reset') {
        await resetPassword(email);
        setSuccess('Password reset email sent! Please check your inbox.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'login': return 'Login to CMS';
      case 'signup': return 'Create Account';
      case 'reset': return 'Reset Password';
    }
  };

  const getButtonText = () => {
    if (isSubmitting) return 'Processing...';
    switch (mode) {
      case 'login': return 'Login';
      case 'signup': return 'Create Account';
      case 'reset': return 'Send Reset Email';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bengali-cream via-white to-bengali-ivory dark:from-dark-900 dark:via-dark-800 dark:to-dark-700 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-cultural p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.img
              src="https://1fimd9lwq61lrowk.public.blob.vercel-storage.com/wediing-icon-MWGi3zHWRSwveW4CaK9EM7s57pDP54.png"
              alt="Wedding Icon"
              className="h-16 w-16 mx-auto mb-4"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2">
              {getTitle()}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Access the wedding content management system
            </p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2 text-red-700 dark:text-red-400"
            >
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center space-x-2 text-green-700 dark:text-green-400"
            >
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">{success}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-bengali-crimson/20 focus:border-bengali-crimson dark:focus:border-bengali-gold bg-white dark:bg-dark-700 text-gray-900 dark:text-white transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            {mode !== 'reset' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-bengali-crimson/20 focus:border-bengali-crimson dark:focus:border-bengali-gold bg-white dark:bg-dark-700 text-gray-900 dark:text-white transition-colors"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            )}

            {/* Confirm Password Field */}
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-bengali-crimson/20 focus:border-bengali-crimson dark:focus:border-bengali-gold bg-white dark:bg-dark-700 text-gray-900 dark:text-white transition-colors"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting || loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-bengali-deep-red to-bengali-crimson hover:from-bengali-crimson hover:to-bengali-deep-red text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <User className="h-5 w-5" />
              )}
              <span>{getButtonText()}</span>
            </motion.button>
          </form>

          {/* Mode Switcher */}
          <div className="mt-6 text-center space-y-2">
            {mode === 'login' && (
              <>
                <button
                  onClick={() => setMode('signup')}
                  className="text-bengali-crimson dark:text-bengali-gold hover:underline text-sm"
                >
                  Don't have an account? Sign up
                </button>
                <br />
                <button
                  onClick={() => setMode('reset')}
                  className="text-gray-600 dark:text-gray-400 hover:underline text-sm"
                >
                  Forgot your password?
                </button>
              </>
            )}

            {mode === 'signup' && (
              <button
                onClick={() => setMode('login')}
                className="text-bengali-crimson dark:text-bengali-gold hover:underline text-sm"
              >
                Already have an account? Login
              </button>
            )}

            {mode === 'reset' && (
              <button
                onClick={() => setMode('login')}
                className="text-bengali-crimson dark:text-bengali-gold hover:underline text-sm"
              >
                Back to login
              </button>
            )}
          </div>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
              {mode === 'login' && 'Use your Netlify Identity credentials to access the CMS.'}
              {mode === 'signup' && 'Create a new account to manage wedding content.'}
              {mode === 'reset' && 'Enter your email to receive a password reset link.'}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAuth;
import React, { useState } from 'react';
import { X, AlertCircle, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn, loading } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password);
      onClose();
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleTestLogin = async () => {
    setError('');
    try {
      await signIn('test@example.com', 'test');
      onClose();
    } catch (err) {
      setError('Test login failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="glass-card w-full max-w-md relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Sign in to continue your creative journey</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white dark:bg-black/60 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 rounded-xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="Enter your email"
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white dark:bg-black/60 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 rounded-xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="Enter your password"
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg shadow-primary/25"
          >
            {loading ? <LoadingSpinner /> : 'Sign In'}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">Or</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleTestLogin}
            className="w-full bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white py-3 rounded-xl font-semibold transition-all border border-gray-200 dark:border-white/10"
          >
            Try Demo Account
          </button>
        </form>
        
        <p className="text-gray-600 dark:text-gray-400 text-center mt-6">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-primary hover:text-primary/80 transition-colors font-semibold"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Users, 
  BookOpen, 
  Star, 
  Zap,
  Github, 
  Linkedin,
  GitBranch,
  Feather,
  Globe,
  Shield
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-black to-black">
      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        {/* Animated background effects */}
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="relative text-center">
          <h1 className="text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text">
              Craft Your Story
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Share Your Universe
            </span>
          </h1>

          <p className="text-2xl text-gray-400 max-w-3xl mx-auto mb-12">
            Join a community of storytellers and bring your imagination to life with AI-powered tools
          </p>

          <div className="flex gap-6 justify-center">
            <Link
              to="/create"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group shadow-lg shadow-purple-500/25"
            >
              Start Writing 
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/explore"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-lg border border-white/10"
            >
              Explore Stories
            </Link>
          </div>
        </div>
      </div>

      {/* Story Branch Visualization */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              Branching Narratives
            </h2>
            <p className="text-xl text-gray-400">Create interactive stories where every choice matters</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Story Branch Cards */}
            <div className="glass p-6 rounded-2xl transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl w-14 h-14 flex items-center justify-center mb-6">
                <GitBranch className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Multiple Paths</h3>
              <p className="text-gray-400">Create branching storylines that adapt to reader choices</p>
            </div>

            <div className="glass p-6 rounded-2xl transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl w-14 h-14 flex items-center justify-center mb-6">
                <Feather className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Rich Editor</h3>
              <p className="text-gray-400">Powerful tools for crafting immersive narratives</p>
            </div>

            <div className="glass p-6 rounded-2xl transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl w-14 h-14 flex items-center justify-center mb-6">
                <Globe className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Connected Worlds</h3>
              <p className="text-gray-400">Build vast universes with interconnected stories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-8 rounded-2xl hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl w-14 h-14 flex items-center justify-center mb-6">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              AI-Powered Writing
            </h3>
            <p className="text-gray-400">
              Enhance your creativity with intelligent suggestions and writing assistance
            </p>
          </div>

          <div className="glass p-8 rounded-2xl hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl w-14 h-14 flex items-center justify-center mb-6">
              <Users className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
              Collaborative Writing
            </h3>
            <p className="text-gray-400">
              Create stories together in real-time with fellow writers
            </p>
          </div>

          <div className="glass p-8 rounded-2xl hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl w-14 h-14 flex items-center justify-center mb-6">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
              Protected Rights
            </h3>
            <p className="text-gray-400">
              Secure your creative works with built-in copyright protection
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="glass p-8 rounded-2xl">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text mb-2">
              50K+
            </div>
            <p className="text-gray-400">Active Writers</p>
          </div>
          <div className="glass p-8 rounded-2xl">
            <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text mb-2">
              100K+
            </div>
            <p className="text-gray-400">Stories Created</p>
          </div>
          <div className="glass p-8 rounded-2xl">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text mb-2">
              5K+
            </div>
            <p className="text-gray-400">Story Universes</p>
          </div>
          <div className="glass p-8 rounded-2xl">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-2">
              1M+
            </div>
            <p className="text-gray-400">Monthly Readers</p>
          </div>
        </div>
      </div>

      {/* Footer with Attribution */}
      <footer className="border-t border-white/10 py-8 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              Made with ❤️ by Aayush Adhikari
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <a
                href="https://github.com/Aayush518"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/Aayush518"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
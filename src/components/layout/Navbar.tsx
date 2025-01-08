import React, { useState } from 'react';
import { Menu, Search, Bell, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useScrollTrigger } from '../../hooks/useScrollTrigger';
import UserMenu from './UserMenu';
import LoginModal from '../auth/LoginModal';
import RegisterModal from '../auth/RegisterModal';

export default function Navbar() {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const scrolled = useScrollTrigger({ threshold: 50 });

  const notifications = [
    {
      id: 1,
      title: 'New Comment',
      message: 'Alice commented on your story',
      time: '5m ago',
      unread: true
    },
    {
      id: 2,
      title: 'Story Liked',
      message: 'Bob liked your story "The Crystal Prophecy"',
      time: '1h ago',
      unread: true
    },
    {
      id: 3,
      title: 'New Follower',
      message: 'Charlie started following you',
      time: '2h ago',
      unread: false
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className={`
      fixed top-0 w-full z-50 transition-all duration-200
      ${scrolled 
        ? 'bg-black/80 backdrop-blur-lg shadow-lg' 
        : 'bg-transparent'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold gradient-text">
            StoryVerse
          </Link>
          
          {!user ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => setShowRegisterModal(true)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 text-gray-400 hover:text-white transition-colors relative"
              >
                <Search className="h-5 w-5" />
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-400 hover:text-white transition-colors relative"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-purple-500 rounded-full"></span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg py-2 animate-fadeIn">
                    <div className="px-4 py-2 border-b border-white/10">
                      <h3 className="font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-white/5 transition-colors ${
                            notification.unread ? 'bg-purple-500/5' : ''
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{notification.title}</p>
                              <p className="text-sm text-gray-400">{notification.message}</p>
                            </div>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <UserMenu />
            </div>
          )}
        </div>

        {/* Search Overlay */}
        {showSearch && (
          <div className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-xl border-t border-white/10 p-4 animate-fadeIn">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stories, universes, or users..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowSearch(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </form>
          </div>
        )}
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </nav>
  );
}
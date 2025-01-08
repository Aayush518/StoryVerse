import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, BookOpen, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const handleSignOut = () => {
    setIsOpen(false);
    signOut();
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
          <User className="h-5 w-5" />
        </div>
        <span className="text-white hidden md:block">{user.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg py-2 animate-fadeIn">
          <div className="px-4 py-2 border-b border-white/10">
            <p className="text-sm text-gray-400">Level {user.level}</p>
            <div className="mt-1 h-2 bg-black/60 rounded-full">
              <div
                className="h-full bg-purple-600 rounded-full transition-all duration-500"
                style={{ width: `${(user.xp % 1000) / 10}%` }}
              />
            </div>
          </div>

          <Link
            to="/profile"
            className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Link>

          <Link
            to="/my-stories"
            className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <BookOpen className="h-4 w-4" />
            <span>My Stories</span>
          </Link>

          <Link
            to="/achievements"
            className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Trophy className="h-4 w-4" />
            <span>Achievements</span>
          </Link>

          <Link
            to="/settings"
            className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>

          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 px-4 py-2 text-red-400 hover:bg-white/10 transition-colors w-full"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}
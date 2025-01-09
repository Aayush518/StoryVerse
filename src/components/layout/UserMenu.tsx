import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, Settings, BookOpen, Trophy, ChevronDown } from 'lucide-react';
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
        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
          {user.avatar ? (
            <img src={user.avatar} alt="" className="w-8 h-8 rounded-full" />
          ) : (
            <span className="text-lg font-bold text-primary">{user.name[0]}</span>
          )}
        </div>
        <span className="text-sm font-medium hidden md:block">{user.name}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 hidden md:block ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-lg py-2 animate-in fade-in slide-in-from-top-2">
          <div className="px-4 py-2 border-b border-border">
            <p className="text-sm text-muted-foreground">Level {user.level}</p>
            <div className="mt-1 h-2 bg-black/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${(user.xp % 1000) / 10}%` }}
              />
            </div>
          </div>

          <div className="py-1">
            <MenuLink to="/profile" icon={User}>Profile</MenuLink>
            <MenuLink to="/my-stories" icon={BookOpen}>My Stories</MenuLink>
            <MenuLink to="/achievements" icon={Trophy}>Achievements</MenuLink>
            <MenuLink to="/settings" icon={Settings}>Settings</MenuLink>
          </div>

          <div className="border-t border-border pt-1 mt-1">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuLink({ 
  to, 
  icon: Icon, 
  children 
}: { 
  to: string; 
  icon: React.ElementType; 
  children: React.ReactNode; 
}) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-white/5 transition-colors"
    >
      <Icon className="h-4 w-4" />
      <span>{children}</span>
    </Link>
  );
}
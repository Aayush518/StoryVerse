import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BookOpen, 
  PenTool, 
  Compass, 
  ShoppingBag, 
  Trophy, 
  Settings,
  User,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navigation = [
  { name: 'My Stories', path: '/my-stories', icon: BookOpen },
  { name: 'Create', path: '/create', icon: PenTool },
  { name: 'Explore', path: '/explore', icon: Compass },
  { name: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
  { name: 'Achievements', path: '/achievements', icon: Trophy },
  { name: 'Profile', path: '/profile', icon: User },
  { name: 'Settings', path: '/settings', icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
}

export default function Sidebar({ collapsed }: SidebarProps) {
  const { signOut, user } = useAuth();

  return (
    <aside 
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-black/50 backdrop-blur-xl border-r border-white/10
        transition-all duration-200 z-40
        ${collapsed ? 'w-20' : 'w-64'}
        transform md:translate-x-0
        ${collapsed ? '-translate-x-full md:translate-x-0' : ''}`}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 py-6 space-y-1">
          {navigation.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 mx-2 rounded-xl
                transition-all duration-200
                ${isActive 
                  ? 'bg-primary text-white' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'}
              `}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{name}</span>}
            </NavLink>
          ))}
        </div>

        {user && (
          <div className="p-4 border-t border-white/10">
            <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} mb-4`}>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                {user.avatar ? (
                  <img src={user.avatar} alt="" className="w-10 h-10 rounded-full" />
                ) : (
                  <span className="text-lg font-bold text-primary">{user.name[0]}</span>
                )}
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user.name}</p>
                  <p className="text-xs text-gray-400 truncate">Level {user.level}</p>
                </div>
              )}
            </div>

            <button
              onClick={signOut}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl
                text-red-400 hover:bg-red-500/10 transition-colors
                ${collapsed ? 'justify-center' : ''}`}
            >
              <LogOut className="h-5 w-5" />
              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
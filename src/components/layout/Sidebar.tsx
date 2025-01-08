import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BookOpen, 
  PenTool, 
  Compass, 
  ShoppingBag, 
  Trophy, 
  Settings,
  User
} from 'lucide-react';

const navigation = [
  { name: 'My Stories', path: '/my-stories', icon: BookOpen },
  { name: 'Create', path: '/create', icon: PenTool },
  { name: 'Explore', path: '/explore', icon: Compass },
  { name: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
  { name: 'Achievements', path: '/achievements', icon: Trophy },
  { name: 'Profile', path: '/profile', icon: User },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-black/50 backdrop-blur-xl border-r border-white/10">
      <nav className="p-4 space-y-2">
        {navigation.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg
              transition-colors duration-200
              ${isActive 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'}
            `}
          >
            <Icon className="h-5 w-5" />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
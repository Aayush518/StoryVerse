import React, { useState } from 'react';
import { Bell, Lock, Palette, Globe, User } from 'lucide-react';

export default function Settings() {
  const [notifications, setNotifications] = useState({
    stories: true,
    comments: true,
    mentions: true,
    newsletter: false
  });

  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Settings</h1>

        <div className="space-y-6">
          {/* Profile Settings */}
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <User className="h-6 w-6 text-purple-400" />
              <h2 className="text-xl font-bold">Profile Settings</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                  defaultValue="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Bio
                </label>
                <textarea
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                  rows={3}
                  defaultValue="Storyteller, dreamer, and creator of worlds."
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Bell className="h-6 w-6 text-purple-400" />
              <h2 className="text-xl font-bold">Notifications</h2>
            </div>
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="capitalize">{key}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Palette className="h-6 w-6 text-purple-400" />
              <h2 className="text-xl font-bold">Appearance</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Theme
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="system">System</option>
                </select>
              </div>
            </div>
          </div>

          {/* Language Settings */}
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Globe className="h-6 w-6 text-purple-400" />
              <h2 className="text-xl font-bold">Language</h2>
            </div>
            <div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="h-6 w-6 text-purple-400" />
              <h2 className="text-xl font-bold">Security</h2>
            </div>
            <div className="space-y-4">
              <button className="w-full bg-gray-700 hover:bg-gray-600 rounded-lg px-4 py-2 transition-colors">
                Change Password
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 rounded-lg px-4 py-2 transition-colors">
                Two-Factor Authentication
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
              Cancel
            </button>
            <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
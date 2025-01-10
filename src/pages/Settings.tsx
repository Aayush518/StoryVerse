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
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text mb-8">Settings</h1>

        <div className="space-y-6">
          {/* Profile Settings */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <User className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Profile Settings</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary text-foreground"
                  defaultValue="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Bio
                </label>
                <textarea
                  className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary text-foreground"
                  rows={3}
                  defaultValue="Storyteller, dreamer, and creator of worlds."
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Bell className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Notifications</h2>
            </div>
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="capitalize text-foreground">{key}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Palette className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Appearance</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Theme
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary text-foreground"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="system">System</option>
                </select>
              </div>
            </div>
          </div>

          {/* Language Settings */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Globe className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Language</h2>
            </div>
            <div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary text-foreground"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>

          {/* Security Settings */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Security</h2>
            </div>
            <div className="space-y-4">
              <button className="w-full bg-background hover:bg-muted border border-border rounded-lg px-4 py-2 transition-colors text-foreground">
                Change Password
              </button>
              <button className="w-full bg-background hover:bg-muted border border-border rounded-lg px-4 py-2 transition-colors text-foreground">
                Two-Factor Authentication
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button className="px-6 py-2 bg-background hover:bg-muted border border-border rounded-lg transition-colors text-foreground">
              Cancel
            </button>
            <button className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
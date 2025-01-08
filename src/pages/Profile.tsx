import React from 'react';
import { Trophy, Star, BookOpen, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  if (!user) return null;

  const stories = user.stories || [];
  const universes = user.universes || [];
  const badges = user.badges || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pt-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-indigo-600">{user.name[0]}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">{user.name}</h1>
              <div className="flex items-center gap-2 text-indigo-100">
                <Star className="h-4 w-4" />
                <span>Level {user.level}</span>
                <span className="text-indigo-200">•</span>
                <span>{user.xp} XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
            <BookOpen className="h-5 w-5 text-blue-400 mb-2" />
            <div className="text-2xl font-bold text-white">{stories.length}</div>
            <div className="text-sm text-slate-400">Stories</div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
            <Users className="h-5 w-5 text-emerald-400 mb-2" />
            <div className="text-2xl font-bold text-white">{universes.length}</div>
            <div className="text-sm text-slate-400">Collaborations</div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
            <Trophy className="h-5 w-5 text-amber-400 mb-2" />
            <div className="text-2xl font-bold text-white">{badges.length}</div>
            <div className="text-sm text-slate-400">Badges</div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
            <Star className="h-5 w-5 text-purple-400 mb-2" />
            <div className="text-2xl font-bold text-white">{user.xp}</div>
            <div className="text-sm text-slate-400">Experience</div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Stories */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-4">Recent Stories</h2>
            {stories.length === 0 ? (
              <p className="text-slate-400">No stories yet</p>
            ) : (
              <div className="space-y-3">
                {stories.map(story => (
                  <div key={story.id} className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
                    <h3 className="font-medium text-white">{story.title}</h3>
                    <p className="text-sm text-slate-400 mt-1">{story.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-4">Achievements</h2>
            {badges.length === 0 ? (
              <p className="text-slate-400">No badges earned yet</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {badges.map((badge, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
                    <Trophy className="h-5 w-5 text-amber-400 mb-2" />
                    <p className="font-medium text-white">{badge}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
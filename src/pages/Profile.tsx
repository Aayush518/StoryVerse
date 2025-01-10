import React from 'react';
import { Trophy, Star, BookOpen, Users, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  if (!user) return null;

  const stories = user.stories || [];
  const universes = user.universes || [];
  const badges = user.badges || [];

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="glass-card rounded-2xl p-8 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
              {user.avatar ? (
                <img src={user.avatar} alt="" className="w-20 h-20 rounded-full" />
              ) : (
                <span className="text-2xl font-bold text-primary">{user.name[0]}</span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">{user.name}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Level {user.level}</span>
                <span className="text-border">•</span>
                <span>{user.xp} XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <StatCard icon={BookOpen} value={stories.length} label="Stories" color="blue" />
          <StatCard icon={Users} value={universes.length} label="Collaborations" color="emerald" />
          <StatCard icon={Trophy} value={badges.length} label="Badges" color="amber" />
          <StatCard icon={Sparkles} value={user.xp} label="Experience" color="purple" />
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Stories */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Recent Stories
            </h2>
            {stories.length === 0 ? (
              <p className="text-muted-foreground">No stories yet</p>
            ) : (
              <div className="space-y-3">
                {stories.map(story => (
                  <div key={story.id} className="group glass-card rounded-lg p-3 hover:bg-card/95 transition-all duration-300">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{story.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Achievements
            </h2>
            {badges.length === 0 ? (
              <p className="text-muted-foreground">No badges earned yet</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {badges.map((badge, index) => (
                  <div key={index} className="group glass-card rounded-lg p-3 hover:bg-card/95 transition-all duration-300">
                    <Trophy className="h-5 w-5 text-yellow-500 mb-2" />
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {badge}
                    </p>
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

interface StatCardProps {
  icon: React.ElementType;
  value: number;
  label: string;
  color: 'blue' | 'emerald' | 'amber' | 'purple';
}

function StatCard({ icon: Icon, value, label, color }: StatCardProps) {
  const colors = {
    blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    emerald: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    amber: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    purple: 'text-purple-500 bg-purple-500/10 border-purple-500/20'
  };

  return (
    <div className="glass-card rounded-xl p-4 hover:scale-105 transition-transform duration-300">
      <div className={`inline-flex p-2 rounded-lg ${colors[color]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-2xl font-bold text-foreground mt-2">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
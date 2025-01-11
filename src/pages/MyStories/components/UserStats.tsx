import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Sparkles, Star } from 'lucide-react';
import { Profile } from '../../../types';
import Button from '../../../components/ui/Button';

interface UserStatsProps {
  user: Profile;
}

export default function UserStats({ user }: UserStatsProps) {
  return (
    <div className="glass-card rounded-2xl p-8 mb-8 bg-gradient-to-r from-primary/10 to-accent/10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt=""
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <span className="text-2xl font-bold text-primary">
                {user.name[0]}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-1">
              Welcome back, {user.name}!
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>Level {user.level} Writer</span>
              <span className="text-muted-foreground/50">•</span>
              <span>{user.xp} XP</span>
            </div>
          </div>
        </div>
        <Link to="/create">
          <Button
            variant="primary"
            className="group bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            <Plus className="h-5 w-5" />
            <span>New Story</span>
            <Sparkles className="h-4 w-4 group-hover:rotate-45 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
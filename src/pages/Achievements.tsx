import React from 'react';
import { Trophy, Star, Target, Award } from 'lucide-react';

const ACHIEVEMENTS = [
  {
    id: '1',
    title: 'Story Master',
    description: 'Created 10 stories that received over 100 likes',
    progress: 80,
    icon: Trophy,
    rarity: 'Legendary'
  },
  {
    id: '2',
    title: 'World Builder',
    description: 'Successfully established a story universe with 5+ contributors',
    progress: 100,
    icon: Target,
    rarity: 'Epic'
  },
  {
    id: '3',
    title: 'Collaborator',
    description: 'Participated in 20 different story universes',
    progress: 60,
    icon: Award,
    rarity: 'Rare'
  }
];

export default function Achievements() {
  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
            Achievements
          </h1>
          <div className="flex items-center space-x-2">
            <Star className="h-6 w-6 text-yellow-500" />
            <span className="text-xl font-bold text-foreground">2,450 XP</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((achievement) => {
            const Icon = achievement.icon;
            const rarityColors = {
              Legendary: {
                bg: 'bg-pink-500/10 dark:bg-pink-500/20',
                text: 'text-pink-500 dark:text-pink-400',
                border: 'border-pink-500/20 dark:border-pink-500/30'
              },
              Epic: {
                bg: 'bg-purple-500/10 dark:bg-purple-500/20',
                text: 'text-purple-500 dark:text-purple-400',
                border: 'border-purple-500/20 dark:border-purple-500/30'
              },
              Rare: {
                bg: 'bg-blue-500/10 dark:bg-blue-500/20',
                text: 'text-blue-500 dark:text-blue-400',
                border: 'border-blue-500/20 dark:border-blue-500/30'
              }
            };
            const colors = rarityColors[achievement.rarity as keyof typeof rarityColors];

            return (
              <div key={achievement.id} className="glass-card rounded-xl p-6 relative overflow-hidden hover:scale-105 transition-transform duration-300">
                <div className={`absolute top-0 right-0 px-3 py-1 text-sm rounded-bl-lg ${colors.bg} ${colors.text}`}>
                  {achievement.rarity}
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className={`p-3 ${colors.bg} rounded-lg ${colors.border} border`}>
                    <Icon className={`h-6 w-6 ${colors.text}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>

                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className={`text-xs font-semibold inline-block ${colors.text}`}>
                        {achievement.progress}%
                      </span>
                    </div>
                  </div>
                  <div className="flex h-2 mb-4 overflow-hidden bg-background rounded">
                    <div
                      style={{ width: `${achievement.progress}%` }}
                      className={`flex flex-col justify-center rounded ${colors.bg} border ${colors.border}`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
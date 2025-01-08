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
          <h1 className="text-4xl font-bold">Achievements</h1>
          <div className="flex items-center space-x-2">
            <Star className="h-6 w-6 text-yellow-400" />
            <span className="text-xl font-bold">2,450 XP</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div key={achievement.id} className="bg-gray-800 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 px-3 py-1 text-sm rounded-bl-lg" 
                     style={{
                       backgroundColor: 
                         achievement.rarity === 'Legendary' ? 'rgba(236, 72, 153, 0.2)' :
                         achievement.rarity === 'Epic' ? 'rgba(147, 51, 234, 0.2)' :
                         'rgba(59, 130, 246, 0.2)',
                       color:
                         achievement.rarity === 'Legendary' ? 'rgb(236, 72, 153)' :
                         achievement.rarity === 'Epic' ? 'rgb(147, 51, 234)' :
                         'rgb(59, 130, 246)'
                     }}>
                  {achievement.rarity}
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-gray-700 rounded-lg">
                    <Icon className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{achievement.title}</h3>
                    <p className="text-gray-400 text-sm">{achievement.description}</p>
                  </div>
                </div>

                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-purple-400">
                        {achievement.progress}%
                      </span>
                    </div>
                  </div>
                  <div className="flex h-2 mb-4 overflow-hidden bg-gray-700 rounded">
                    <div
                      style={{ width: `${achievement.progress}%` }}
                      className="flex flex-col justify-center rounded bg-purple-500"
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
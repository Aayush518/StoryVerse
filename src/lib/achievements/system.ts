export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (stats: UserStats) => boolean;
  reward: number; // XP points
}

interface UserStats {
  storiesWritten: number;
  totalWords: number;
  totalLikes: number;
  commentsReceived: number;
  daysActive: number;
}

export const achievements: Achievement[] = [
  {
    id: 'prolific_writer',
    title: 'Prolific Writer',
    description: 'Write 10 stories',
    icon: 'pen',
    condition: (stats) => stats.storiesWritten >= 10,
    reward: 500
  },
  {
    id: 'word_master',
    title: 'Word Master',
    description: 'Write over 50,000 words',
    icon: 'book',
    condition: (stats) => stats.totalWords >= 50000,
    reward: 1000
  },
  {
    id: 'crowd_favorite',
    title: 'Crowd Favorite',
    description: 'Receive 100 likes on your stories',
    icon: 'heart',
    condition: (stats) => stats.totalLikes >= 100,
    reward: 750
  }
];

export const checkAchievements = (stats: UserStats): Achievement[] => {
  return achievements.filter(achievement => achievement.condition(stats));
};
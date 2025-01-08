import { Storage } from './base';
import { Achievement, checkAchievements } from '../achievements/system';
import { UserStats, UserAchievement } from './types';

export class AchievementStorage extends Storage {
  async getUserStats(userId: string): Promise<UserStats> {
    let stats = this.data.userStats.find(s => s.userId === userId);
    
    if (!stats) {
      stats = {
        userId,
        storiesWritten: 0,
        totalWords: 0,
        totalLikes: 0,
        commentsReceived: 0,
        daysActive: 1,
        lastActive: new Date().toISOString()
      };
      this.data.userStats.push(stats);
    }
    
    return stats;
  }

  async updateUserStats(userId: string, updates: Partial<UserStats>): Promise<UserStats> {
    const index = this.data.userStats.findIndex(s => s.userId === userId);
    const currentDate = new Date().toISOString().split('T')[0];
    
    if (index === -1) {
      const newStats = {
        userId,
        storiesWritten: 0,
        totalWords: 0,
        totalLikes: 0,
        commentsReceived: 0,
        daysActive: 1,
        lastActive: currentDate,
        ...updates
      };
      this.data.userStats.push(newStats);
      return newStats;
    }

    const oldStats = this.data.userStats[index];
    const oldDate = oldStats.lastActive.split('T')[0];
    
    const updatedStats = {
      ...oldStats,
      ...updates,
      lastActive: currentDate,
      daysActive: oldDate !== currentDate ? oldStats.daysActive + 1 : oldStats.daysActive
    };

    this.data.userStats[index] = updatedStats;
    this.save();

    // Check for new achievements
    const newAchievements = checkAchievements(updatedStats);
    await this.processNewAchievements(userId, newAchievements);

    return updatedStats;
  }

  private async processNewAchievements(userId: string, achievements: Achievement[]): Promise<void> {
    const existingAchievements = this.data.achievements.filter(a => a.userId === userId);
    
    for (const achievement of achievements) {
      if (!existingAchievements.some(a => a.achievementId === achievement.id)) {
        this.data.achievements.push({
          userId,
          achievementId: achievement.id,
          unlockedAt: new Date().toISOString()
        });
      }
    }
    
    this.save();
  }
}
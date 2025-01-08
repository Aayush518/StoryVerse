import { useState, useEffect } from 'react';
import { storage } from '../lib/storage';
import { Achievement } from '../lib/achievements/system';
import { UserStats } from '../lib/storage/types';

export function useAchievements(userId: string) {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const stats = await storage.achievements.getUserStats(userId);
        const userAchievements = await storage.achievements.getUserAchievements(userId);
        setUserStats(stats);
        setAchievements(userAchievements);
      } catch (error) {
        console.error('Error loading achievements:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId]);

  const updateStats = async (updates: Partial<UserStats>) => {
    try {
      const updatedStats = await storage.achievements.updateUserStats(userId, updates);
      setUserStats(updatedStats);
    } catch (error) {
      console.error('Error updating stats:', error);
    }
  };

  return {
    userStats,
    achievements,
    loading,
    updateStats
  };
}
import { useState, useEffect, useCallback } from 'react';
import { Story } from '../types';
import { storage } from '../lib/storage';

export function useStories(userId?: string) {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStories = useCallback(async () => {
    if (!userId) {
      setStories([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await storage.getStories(userId);
      setStories(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch stories'));
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const createStory = async (story: Partial<Story>) => {
    try {
      const data = await storage.createStory(story);
      setStories(prev => [data, ...prev]);
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create story');
    }
  };

  const updateStory = async (id: string, updates: Partial<Story>) => {
    try {
      const data = await storage.updateStory(id, updates);
      setStories(prev => prev.map(story => story.id === id ? data : story));
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update story');
    }
  };

  const deleteStory = async (id: string) => {
    try {
      await storage.deleteStory(id);
      setStories(prev => prev.filter(story => story.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete story');
    }
  };

  return {
    stories,
    loading,
    error,
    createStory,
    updateStory,
    deleteStory,
    refreshStories: fetchStories
  };
}
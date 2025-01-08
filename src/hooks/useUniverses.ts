import { useState, useEffect, useCallback } from 'react';
import { Universe } from '../types';
import { storage } from '../lib/storage';

export function useUniverses(userId?: string) {
  const [universes, setUniverses] = useState<Universe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUniverses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await storage.getUniverses(userId);
      setUniverses(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch universes'));
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUniverses();
  }, [fetchUniverses]);

  const createUniverse = async (universe: Partial<Universe>) => {
    try {
      const data = await storage.createUniverse(universe);
      setUniverses(prev => [data, ...prev]);
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create universe');
    }
  };

  const updateUniverse = async (id: string, updates: Partial<Universe>) => {
    try {
      const data = await storage.updateUniverse(id, updates);
      setUniverses(prev => prev.map(universe => universe.id === id ? data : universe));
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update universe');
    }
  };

  const deleteUniverse = async (id: string) => {
    try {
      await storage.deleteUniverse(id);
      setUniverses(prev => prev.filter(universe => universe.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete universe');
    }
  };

  return {
    universes,
    loading,
    error,
    createUniverse,
    updateUniverse,
    deleteUniverse,
    refreshUniverses: fetchUniverses
  };
}
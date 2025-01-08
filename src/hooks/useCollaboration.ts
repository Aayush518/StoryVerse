import { useState, useEffect } from 'react';
import { storage } from '../lib/storage';
import { Collaboration, TimelineEvent } from '../lib/storage/types';

export function useCollaboration(storyId: string) {
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [collab, timeline] = await Promise.all([
          storage.collaboration.getCollaborationEvents(storyId),
          storage.collaboration.getTimelineEvents(storyId)
        ]);
        setCollaborations(collab);
        setTimelineEvents(timeline);
      } catch (error) {
        console.error('Error loading collaboration data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [storyId]);

  const addCollaborationEvent = async (userId: string, action: string) => {
    try {
      const event = await storage.collaboration.addCollaborationEvent(storyId, userId, action);
      setCollaborations(prev => [event, ...prev]);
    } catch (error) {
      console.error('Error adding collaboration event:', error);
    }
  };

  const addTimelineEvent = async (event: Omit<TimelineEvent, 'id'>) => {
    try {
      const newEvent = await storage.collaboration.addTimelineEvent(event);
      setTimelineEvents(prev => [...prev, newEvent]);
    } catch (error) {
      console.error('Error adding timeline event:', error);
    }
  };

  return {
    collaborations,
    timelineEvents,
    loading,
    addCollaborationEvent,
    addTimelineEvent
  };
}
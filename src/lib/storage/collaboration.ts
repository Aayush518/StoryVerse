import { Storage } from './base';
import { Collaboration, TimelineEvent } from './types';

export class CollaborationStorage extends Storage {
  async addCollaborationEvent(storyId: string, userId: string, action: string): Promise<Collaboration> {
    const event: Collaboration = {
      id: crypto.randomUUID(),
      storyId,
      userId,
      action,
      timestamp: new Date().toISOString()
    };

    this.data.collaborations.push(event);
    this.save();
    return event;
  }

  async getCollaborationEvents(storyId: string): Promise<Collaboration[]> {
    return this.data.collaborations
      .filter(c => c.storyId === storyId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async addTimelineEvent(event: Omit<TimelineEvent, 'id'>): Promise<TimelineEvent> {
    const timelineEvent: TimelineEvent = {
      id: crypto.randomUUID(),
      ...event
    };

    this.data.timelineEvents.push(timelineEvent);
    this.save();
    return timelineEvent;
  }

  async getTimelineEvents(storyId: string): Promise<TimelineEvent[]> {
    return this.data.timelineEvents
      .filter(e => e.storyId === storyId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }
}
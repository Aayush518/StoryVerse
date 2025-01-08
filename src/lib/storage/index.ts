import { v4 as uuidv4 } from 'uuid';
import { Story, Profile, Universe, Comment } from '../types';

interface StorageData {
  profiles: Profile[];
  stories: Story[];
  universes: Universe[];
  comments: Comment[];
  revisions: StoryRevision[];
  achievements: UserAchievement[];
  collaborations: Collaboration[];
  tags: string[];
  bookmarks: Bookmark[];
  readingHistory: ReadingHistory[];
}

// New interfaces
interface Bookmark {
  id: string;
  userId: string;
  storyId: string;
  createdAt: string;
}

interface ReadingHistory {
  id: string;
  userId: string;
  storyId: string;
  progress: number; // Percentage read
  lastReadAt: string;
}

interface StoryRevision {
  id: string;
  storyId: string;
  content: string;
  title: string;
  description: string;
  timestamp: string;
  authorId: string;
}

interface UserAchievement {
  id: string;
  userId: string;
  type: string;
  unlockedAt: string;
  progress: number;
}

interface Collaboration {
  id: string;
  storyId: string;
  userId: string;
  role: 'editor' | 'viewer';
  joinedAt: string;
}

class StorageManager {
  private static instance: StorageManager;
  private data: StorageData;
  private readonly STORAGE_KEY = 'storyverse_data';
  private autoSaveInterval: number = 5000;

  private constructor() {
    this.data = this.loadFromStorage();
    this.setupAutoSave();
  }

  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  private loadFromStorage(): StorageData {
    const savedData = localStorage.getItem(this.STORAGE_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    }
    return this.getInitialData();
  }

  private getInitialData(): StorageData {
    return {
      profiles: [],
      stories: [],
      universes: [],
      comments: [],
      revisions: [],
      achievements: [],
      collaborations: [],
      tags: ['Fantasy', 'Sci-Fi', 'Mystery', 'Romance', 'Horror', 'Adventure'],
      bookmarks: [],
      readingHistory: []
    };
  }

  private setupAutoSave() {
    setInterval(() => this.saveToStorage(), this.autoSaveInterval);
  }

  private saveToStorage() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  // Bookmark Management
  async addBookmark(userId: string, storyId: string): Promise<void> {
    const bookmark: Bookmark = {
      id: uuidv4(),
      userId,
      storyId,
      createdAt: new Date().toISOString()
    };
    this.data.bookmarks.push(bookmark);
    this.saveToStorage();
  }

  async removeBookmark(userId: string, storyId: string): Promise<void> {
    this.data.bookmarks = this.data.bookmarks.filter(
      b => !(b.userId === userId && b.storyId === storyId)
    );
    this.saveToStorage();
  }

  async getBookmarks(userId: string): Promise<Story[]> {
    const bookmarkIds = this.data.bookmarks
      .filter(b => b.userId === userId)
      .map(b => b.storyId);
    return this.data.stories
      .filter(s => bookmarkIds.includes(s.id))
      .map(story => this.enrichStory(story));
  }

  // Reading History Management
  async updateReadingProgress(userId: string, storyId: string, progress: number): Promise<void> {
    const existingEntry = this.data.readingHistory.find(
      h => h.userId === userId && h.storyId === storyId
    );

    if (existingEntry) {
      existingEntry.progress = progress;
      existingEntry.lastReadAt = new Date().toISOString();
    } else {
      this.data.readingHistory.push({
        id: uuidv4(),
        userId,
        storyId,
        progress,
        lastReadAt: new Date().toISOString()
      });
    }
    this.saveToStorage();
  }

  async getReadingHistory(userId: string): Promise<(Story & { progress: number })[]> {
    const history = this.data.readingHistory.filter(h => h.userId === userId);
    return history.map(h => ({
      ...this.enrichStory(this.data.stories.find(s => s.id === h.storyId)!),
      progress: h.progress
    }));
  }

  // Story Management with enhanced features
  async createStory(storyData: Partial<Story>): Promise<Story> {
    const story: Story = {
      id: uuidv4(),
      title: storyData.title || '',
      content: storyData.content || '',
      description: storyData.description || '',
      author_id: storyData.author_id!,
      status: storyData.status || 'draft',
      tags: storyData.tags || [],
      likes: 0,
      views: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      reading_time: this.calculateReadingTime(storyData.content || ''),
      word_count: this.countWords(storyData.content || '')
    };

    this.data.stories.push(story);
    this.createRevision(story);
    this.saveToStorage();
    return this.enrichStory(story);
  }

  // ... rest of the existing methods ...
}

export const storage = StorageManager.getInstance();
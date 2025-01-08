import { StorageData } from './types';

const STORAGE_KEY = 'storyverse_data';

export class Storage {
  protected data: StorageData;

  constructor() {
    this.data = this.loadFromStorage();
  }

  private loadFromStorage(): StorageData {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch (error) {
      console.error('Error loading data from storage:', error);
    }

    // Return default data if nothing is stored or on error
    return {
      profiles: [],
      stories: [],
      universes: [],
      badges: [],
      userBadges: [],
      universeRules: [],
      universeLore: [],
      universeCollaborators: []
    };
  }

  protected save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (error) {
      console.error('Error saving data to storage:', error);
    }
  }

  getData(): StorageData {
    return this.data;
  }

  clear() {
    this.data = this.loadFromStorage();
    this.save();
  }
}
import { Story } from '../../types';
import { Storage } from './base';

export class StoryStorage extends Storage {
  async getStories(userId?: string): Promise<Story[]> {
    let stories = this.data.stories;
    if (userId) {
      stories = stories.filter(s => s.author_id === userId);
    }
    return stories.map(story => ({
      ...story,
      author: this.data.profiles.find(p => p.id === story.author_id)
    }));
  }

  async createStory(story: Partial<Story>): Promise<Story> {
    const newStory: Story = {
      id: crypto.randomUUID(),
      title: story.title || '',
      content: story.content || '',
      description: story.description || '',
      author_id: story.author_id!,
      universe_id: story.universe_id || null,
      status: story.status || 'draft',
      likes: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.data.stories.push(newStory);
    this.save();
    return {
      ...newStory,
      author: this.data.profiles.find(p => p.id === newStory.author_id)
    };
  }

  async updateStory(id: string, updates: Partial<Story>): Promise<Story> {
    const index = this.data.stories.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Story not found');

    const updatedStory = {
      ...this.data.stories[index],
      ...updates,
      updated_at: new Date().toISOString()
    };

    this.data.stories[index] = updatedStory;
    this.save();
    return {
      ...updatedStory,
      author: this.data.profiles.find(p => p.id === updatedStory.author_id)
    };
  }

  async deleteStory(id: string): Promise<void> {
    this.data.stories = this.data.stories.filter(s => s.id !== id);
    this.save();
  }
}
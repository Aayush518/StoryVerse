import { Profile, Story, Universe, Comment, Reaction } from '../types';

interface StorageData {
  profiles: Profile[];
  stories: Story[];
  universes: Universe[];
  comments: Comment[];
  tags: string[];
  storyTags: { storyId: string; tagId: string }[];
  reactions: Reaction[];
}

const initialData: StorageData = {
  profiles: [{
    id: 'test-user',
    email: 'test@example.com',
    name: 'Test User',
    level: 1,
    xp: 0,
    bio: 'Storyteller and creator',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }],
  stories: [],
  universes: [],
  comments: [],
  tags: ['Fantasy', 'Sci-Fi', 'Mystery', 'Romance', 'Horror', 'Adventure'],
  storyTags: [],
  reactions: []
};

class Storage {
  private data: StorageData;

  constructor() {
    const savedData = localStorage.getItem('storyverse');
    this.data = savedData ? JSON.parse(savedData) : initialData;
    this.save();
  }

  private save() {
    localStorage.setItem('storyverse', JSON.stringify(this.data));
  }

  async signIn(email: string, password: string): Promise<Profile> {
    if ((email === 'test' && password === 'test') || 
        (email === 'test@example.com' && password === 'test')) {
      const testUser = this.data.profiles.find(p => p.id === 'test-user');
      if (!testUser) throw new Error('Test user not found');
      return testUser;
    }

    const profile = this.data.profiles.find(p => p.email === email);
    if (!profile) {
      throw new Error('Invalid credentials');
    }
    return profile;
  }

  async getStories(userId?: string): Promise<Story[]> {
    let stories = this.data.stories;
    if (userId) {
      stories = stories.filter(s => s.author_id === userId);
    }
    return stories.map(story => this.enrichStory(story));
  }

  private enrichStory(story: Story): Story {
    const author = this.data.profiles.find(p => p.id === story.author_id);
    const tags = this.data.storyTags
      .filter(st => st.storyId === story.id)
      .map(st => this.data.tags.find(t => t === st.tagId))
      .filter(Boolean) as string[];

    return {
      ...story,
      author,
      tags
    };
  }

  async createStory(story: Partial<Story>): Promise<Story> {
    const wordCount = story.content?.split(/\s+/).length || 0;
    const readingTime = Math.ceil(wordCount / 200);

    const newStory: Story = {
      id: crypto.randomUUID(),
      title: story.title || '',
      content: story.content || '',
      description: story.description || '',
      author_id: story.author_id!,
      universe_id: story.universe_id || null,
      status: story.status || 'draft',
      cover_image: story.cover_image,
      reading_time: readingTime,
      word_count: wordCount,
      likes: 0,
      views: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.data.stories.push(newStory);
    
    if (story.tags) {
      story.tags.forEach(tag => {
        this.data.storyTags.push({
          storyId: newStory.id,
          tagId: tag
        });
      });
    }

    this.save();
    return this.enrichStory(newStory);
  }

  async updateStory(id: string, updates: Partial<Story>): Promise<Story> {
    const index = this.data.stories.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Story not found');

    if (updates.content) {
      updates.word_count = updates.content.split(/\s+/).length;
      updates.reading_time = Math.ceil(updates.word_count / 200);
    }

    const updatedStory = {
      ...this.data.stories[index],
      ...updates,
      updated_at: new Date().toISOString()
    };

    this.data.stories[index] = updatedStory;

    if (updates.tags) {
      this.data.storyTags = this.data.storyTags.filter(st => st.storyId !== id);
      updates.tags.forEach(tag => {
        this.data.storyTags.push({
          storyId: id,
          tagId: tag
        });
      });
    }

    this.save();
    return this.enrichStory(updatedStory);
  }

  async deleteStory(id: string): Promise<void> {
    this.data.stories = this.data.stories.filter(s => s.id !== id);
    this.data.storyTags = this.data.storyTags.filter(st => st.storyId !== id);
    this.data.comments = this.data.comments.filter(c => c.story_id !== id);
    this.data.reactions = this.data.reactions.filter(r => r.story_id !== id);
    this.save();
  }

  async addComment(storyId: string, userId: string, content: string): Promise<Comment> {
    const comment: Comment = {
      id: crypto.randomUUID(),
      story_id: storyId,
      user_id: userId,
      content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.data.comments.push(comment);
    this.save();
    return {
      ...comment,
      user: this.data.profiles.find(p => p.id === userId)
    };
  }

  async getComments(storyId: string): Promise<Comment[]> {
    return this.data.comments
      .filter(c => c.story_id === storyId)
      .map(comment => ({
        ...comment,
        user: this.data.profiles.find(p => p.id === comment.user_id)
      }));
  }

  async toggleReaction(storyId: string, userId: string, type: Reaction['type']): Promise<void> {
    const existingReaction = this.data.reactions.find(
      r => r.story_id === storyId && r.user_id === userId && r.type === type
    );

    if (existingReaction) {
      this.data.reactions = this.data.reactions.filter(r => r !== existingReaction);
    } else {
      this.data.reactions.push({
        story_id: storyId,
        user_id: userId,
        type,
        created_at: new Date().toISOString()
      });
    }

    const story = this.data.stories.find(s => s.id === storyId);
    if (story) {
      story.likes = this.data.reactions.filter(
        r => r.story_id === storyId && r.type === 'like'
      ).length;
    }

    this.save();
  }
}

export const storage = new Storage();
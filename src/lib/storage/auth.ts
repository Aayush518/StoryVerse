import { Profile } from '../../types';
import { Storage } from './base';

const TEST_USER: Profile = {
  id: 'test-user',
  email: 'test@example.com',
  name: 'Test User',
  level: 1,
  xp: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

export class AuthStorage extends Storage {
  constructor() {
    super();
    // Add test user if not exists
    if (!this.data.profiles.find(p => p.email === TEST_USER.email)) {
      this.data.profiles.push(TEST_USER);
    }
  }

  async signIn(email: string, password: string): Promise<Profile> {
    // Test user login
    if (email === 'test' && password === 'test') {
      return this.enrichProfile(TEST_USER);
    }

    const profile = this.data.profiles.find(p => p.email === email);
    if (!profile) {
      throw new Error('Invalid credentials');
    }
    return this.enrichProfile(profile);
  }

  async signUp(email: string, password: string, name: string): Promise<Profile> {
    if (!email || !password || !name) {
      throw new Error('All fields are required');
    }

    if (this.data.profiles.some(p => p.email === email)) {
      throw new Error('Email already exists');
    }

    const profile: Profile = {
      id: crypto.randomUUID(),
      email,
      name,
      level: 1,
      xp: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.data.profiles.push(profile);
    this.save();
    return this.enrichProfile(profile);
  }

  private enrichProfile(profile: Profile) {
    return {
      ...profile,
      stories: this.data.stories.filter(s => s.author_id === profile.id),
      universes: this.data.universes.filter(u => u.creator_id === profile.id),
      badges: this.data.userBadges
        .filter(ub => ub.userId === profile.id)
        .map(ub => this.data.badges.find(b => b.id === ub.badgeId)!)
    };
  }
}
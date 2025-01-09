import { Profile } from '../../types';

const STORAGE_KEY = 'storyverse_auth';

interface StoredAuth {
  users: Profile[];
  currentUser: Profile | null;
}

const initialAuth: StoredAuth = {
  users: [
    {
      id: 'test-user',
      email: 'test@example.com',
      name: 'Test User',
      level: 1,
      xp: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  currentUser: null
};

export class AuthStorage {
  private data: StoredAuth;

  constructor() {
    const stored = localStorage.getItem(STORAGE_KEY);
    this.data = stored ? JSON.parse(stored) : initialAuth;
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
  }

  async signIn(email: string, password: string): Promise<Profile> {
    // For demo purposes, accept any password for test@example.com
    if (email === 'test@example.com') {
      const user = this.data.users.find(u => u.email === email);
      if (user) {
        this.data.currentUser = user;
        this.save();
        return user;
      }
    }

    const user = this.data.users.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    this.data.currentUser = user;
    this.save();
    return user;
  }

  async signUp(email: string, password: string, name: string): Promise<Profile> {
    if (this.data.users.some(u => u.email === email)) {
      throw new Error('Email already exists');
    }

    const newUser: Profile = {
      id: crypto.randomUUID(),
      email,
      name,
      level: 1,
      xp: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.data.users.push(newUser);
    this.data.currentUser = newUser;
    this.save();
    return newUser;
  }

  async signOut(): Promise<void> {
    this.data.currentUser = null;
    this.save();
  }

  getCurrentUser(): Profile | null {
    return this.data.currentUser;
  }
}

export const authStorage = new AuthStorage();
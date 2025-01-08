export interface Profile {
  id: string;
  email: string;
  name: string;
  level: number;
  xp: number;
  bio?: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
  stories?: Story[];
  universes?: Universe[];
}

export interface Story {
  id: string;
  title: string;
  content: string;
  description: string;
  author_id: string;
  universe_id: string | null;
  status: 'draft' | 'published' | 'archived';
  cover_image?: string;
  reading_time?: number;
  word_count?: number;
  likes: number;
  views: number;
  tags?: string[];
  created_at: string;
  updated_at: string;
  author?: Profile;
}

export interface Universe {
  id: string;
  name: string;
  description: string;
  creator_id: string;
  created_at: string;
  updated_at: string;
  creator?: Profile;
  stories?: Story[];
  collaborators?: Profile[];
}

export interface Comment {
  id: string;
  story_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  user?: Profile;
}

export interface Reaction {
  story_id: string;
  user_id: string;
  type: 'like' | 'heart' | 'bookmark';
  created_at: string;
}
export interface StorageData {
  profiles: Profile[];
  stories: Story[];
  universes: Universe[];
  comments: Comment[];
  revisions: StoryRevision[];
  achievements: UserAchievement[];
  collaborations: Collaboration[];
}

export interface StoryRevision {
  id: string;
  storyId: string;
  content: string;
  title: string;
  description: string;
  timestamp: string;
  authorId: string;
}

export interface UserAchievement {
  id: string;
  userId: string;
  type: string;
  unlockedAt: string;
  progress: number;
}

export interface Collaboration {
  id: string;
  storyId: string;
  userId: string;
  role: 'editor' | 'viewer';
  joinedAt: string;
}
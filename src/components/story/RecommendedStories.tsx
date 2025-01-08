import React from 'react';
import { Story } from '../../types';
import StoryCard from './StoryCard';

interface RecommendedStoriesProps {
  currentStoryId: string;
  stories: Story[];
}

export default function RecommendedStories({ currentStoryId, stories }: RecommendedStoriesProps) {
  const recommendations = stories
    .filter(story => story.id !== currentStoryId)
    .slice(0, 3);

  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Recommended Stories</h3>
      <div className="space-y-4">
        {recommendations.map(story => (
          <StoryCard key={story.id} story={story} showActions={false} />
        ))}
      </div>
    </div>
  );
}
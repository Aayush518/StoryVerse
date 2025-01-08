import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, Clock, Eye, Bookmark } from 'lucide-react';
import { Story } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { storage } from '../../lib/storage';

interface StoryCardProps {
  story: Story;
  showActions?: boolean;
}

export default function StoryCard({ story, showActions = true }: StoryCardProps) {
  const { user } = useAuth();
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      if (isBookmarked) {
        await storage.removeBookmark(user.id, story.id);
      } else {
        await storage.addBookmark(user.id, story.id);
      }
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  return (
    <Link to={`/story/${story.id}`} className="block">
      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
        <div className="flex gap-6">
          {story.cover_image && (
            <img 
              src={story.cover_image} 
              alt={story.title}
              className="w-32 h-32 object-cover rounded-lg"
            />
          )}
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                <p className="text-gray-400 line-clamp-2">{story.description}</p>
              </div>
              
              {showActions && user && (
                <button 
                  onClick={handleBookmark}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Bookmark 
                    className={`h-5 w-5 ${isBookmarked ? 'fill-purple-500 text-purple-500' : 'text-gray-400'}`} 
                  />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {story.tags?.map(tag => (
                <span 
                  key={tag} 
                  className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {story.views} views
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                {story.likes} likes
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {story.reading_time} min read
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {story.word_count} words
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { Comment } from '../../types';
import Button from '../ui/Button';

interface StoryCommentsProps {
  storyId: string;
  comments: Comment[];
  onAddComment: (content: string) => Promise<void>;
}

export default function StoryComments({ storyId, comments, onAddComment }: StoryCommentsProps) {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !user) return;

    setIsSubmitting(true);
    try {
      await onAddComment(content);
      setContent('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Comments ({comments.length})</h3>
      
      {user ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add a comment..."
            className="w-full bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-white/10 min-h-[100px] focus:ring-2 focus:ring-purple-500"
          />
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting || !content.trim()}
            loading={isSubmitting}
          >
            Post Comment
          </Button>
        </form>
      ) : (
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
          <p className="text-gray-400">Please sign in to comment</p>
        </div>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center space-x-3 mb-3">
              {comment.user?.avatar ? (
                <img 
                  src={comment.user.avatar} 
                  alt="" 
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                  <span className="text-lg font-bold">
                    {comment.user?.name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <div className="font-medium">{comment.user?.name}</div>
                <div className="text-sm text-gray-400">
                  {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                </div>
              </div>
            </div>
            <p className="text-gray-300 pl-13">{comment.content}</p>
          </div>
        ))}

        {comments.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No comments yet. Be the first to comment!
          </div>
        )}
      </div>
    </div>
  );
}
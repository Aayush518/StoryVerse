import React from 'react';
import { Link } from 'react-router-dom';
import { Edit3, Share2, Trash2, Eye, Clock, FileText } from 'lucide-react';
import type { Story } from '../../../types';

interface StoryCardProps {
  story: Story;
  onDelete: (id: string) => void;
}

export default function StoryCard({ story, onDelete }: StoryCardProps) {
  return (
    <div className="group glass-card rounded-xl p-6 hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 transition-all duration-500">
      <div className="flex flex-col md:flex-row gap-6">
        {story.cover_image && (
          <img
            src={story.cover_image}
            alt={story.title}
            className="w-full md:w-48 h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
          />
        )}

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text group-hover:scale-105 transition-transform duration-500">
                {story.title}
              </h2>
              <p className="text-muted-foreground mt-1">
                {story.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to={`/create/${story.id}`}
                className="p-2 bg-background/50 hover:bg-primary/20 border border-border rounded-lg transition-all group-hover:scale-110"
              >
                <Edit3 className="h-5 w-5" />
              </Link>
              <button className="p-2 bg-background/50 hover:bg-primary/20 border border-border rounded-lg transition-all group-hover:scale-110">
                <Share2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDelete(story.id)}
                className="p-2 bg-background/50 hover:bg-destructive/10 border border-border text-destructive rounded-lg transition-all group-hover:scale-110"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {story.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm group-hover:bg-primary/20 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span
              className={cn(
                "px-3 py-1 rounded-full",
                story.status === 'published' && "bg-green-500/20 text-green-400",
                story.status === 'archived' && "bg-background text-muted-foreground",
                story.status === 'draft' && "bg-yellow-500/20 text-yellow-400"
              )}
            >
              {story.status.charAt(0).toUpperCase() + story.status.slice(1)}
            </span>

            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {story.views} views
            </div>

            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {story.reading_time} min read
            </div>

            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              {story.word_count} words
            </div>

            <span className="text-muted-foreground/70">
              Last edited: {new Date(story.updated_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
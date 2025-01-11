import React from 'react';
import { Search, Filter } from 'lucide-react';

interface StoryFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  tagFilter: string;
  onTagChange: (value: string) => void;
}

export default function StoryFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  tagFilter,
  onTagChange
}: StoryFiltersProps) {
  return (
    <div className="glass-card rounded-xl p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search your stories..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-card/50 backdrop-blur-sm border border-border rounded-lg focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-4 py-2 bg-card/50 backdrop-blur-sm border border-border rounded-lg focus:ring-2 focus:ring-primary transition-all"
          >
            <option value="all">All Status</option>
            <option value="draft">Drafts</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={tagFilter}
            onChange={(e) => onTagChange(e.target.value)}
            className="px-4 py-2 bg-card/50 backdrop-blur-sm border border-border rounded-lg focus:ring-2 focus:ring-primary transition-all"
          >
            <option value="all">All Tags</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
            <option value="Horror">Horror</option>
            <option value="Adventure">Adventure</option>
          </select>
        </div>
      </div>
    </div>
  );
}
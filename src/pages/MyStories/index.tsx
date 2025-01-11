import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStories } from '../../hooks/useStories';
import { useToastContext } from '../../context/ToastContext';
import Button from '../../components/ui/Button';
import UserStats from './components/UserStats';
import StoryFilters from './components/StoryFilters';
import StoryCard from './components/StoryCard';

export default function MyStories() {
  const { user } = useAuth();
  const { stories = [], deleteStory, refreshStories } = useStories(user?.id);
  const { addToast } = useToastContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this story?')) return;
    try {
      await deleteStory(id);
      addToast('Story deleted successfully', 'success');
      refreshStories();
    } catch (err) {
      addToast('Failed to delete story', 'error');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            Please sign in to view your stories
          </h2>
          <Link to="/" className="text-primary hover:text-primary/80">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  const filteredStories = stories?.filter((story) => {
    const matchesSearch =
      story.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || story.status === statusFilter;
    const matchesTag = tagFilter === 'all' || story.tags?.includes(tagFilter);
    return matchesSearch && matchesStatus && matchesTag;
  });

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <UserStats user={user} />
        
        <StoryFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          tagFilter={tagFilter}
          onTagChange={setTagFilter}
        />

        {filteredStories.length === 0 ? (
          <div className="text-center py-12">
            <div className="glass-card rounded-2xl p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No stories found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || statusFilter !== 'all' || tagFilter !== 'all'
                  ? 'No stories match your search criteria'
                  : 'Start your creative journey by writing your first story'}
              </p>
              <Link to="/create">
                <Button
                  variant="primary"
                  className="flex items-center justify-center w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  <span>Create Your First Story</span>
                  <Sparkles className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredStories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
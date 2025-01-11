import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Edit3,
  Trash2,
  Share2,
  Plus,
  Eye,
  Clock,
  FileText,
  ChevronDown,
  Sparkles,
  Star,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStories } from '../hooks/useStories';
import { useToastContext } from '../context/ToastContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';

export default function MyStories() {
  const { user } = useAuth();
  const {
    stories = [],
    loading,
    error,
    deleteStory,
    refreshStories,
  } = useStories(user?.id);
  const { addToast } = useToastContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredStories = stories?.filter((story) => {
    const matchesSearch =
      story.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || story.status === statusFilter;
    const matchesTag = tagFilter === 'all' || story.tags?.includes(tagFilter);
    return matchesSearch && matchesStatus && matchesTag;
  });

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

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* User Stats Banner */}
        <div className="glass-card rounded-2xl p-8 mb-8 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt=""
                    className="w-16 h-16 rounded-full"
                  />
                ) : (
                  <span className="text-2xl font-bold text-primary">
                    {user.name[0]}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">
                  Welcome back, {user.name}!
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>Level {user.level} Writer</span>
                  <span className="text-muted-foreground/50">•</span>
                  <span>{user.xp} XP</span>
                </div>
              </div>
            </div>
            <Link to="/create">
              <Button
                variant="primary"
                className="group bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                <Plus className="h-5 w-5" />
                <span>New Story</span>
                <Sparkles className="h-4 w-4 group-hover:rotate-45 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="glass-card rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search your stories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary transition-all"
              >
                <option value="all">All Status</option>
                <option value="draft">Drafts</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>

              <select
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                className="px-4 py-2 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary transition-all"
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

        {/* Stories Grid */}
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
              <div
                key={story.id}
                className="group glass-card rounded-xl p-6 hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 transition-all duration-500"
              >
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
                          onClick={() => handleDelete(story.id)}
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
                        className={`px-3 py-1 rounded-full ${
                          story.status === 'published'
                            ? 'bg-green-500/20 text-green-400'
                            : story.status === 'archived'
                            ? 'bg-background text-muted-foreground'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {story.status.charAt(0).toUpperCase() +
                          story.status.slice(1)}
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
                        Last edited:{' '}
                        {new Date(story.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

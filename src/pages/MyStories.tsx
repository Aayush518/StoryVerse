import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Edit3, Trash2, Share2, Plus, Eye, Clock, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStories } from '../hooks/useStories';
import { useToastContext } from '../context/ToastContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';

export default function MyStories() {
  const { user } = useAuth();
  const { stories, loading, error, deleteStory, refreshStories } = useStories(user?.id);
  const { addToast } = useToastContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || story.status === statusFilter;
    const matchesTag = tagFilter === 'all' || story.tags?.includes(tagFilter);
    return matchesSearch && matchesStatus && matchesTag;
  });

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      try {
        await deleteStory(id);
        addToast('Story deleted successfully', 'success');
        refreshStories();
      } catch (err) {
        addToast('Failed to delete story', 'error');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg">
            {error.message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-4xl font-bold mb-4 md:mb-0">My Stories</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-black/40 rounded-lg focus:ring-2 focus:ring-purple-500 w-full sm:w-64"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-4 py-2 bg-black/40 rounded-lg focus:ring-2 focus:ring-purple-500 w-full sm:w-48"
              >
                <option value="all">All Status</option>
                <option value="draft">Drafts</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              className="pl-4 pr-4 py-2 bg-black/40 rounded-lg focus:ring-2 focus:ring-purple-500 w-full sm:w-48"
            >
              <option value="all">All Tags</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Mystery">Mystery</option>
              <option value="Romance">Romance</option>
              <option value="Horror">Horror</option>
              <option value="Adventure">Adventure</option>
            </select>

            <Link to="/create">
              <Button variant="primary" icon={<Plus className="h-5 w-5" />}>
                New Story
              </Button>
            </Link>
          </div>
        </div>

        {filteredStories.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-2">No stories found</h3>
              <p className="text-gray-400 mb-6">
                {searchTerm || statusFilter !== 'all' || tagFilter !== 'all'
                  ? "No stories match your search criteria"
                  : "Start creating your first story"}
              </p>
              <Link to="/create">
                <Button variant="primary" icon={<Plus className="h-5 w-5" />}>
                  Create Story
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredStories.map((story) => (
              <div key={story.id} className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-6">
                  {story.cover_image && (
                    <img 
                      src={story.cover_image} 
                      alt={story.title}
                      className="w-full md:w-48 h-32 object-cover rounded-lg"
                    />
                  )}
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h2 className="text-2xl font-bold">{story.title}</h2>
                        <p className="text-gray-400 mt-1">{story.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/create/${story.id}`}
                          className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <Edit3 className="h-5 w-5" />
                        </Link>
                        <button 
                          className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                          onClick={() => {/* Share functionality */}}
                        >
                          <Share2 className="h-5 w-5" />
                        </button>
                        <button 
                          className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-red-400"
                          onClick={() => handleDelete(story.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {story.tags?.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <span className={`px-3 py-1 rounded-full ${
                        story.status === 'published' 
                          ? 'bg-green-500/20 text-green-400' 
                          : story.status === 'archived'
                          ? 'bg-gray-500/20 text-gray-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {story.status.charAt(0).toUpperCase() + story.status.slice(1)}
                      </span>
                      
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {story.views} views
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {story.reading_time} min read
                      </div>
                      
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        {story.word_count} words
                      </div>
                      
                      <span>
                        Last edited: {new Date(story.updated_at).toLocaleDateString()}
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
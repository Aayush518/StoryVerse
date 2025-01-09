import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Sparkles, Trophy, Save, History, Share2, BookOpen, Star, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToastContext } from '../context/ToastContext';
import StoryEditor from '../components/story/StoryEditor';
import CollaborativeEditor from '../components/collaboration/CollaborativeEditor';
import { storage } from '../lib/storage';
import { generateSuggestions } from '../lib/ai/suggestions';
import { analyzeStory } from '../lib/analytics/storyMetrics';

export default function Create() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToastContext();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showCollaboration, setShowCollaboration] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [saving, setSaving] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const metrics = analyzeStory(content);
  const suggestions = generateSuggestions(content);

  const handleSave = async (isAutoSave = false) => {
    if (!user) {
      addToast('Please sign in to save your story', 'error');
      return;
    }

    if (!title.trim()) {
      addToast('Please enter a title for your story', 'error');
      return;
    }

    try {
      setSaving(true);
      const storyData = {
        title,
        content,
        description,
        author_id: user.id,
        tags: selectedTags,
        status: 'draft'
      };

      const savedStory = await storage.createStory(storyData);
      
      if (!isAutoSave) {
        addToast('Story saved successfully!', 'success');
        navigate('/my-stories');
      }
    } catch (error) {
      addToast(error instanceof Error ? error.message : 'Failed to save story', 'error');
    } finally {
      setSaving(false);
    }
  };

  const availableTags = ['Fantasy', 'Sci-Fi', 'Mystery', 'Romance', 'Horror', 'Adventure'];

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-16">
      <div className="max-w-7xl mx-auto">
        {/* Header with User Stats */}
        <div className="glass-card rounded-2xl p-6 mb-8 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                {user?.avatar ? (
                  <img src={user.avatar} alt="" className="w-12 h-12 rounded-full" />
                ) : (
                  <span className="text-xl font-bold text-primary">{user?.name[0]}</span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-muted-foreground">Level {user?.level} Writer</span>
                </div>
                <div className="w-32 h-2 bg-background/50 rounded-full mt-1">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    style={{ width: `${(user?.xp || 0) % 1000 / 10}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowCollaboration(!showCollaboration)}
                className="flex items-center gap-2 px-4 py-2 glass-card hover:bg-primary/10 rounded-lg transition-all"
              >
                <Users className="h-5 w-5" />
                <span>Collaborate</span>
              </button>
              <button
                onClick={() => setShowAI(!showAI)}
                className="flex items-center gap-2 px-4 py-2 glass-card hover:bg-primary/10 rounded-lg transition-all"
              >
                <Sparkles className="h-5 w-5" />
                <span>AI Assistant</span>
              </button>
              <button
                onClick={() => handleSave()}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:opacity-90 transition-all"
              >
                <Save className="h-5 w-5" />
                <span>{saving ? 'Saving...' : 'Save'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Editor */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-xl p-6">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your story title..."
                className="text-3xl font-bold bg-transparent border-none focus:outline-none focus:ring-0 w-full mb-4"
              />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a brief description..."
                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-muted-foreground mb-6"
              />
              <div className="flex flex-wrap gap-2 mb-6">
                {availableTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTags(prev => 
                      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                    )}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      selectedTags.includes(tag)
                        ? 'bg-primary text-white'
                        : 'bg-background/50 text-muted-foreground hover:bg-primary/10'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              {showCollaboration ? (
                <CollaborativeEditor
                  content={content}
                  onChange={setContent}
                  onSave={() => handleSave()}
                />
              ) : (
                <StoryEditor />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Story Metrics */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Story Metrics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Reading time</span>
                  <span className="font-medium">{metrics.readingTime} min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Word count</span>
                  <span className="font-medium">{metrics.wordCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Unique words</span>
                  <span className="font-medium">{metrics.uniqueWords}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Readability</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-background/50 rounded-full">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"
                        style={{ width: `${metrics.readabilityScore}%` }}
                      />
                    </div>
                    <span className="font-medium">{metrics.readabilityScore}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Suggestions */}
            {showAI && (
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  AI Suggestions
                </h3>
                <div className="space-y-4">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-3 bg-primary/10 rounded-lg border border-primary/20"
                    >
                      <p className="text-sm">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Achievements */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Recent Achievements
              </h3>
              <div className="space-y-4">
                <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <h4 className="font-medium text-yellow-500">Word Master</h4>
                  <p className="text-sm text-muted-foreground">50,000 words written</p>
                  <div className="mt-2 h-2 bg-background/50 rounded-full">
                    <div 
                      className="h-full bg-yellow-500 rounded-full"
                      style={{ width: '60%' }}
                    />
                  </div>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <h4 className="font-medium text-primary">Prolific Writer</h4>
                  <p className="text-sm text-muted-foreground">Write 10 stories</p>
                  <div className="mt-2 h-2 bg-background/50 rounded-full">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: '30%' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2 px-4 py-2 glass-card hover:bg-primary/10 rounded-lg transition-all">
                  <History className="h-5 w-5" />
                  <span>View Revisions</span>
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 glass-card hover:bg-primary/10 rounded-lg transition-all">
                  <Share2 className="h-5 w-5" />
                  <span>Share Draft</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
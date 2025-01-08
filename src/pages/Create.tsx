import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StoryEditor from '../components/story/StoryEditor';
import CollaborativeEditor from '../components/collaboration/CollaborativeEditor';
import { useAuth } from '../context/AuthContext';
import { useToastContext } from '../context/ToastContext';
import { storage } from '../lib/storage';
import { generateSuggestions } from '../lib/ai/suggestions';
import { analyzeStory } from '../lib/analytics/storyMetrics';
import { Users, Sparkles, Trophy, Save, History, Share2 } from 'lucide-react';

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
  const [revisions, setRevisions] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const metrics = analyzeStory(content);
  const suggestions = generateSuggestions(content);

  // Auto-save functionality
  useEffect(() => {
    if (!autoSave || !content || !title) return;

    const timer = setTimeout(() => {
      handleSave(true);
    }, 30000); // Auto-save every 30 seconds

    return () => clearTimeout(timer);
  }, [content, title, autoSave]);

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
    <div className="min-h-screen bg-black pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter story title..."
              className="text-4xl font-bold bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-600"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a brief description..."
              className="mt-2 w-full bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-600 text-gray-400"
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setShowCollaboration(!showCollaboration)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg transition-colors"
            >
              <Users className="h-5 w-5" />
              Collaboration
            </button>
            <button
              onClick={() => setShowAI(!showAI)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg transition-colors"
            >
              <Sparkles className="h-5 w-5" />
              AI Assistant
            </button>
            <button
              onClick={() => handleSave()}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              <Save className="h-5 w-5" />
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTags(prev => 
                  prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                )}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2">
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Auto-save Toggle */}
            <div className="flex items-center justify-between bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <span className="text-sm">Auto-save</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoSave}
                  onChange={(e) => setAutoSave(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            {/* Story Metrics */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-4">Story Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Reading time</span>
                  <span>{metrics.readingTime} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Word count</span>
                  <span>{metrics.wordCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Unique words</span>
                  <span>{metrics.uniqueWords}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Readability score</span>
                  <span>{metrics.readabilityScore}/100</span>
                </div>
              </div>
            </div>

            {/* AI Suggestions */}
            {showAI && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                  <h3 className="text-lg font-semibold">AI Suggestions</h3>
                </div>
                <div className="space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20"
                    >
                      <p className="text-sm text-purple-200">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Achievements */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-5 w-5 text-yellow-400" />
                <h3 className="text-lg font-semibold">Recent Achievements</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/20">
                  <h4 className="font-medium text-yellow-300">Word Master</h4>
                  <p className="text-sm text-gray-400">Write over 50,000 words</p>
                  <div className="mt-2 h-2 bg-gray-700 rounded-full">
                    <div
                      className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                      style={{ width: '60%' }}
                    />
                  </div>
                </div>
                <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
                  <h4 className="font-medium text-purple-300">Prolific Writer</h4>
                  <p className="text-sm text-gray-400">Write 10 stories</p>
                  <div className="mt-2 h-2 bg-gray-700 rounded-full">
                    <div
                      className="h-full bg-purple-500 rounded-full transition-all duration-500"
                      style={{ width: '30%' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <History className="h-5 w-5" />
                  View Revisions
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <Share2 className="h-5 w-5" />
                  Share Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
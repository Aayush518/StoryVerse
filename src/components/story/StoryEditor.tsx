import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToastContext } from '../../context/ToastContext';
import { Story } from '../../types';
import { storage } from '../../lib/storage';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';

interface StoryEditorProps {
  story?: Story;
  universeId?: string;
  onSave?: (story: Story) => void;
}

const availableTags = ['Fantasy', 'Sci-Fi', 'Mystery', 'Romance', 'Horror', 'Adventure'];

export default function StoryEditor({ story, universeId, onSave }: StoryEditorProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToastContext();
  
  const [title, setTitle] = useState(story?.title || '');
  const [content, setContent] = useState(story?.content || '');
  const [description, setDescription] = useState(story?.description || '');
  const [tags, setTags] = useState<string[]>(story?.tags || []);
  const [coverImage, setCoverImage] = useState(story?.cover_image || '');
  const [status, setStatus] = useState<Story['status']>(story?.status || 'draft');
  const [isPreview, setIsPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  useEffect(() => {
    let autoSaveTimer: NodeJS.Timeout;

    if (autoSaveEnabled && user && (title || content || description)) {
      autoSaveTimer = setTimeout(handleSave, 30000);
    }

    return () => {
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer);
      }
    };
  }, [title, content, description, autoSaveEnabled]);

  const handleSave = async () => {
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
        cover_image: coverImage,
        tags,
        status,
        universe_id: universeId,
        author_id: user.id
      };

      let savedStory;
      if (story) {
        savedStory = await storage.updateStory(story.id, storyData);
        addToast('Story updated successfully!', 'success');
      } else {
        savedStory = await storage.createStory(storyData);
        addToast('Story created successfully!', 'success');
      }

      onSave?.(savedStory);
      navigate('/my-stories');
    } catch (error) {
      addToast(error instanceof Error ? error.message : 'Failed to save story', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="space-y-6">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Story Title"
          className="text-3xl font-bold bg-transparent border-none focus:ring-0 px-0"
        />

        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description of your story"
          className="bg-transparent border-none focus:ring-0 px-0"
        />

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Cover Image URL</label>
          <input
            type="url"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full bg-black/40 rounded-lg p-2 border border-white/10"
          />
          {coverImage && (
            <img src={coverImage} alt="Cover preview" className="mt-2 rounded-lg h-40 object-cover" />
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => (
              <button
                key={tag}
                onClick={() => setTags(prev => 
                  prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                )}
                className={`px-3 py-1 rounded-full text-sm ${
                  tags.includes(tag)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Story['status'])}
            className="w-full bg-black/40 rounded-lg p-2 border border-white/10"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="min-h-[60vh] bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-[60vh] bg-transparent border-none rounded-lg focus:outline-none focus:ring-0 resize-none p-6"
            placeholder="Begin your story here... (Markdown supported)"
          />
        </div>

        <div className="flex justify-between items-center">
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={autoSaveEnabled}
              onChange={(e) => setAutoSaveEnabled(e.target.checked)}
              className="rounded border-gray-600 text-purple-600 focus:ring-purple-500"
            />
            <span>Auto-save</span>
          </label>

          <div className="flex space-x-4">
            <Button
              variant="secondary"
              onClick={() => navigate('/my-stories')}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              loading={saving}
              disabled={saving || !user}
            >
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
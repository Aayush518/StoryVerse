import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Users, BookOpen, MessageSquare, Share2 } from 'lucide-react';

const SAMPLE_UNIVERSE = {
  id: '1',
  name: 'Ethereal Kingdoms',
  description: 'A vast fantasy realm where magic and technology collide, creating a unique blend of ancient mysticism and futuristic innovation.',
  creator: 'Alice',
  stories: [
    {
      id: '1',
      title: 'The Crystal Prophecy',
      description: 'When an ancient prophecy resurfaces, a young technomancer must navigate political intrigue and magical warfare.',
      author: 'Alice',
      likes: 245,
      createdAt: new Date('2024-01-15')
    }
  ],
  collaborators: ['Alice', 'Bob', 'Charlie'],
  rules: [
    'All magic must follow the established energy conservation laws',
    'Technology cannot exceed quantum manipulation level',
    'Characters must belong to one of the established factions'
  ],
  lore: [
    {
      title: 'The Great Convergence',
      content: 'When magic and technology first merged, creating the world as we know it today.'
    },
    {
      title: 'The Five Factions',
      content: 'Details about the major political and magical factions that shape the world.'
    }
  ],
  createdAt: new Date('2023-12-01')
};

export default function UniverseDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('stories');

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{SAMPLE_UNIVERSE.name}</h1>
              <p className="text-gray-400">{SAMPLE_UNIVERSE.description}</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                Join Universe
              </button>
              <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2 text-gray-400">
              <Users className="h-5 w-5" />
              <span>{SAMPLE_UNIVERSE.collaborators.length} collaborators</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <BookOpen className="h-5 w-5" />
              <span>{SAMPLE_UNIVERSE.stories.length} stories</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('stories')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'stories' ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            Stories
          </button>
          <button
            onClick={() => setActiveTab('lore')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'lore' ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            Lore
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'rules' ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            Rules
          </button>
        </div>

        {activeTab === 'stories' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SAMPLE_UNIVERSE.stories.map((story) => (
              <div key={story.id} className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                <p className="text-gray-400 mb-4">{story.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>By {story.author}</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{story.likes}</span>
                    </div>
                    <span>{story.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'lore' && (
          <div className="space-y-6">
            {SAMPLE_UNIVERSE.lore.map((item, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.content}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="bg-gray-800 rounded-xl p-6">
            <ul className="space-y-4">
              {SAMPLE_UNIVERSE.rules.map((rule, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-purple-400">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
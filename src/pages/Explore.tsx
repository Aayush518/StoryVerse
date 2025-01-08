import React from 'react';
import UniverseCard from '../components/universe/UniverseCard';

const SAMPLE_UNIVERSES = [
  {
    id: '1',
    name: 'Ethereal Kingdoms',
    description: 'A vast fantasy realm where magic and technology collide.',
    creator: 'Alice',
    stories: [],
    collaborators: ['user1', 'user2', 'user3'],
    rules: [],
    createdAt: new Date()
  },
  {
    id: '2',
    name: 'Neon Horizons',
    description: 'Cyberpunk dystopia where corporations rule and hackers resist.',
    creator: 'Bob',
    stories: [],
    collaborators: ['user4', 'user5'],
    rules: [],
    createdAt: new Date()
  }
];

export default function Explore() {
  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Explore Story Universes</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_UNIVERSES.map(universe => (
            <UniverseCard key={universe.id} universe={universe} />
          ))}
        </div>
      </div>
    </div>
  );
}
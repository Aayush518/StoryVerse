import React from 'react';
import { Link } from 'react-router-dom';
import { Universe } from '../../types';
import { Users, BookOpen } from 'lucide-react';

interface UniverseCardProps {
  universe: Universe;
}

export default function UniverseCard({ universe }: UniverseCardProps) {
  return (
    <Link to={`/universe/${universe.id}`}>
      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-black/60 transition-all duration-300">
        <h3 className="text-xl font-bold text-white mb-2">{universe.name}</h3>
        <p className="text-gray-400 mb-4">{universe.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>{universe.collaborators.length} collaborators</span>
          </div>
          <div className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4" />
            <span>{universe.stories.length} stories</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
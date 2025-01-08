import React from 'react';
import { BookOpen } from 'lucide-react';

interface ReadingProgressProps {
  progress: number;
  remainingTime: number;
}

export default function ReadingProgress({ progress, remainingTime }: ReadingProgressProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-white/10 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-48 h-2 bg-gray-700 rounded-full">
            <div 
              className="h-full bg-purple-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm text-gray-400">{progress}% complete</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <BookOpen className="h-4 w-4" />
          <span>{remainingTime} min remaining</span>
        </div>
      </div>
    </div>
  );
}
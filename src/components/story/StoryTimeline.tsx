import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
}

interface StoryTimelineProps {
  events: TimelineEvent[];
}

export default function StoryTimeline({ events }: StoryTimelineProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Story Timeline</h3>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-purple-600" />
        
        {events.map((event, index) => (
          <div key={event.id} className="relative pl-10 pb-8">
            <div className="absolute left-2 -translate-x-1/2 w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
              <Clock className="h-4 w-4" />
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold">{event.title}</h4>
                <span className="text-sm text-gray-400">{event.timestamp}</span>
              </div>
              <p className="text-gray-400">{event.description}</p>
              
              {index < events.length - 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <ChevronRight className="h-4 w-4 text-purple-600" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
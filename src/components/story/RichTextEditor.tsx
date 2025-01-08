import React, { useState } from 'react';
import { Bold, Italic, List, Quote } from 'lucide-react';
import { generateSuggestions } from '../../lib/ai/suggestions';
import { analyzeStory } from '../../lib/analytics/storyMetrics';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const metrics = analyzeStory(value);
  const suggestions = generateSuggestions(value);

  const handleFormat = (command: string) => {
    document.execCommand(command, false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-2 bg-gray-800 rounded-t-lg">
        <button
          onClick={() => handleFormat('bold')}
          className="p-2 hover:bg-gray-700 rounded"
        >
          <Bold className="h-5 w-5" />
        </button>
        <button
          onClick={() => handleFormat('italic')}
          className="p-2 hover:bg-gray-700 rounded"
        >
          <Italic className="h-5 w-5" />
        </button>
        <button
          onClick={() => handleFormat('insertUnorderedList')}
          className="p-2 hover:bg-gray-700 rounded"
        >
          <List className="h-5 w-5" />
        </button>
        <button
          onClick={() => handleFormat('formatBlock')}
          className="p-2 hover:bg-gray-700 rounded"
        >
          <Quote className="h-5 w-5" />
        </button>
      </div>

      <div 
        contentEditable
        className="min-h-[400px] p-4 bg-gray-800 rounded-b-lg focus:outline-none"
        onInput={(e) => onChange(e.currentTarget.textContent || '')}
        dangerouslySetInnerHTML={{ __html: value }}
      />

      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="text-sm text-gray-400">
            Reading time: {metrics.readingTime} min
          </div>
          <div className="text-sm text-gray-400">
            Words: {metrics.wordCount}
          </div>
          <div className="text-sm text-gray-400">
            Unique words: {metrics.uniqueWords}
          </div>
          <div className="text-sm text-gray-400">
            Readability score: {metrics.readabilityScore}
          </div>
        </div>

        <button
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
        >
          AI Suggestions
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="p-4 bg-gray-800 rounded-lg">
          <h3 className="font-bold mb-2">Suggestions</h3>
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="text-gray-400">• {suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
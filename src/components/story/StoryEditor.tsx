import React, { useState } from 'react';
import { Bold, Italic, List, Quote, Save } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StoryEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSave?: () => void;
}

export default function StoryEditor({ value, onChange, onSave }: StoryEditorProps) {
  const [showToolbar, setShowToolbar] = useState(true);

  const handleFormat = (command: string) => {
    document.execCommand(command, false);
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.textContent || '';
    onChange(content);
  };

  return (
    <div className="space-y-4">
      {showToolbar && (
        <div className="flex items-center gap-2 p-2 bg-card/50 dark:bg-card/50 backdrop-blur-sm rounded-t-lg border border-border">
          <button
            onClick={() => handleFormat('bold')}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
          >
            <Bold className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleFormat('italic')}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
          >
            <Italic className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleFormat('insertUnorderedList')}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
          >
            <List className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleFormat('formatBlock')}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
          >
            <Quote className="h-5 w-5" />
          </button>
          <div className="flex-1" />
          {onSave && (
            <button
              onClick={onSave}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
          )}
        </div>
      )}

      <div 
        contentEditable
        className={cn(
          "min-h-[60vh] p-6 bg-card/50 dark:bg-card/50 backdrop-blur-sm",
          "border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary",
          "text-foreground placeholder:text-muted-foreground",
          !showToolbar && "rounded-t-lg"
        )}
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
}
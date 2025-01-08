import React, { useState, useEffect } from 'react';
import { Users, MessageSquare } from 'lucide-react';

interface CollaboratorAction {
  userId: string;
  userName: string;
  action: string;
  timestamp: Date;
}

interface CollaborativeEditorProps {
  content: string;
  onChange: (content: string) => void;
  onSave: () => void;
}

export default function CollaborativeEditor({ content, onChange, onSave }: CollaborativeEditorProps) {
  const [collaborators] = useState([
    { id: '1', name: 'Alice', active: true },
    { id: '2', name: 'Bob', active: false }
  ]);
  
  const [recentActions] = useState<CollaboratorAction[]>([
    {
      userId: '1',
      userName: 'Alice',
      action: 'edited paragraph 3',
      timestamp: new Date()
    }
  ]);

  const [comments] = useState([
    {
      id: '1',
      userId: '2',
      userName: 'Bob',
      content: 'Great scene! Maybe add more description?',
      timestamp: new Date()
    }
  ]);

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-purple-400" />
            <span>{collaborators.filter(c => c.active).length} active now</span>
          </div>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
          >
            Save Changes
          </button>
        </div>

        <textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-[600px] bg-gray-800 rounded-lg p-4"
        />
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-bold mb-2">Collaborators</h3>
          <div className="space-y-2">
            {collaborators.map(collaborator => (
              <div key={collaborator.id} className="flex items-center justify-between">
                <span>{collaborator.name}</span>
                <span className={`w-2 h-2 rounded-full ${
                  collaborator.active ? 'bg-green-500' : 'bg-gray-500'
                }`} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-2">Recent Actions</h3>
          <div className="space-y-2">
            {recentActions.map((action, index) => (
              <div key={index} className="text-sm text-gray-400">
                <span className="font-medium text-white">{action.userName}</span>
                {' '}{action.action}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-2">Comments</h3>
          <div className="space-y-2">
            {comments.map(comment => (
              <div key={comment.id} className="bg-gray-700 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{comment.userName}</span>
                  <span className="text-xs text-gray-400">
                    {comment.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-gray-300">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
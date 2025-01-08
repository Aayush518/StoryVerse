import React from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-400" />,
    error: <AlertCircle className="h-5 w-5 text-red-400" />,
    info: <Info className="h-5 w-5 text-blue-400" />
  };

  const backgrounds = {
    success: 'bg-green-500/10 border-green-500/50',
    error: 'bg-red-500/10 border-red-500/50',
    info: 'bg-blue-500/10 border-blue-500/50'
  };

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${backgrounds[type]} animate-fadeIn`}>
      {icons[type]}
      <p className="text-sm">{message}</p>
      <button onClick={onClose} className="ml-auto">
        <X className="h-4 w-4 text-gray-400 hover:text-white transition-colors" />
      </button>
    </div>
  );
}
import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative group">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors" />
      <input
        type="text"
        placeholder="Search NFTs..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-4 py-2 bg-card/50 dark:bg-card/50 backdrop-blur-sm border border-border rounded-lg 
          focus:ring-2 focus:ring-primary focus:border-primary w-full sm:w-64 text-foreground 
          placeholder:text-muted-foreground transition-all hover:bg-card/70 dark:hover:bg-card/70"
      />
    </div>
  );
}
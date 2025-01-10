import React from 'react';
import { Filter } from 'lucide-react';

interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function FilterSelect({ value, onChange }: FilterSelectProps) {
  return (
    <div className="relative group">
      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-8 py-2 bg-card/50 dark:bg-card/50 backdrop-blur-sm border border-border rounded-lg 
          focus:ring-2 focus:ring-primary focus:border-primary appearance-none w-full sm:w-48 text-foreground 
          transition-all hover:bg-card/70 dark:hover:bg-card/70"
      >
        <option value="all">All Categories</option>
        <option value="universes">Story Universes</option>
        <option value="characters">Characters</option>
        <option value="plots">Plot Lines</option>
      </select>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <div className="border-t-2 border-r-2 border-foreground/50 w-2 h-2 rotate-135 group-hover:border-primary transition-colors" />
      </div>
    </div>
  );
}
import React from 'react';
import SearchBar from './SearchBar';
import FilterSelect from './FilterSelect';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}

export default function Header({ searchTerm, onSearchChange, selectedCategory, onCategoryChange }: HeaderProps) {
  return (
    <div className="glass-card rounded-xl p-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
            NFT Marketplace
          </h1>
          <p className="text-muted-foreground mt-2">
            Discover and collect unique story universes
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <SearchBar value={searchTerm} onChange={onSearchChange} />
          <FilterSelect value={selectedCategory} onChange={onCategoryChange} />
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import Header from './components/Header';
import NFTGrid from './components/NFTGrid';
import type { NFT } from './types';

const SAMPLE_NFTS: NFT[] = [
  {
    id: '1',
    title: 'Dragon Kingdom Chronicles',
    description: 'Complete story universe with 5 interconnected storylines',
    price: 2.5,
    creator: 'Alice Writer',
    category: 'Story Universe',
    likes: 156,
    views: 1234,
    image: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699'
  },
  {
    id: '2',
    title: 'Cyberpunk Detective',
    description: 'Noir mystery set in a dystopian future',
    price: 1.8,
    creator: 'Bob Author',
    category: 'Story',
    likes: 89,
    views: 567,
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4'
  }
];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredNFTs = SAMPLE_NFTS.filter(nft => {
    const matchesSearch = nft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nft.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || nft.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <Header
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <NFTGrid nfts={filteredNFTs} />
      </div>
    </div>
  );
}
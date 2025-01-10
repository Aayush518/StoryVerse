import React, { useState } from 'react';
import { Coins, Filter, Search } from 'lucide-react';

interface NFT {
  id: string;
  title: string;
  description: string;
  price: number;
  creator: string;
  image: string;
}

const SAMPLE_NFTS: NFT[] = [
  {
    id: '1',
    title: 'Dragon Kingdom Chronicles',
    description: 'Complete story universe with 5 interconnected storylines',
    price: 2.5,
    creator: 'Alice Writer',
    image: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699',
  },
  {
    id: '2',
    title: 'Cyberpunk Detective',
    description: 'Noir mystery set in a dystopian future',
    price: 1.8,
    creator: 'Bob Author',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
  },
];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-4xl font-bold mb-4 md:mb-0">NFT Marketplace</h1>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-background rounded-lg focus:ring-2 focus:ring-purple-500 w-full sm:w-64"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-4 py-2 bg-background rounded-lg focus:ring-2 focus:ring-purple-500 appearance-none w-full sm:w-48"
              >
                <option value="all">All Categories</option>
                <option value="universes">Story Universes</option>
                <option value="characters">Characters</option>
                <option value="plots">Plot Lines</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_NFTS.map((nft) => (
            <div
              key={nft.id}
              className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
              <img
                src={nft.image}
                alt={nft.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{nft.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {nft.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Coins className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                    <span className="font-bold text-purple-500 dark:text-purple-400">
                      {nft.price} ETH
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-purple-500 dark:bg-purple-600 hover:bg-purple-600 dark:hover:bg-purple-700 rounded-lg transition-colors">
                    Buy Now
                  </button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Created by {nft.creator}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

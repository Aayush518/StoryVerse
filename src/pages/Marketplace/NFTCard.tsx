import React from 'react';
import { Coins, Heart, Eye } from 'lucide-react';
import { NFT } from './types';

interface NFTCardProps {
  nft: NFT;
}

export default function NFTCard({ nft }: NFTCardProps) {
  return (
    <div className="nft-card group glass-card rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <img 
          src={nft.image} 
          alt={nft.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <span className="nft-tag px-2 py-1 text-xs rounded-full bg-white/90 dark:bg-background/80 backdrop-blur-sm">
            {nft.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
          {nft.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{nft.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Coins className="h-5 w-5 text-primary" />
            <span className="font-bold text-primary">{nft.price} ETH</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{nft.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{nft.views}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">
                  {nft.creator[0]}
                </span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {nft.creator}
              </span>
            </div>
            <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
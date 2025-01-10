import React from 'react';
import { Coins, Heart, Eye, ExternalLink } from 'lucide-react';
import type { NFT } from '../types';

interface NFTCardProps {
  nft: NFT;
}

export default function NFTCard({ nft }: NFTCardProps) {
  return (
    <div className="group glass-card rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img 
          src={nft.image} 
          alt={nft.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-2 right-2 flex gap-2">
          <span className="px-3 py-1 text-xs rounded-full bg-primary/90 backdrop-blur-sm text-white">
            {nft.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text group-hover:scale-105 transition-transform">
          {nft.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{nft.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Coins className="h-5 w-5 text-primary" />
            <span className="font-bold text-primary">{nft.price} ETH</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">
                  {nft.creator[0]}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {nft.creator}
              </span>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors">
              <span>Buy Now</span>
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
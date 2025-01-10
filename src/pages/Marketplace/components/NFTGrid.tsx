import React from 'react';
import NFTCard from './NFTCard';
import type { NFT } from '../types';

interface NFTGridProps {
  nfts: NFT[];
}

export default function NFTGrid({ nfts }: NFTGridProps) {
  if (nfts.length === 0) {
    return (
      <div className="glass-card rounded-xl p-12 text-center">
        <p className="text-lg text-muted-foreground">No NFTs found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {nfts.map((nft) => (
        <NFTCard key={nft.id} nft={nft} />
      ))}
    </div>
  );
}
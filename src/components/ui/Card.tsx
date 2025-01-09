import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={cn(
      "glass-card rounded-xl p-6 transition-all duration-300",
      "hover:scale-[1.02] glass-hover",
      className
    )}>
      {children}
    </div>
  );
}
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface SidebarToggleProps {
  collapsed: boolean;
  isMobile: boolean;
  onToggle: () => void;
}

export function SidebarToggle({ collapsed, isMobile, onToggle }: SidebarToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'fixed z-50 transition-all duration-200',
        isMobile ? [
          'bottom-4 left-4 p-2',
          'bg-primary/90 hover:bg-primary',
          'rounded-full shadow-lg',
          'backdrop-blur-sm'
        ] : [
          collapsed ? 'left-[4.5rem]' : 'left-[15.5rem]',
          'top-[4.5rem]',
          'w-6 h-12',
          'flex items-center justify-center',
          'bg-card/80 hover:bg-card',
          'border border-border',
          'rounded-r-full -ml-px',
          'backdrop-blur-sm'
        ]
      )}
    >
      <ChevronLeft 
        className={cn(
          'h-4 w-4 transition-transform duration-200',
          collapsed && 'rotate-180'
        )} 
      />
    </button>
  );
}
import React from 'react';

interface MainContentProps {
  children: React.ReactNode;
  sidebarCollapsed: boolean;
  hasUser: boolean;
}

export function MainContent({ children, sidebarCollapsed, hasUser }: MainContentProps) {
  return (
    <main 
      className={`
        flex-1 transition-all duration-200 pt-16 min-h-screen
        ${hasUser ? (sidebarCollapsed ? 'md:ml-20' : 'md:ml-64') : ''}
      `}
    >
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </main>
  );
}
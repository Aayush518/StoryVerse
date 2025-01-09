import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Navbar } from '../Navbar';
import { Sidebar } from '../Sidebar';
import { MainContent } from './MainContent';
import { SidebarToggle } from './SidebarToggle';
import { useLayout } from './useLayout';

export function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { sidebarCollapsed, isMobile, toggleSidebar } = useLayout();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
      <Navbar onMenuClick={toggleSidebar} />
      
      <div className="flex relative">
        {user && (
          <>
            <Sidebar collapsed={sidebarCollapsed} />
            <SidebarToggle 
              collapsed={sidebarCollapsed} 
              isMobile={isMobile}
              onToggle={toggleSidebar}
            />
          </>
        )}
        
        <MainContent 
          sidebarCollapsed={sidebarCollapsed} 
          hasUser={!!user}
        >
          {children}
        </MainContent>
      </div>
    </div>
  );
}
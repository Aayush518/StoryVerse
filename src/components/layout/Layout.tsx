import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { ChevronLeft } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setSidebarCollapsed(prev => !prev);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onMenuClick={toggleSidebar} />
      
      <div className="flex relative">
        {user && (
          <>
            <Sidebar collapsed={sidebarCollapsed} />
            <button
              onClick={toggleSidebar}
              className={`fixed z-50 transition-all duration-200 
                ${isMobile 
                  ? 'bottom-4 left-4 p-2 bg-primary/90 hover:bg-primary rounded-full shadow-lg'
                  : `${sidebarCollapsed ? 'left-[4.5rem]' : 'left-[15.5rem]'} top-[4.5rem] 
                     w-6 h-12 flex items-center justify-center
                     bg-card hover:bg-card/80 border border-border
                     rounded-r-full -ml-px`
                }`}
            >
              <ChevronLeft 
                className={`h-4 w-4 transition-transform duration-200 
                  ${sidebarCollapsed ? 'rotate-180' : ''}`} 
              />
            </button>
          </>
        )}
        
        <main 
          className={`flex-1 transition-all duration-200 pt-16 min-h-screen
            ${user ? (sidebarCollapsed ? 'md:ml-20' : 'md:ml-64') : ''}`}
        >
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
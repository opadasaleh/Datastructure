import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import CircularSidebar from './CircularSidebar';
import { useTheme } from '../../contexts/ThemeContext';
import { useSidebar } from '../../contexts/SidebarContext';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  const { isSidebarVisible } = useSidebar();
  const location = useLocation();

  // Check if we should show the sidebar based on current route
  const shouldShowSidebar = location.pathname.startsWith('/algorithms/');

  return (
    <div className={`
      min-h-screen flex flex-col
      ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}
      transition-colors duration-300
    `}>
      <Navbar />
      <div className="flex-1 flex">
        {/* Traditional Sidebar - Hidden by default, can be toggled */}
        {shouldShowSidebar && isSidebarVisible && <Sidebar />}
        
        {/* Circular Rotatable Sidebar - Always available on algorithm pages */}
        {shouldShowSidebar && <CircularSidebar isVisible={true} />}
        
        <main className={`
          flex-1 overflow-y-auto p-4 md:p-8 lg:p-12
          transition-all duration-300
          ${shouldShowSidebar && isSidebarVisible ? 'lg:ml-0' : ''}
        `}>
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
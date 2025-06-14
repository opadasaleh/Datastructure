import React, { createContext, useContext, useState } from 'react';

interface SidebarContextType {
  isSidebarVisible: boolean;
  toggleSidebar: () => void;
  setSidebarVisible: (visible: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(prev => !prev);
  };

  const setSidebarVisible = (visible: boolean) => {
    setIsSidebarVisible(visible);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarVisible, toggleSidebar, setSidebarVisible }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
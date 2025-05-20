import React, { useState, useCallback, memo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown, ChevronRight, ChevronLeft,
  AlignLeft, GitBranch, Network, Database,
  BarChart2, Binary, Share2, Grid2X2, List, Code, Menu
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface SidebarItemProps {
  title: string;
  icon: React.ReactNode;
  path?: string;
  children?: Array<{
    title: string;
    path: string;
    description?: string;
  }>;
  level?: number;
}

// Memoized SidebarItem component for better performance
const SidebarItem: React.FC<SidebarItemProps> = memo(({ title, icon, path, children, level = 0 }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = children && children.length > 0;
  const isActive = path ? location.pathname === path : false;
  const { theme } = useTheme();

  // Open the menu if a child route is active
  useEffect(() => {
    if (hasChildren && children?.some(child => child.path === location.pathname)) {
      setIsOpen(true);
    }
  }, [location.pathname, hasChildren, children]);

  const activeClass = isActive
    ? `${theme === 'dark' ? 'bg-blue-900/30 text-white' : 'bg-blue-100 text-blue-800'}`
    : `hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} transition-colors duration-150`;

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  }, [isOpen]);

  return (
    <div className="mb-1">
      {hasChildren ? (
        <div className="flex flex-col">
          <button
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={handleKeyPress}
            aria-expanded={isOpen}
            aria-label={`${title} submenu`}
            className={`
              flex items-center p-3 rounded-md w-full group
              ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}
              transition-all duration-200 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-blue-500
            `}
          >
            <span className="mr-3 text-blue-500 transition-transform duration-200">{icon}</span>
            <span className="text-sm font-medium flex-1">{title}</span>
            <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
              {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          </button>
          <div
            className={`
              ml-8 mt-1 space-y-1 overflow-hidden transition-all duration-200 ease-in-out
              ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            {children?.map((child, index) => (
              <Link
                key={index}
                to={child.path}
                className={`
                  block p-3 rounded-md text-sm relative group
                  ${location.pathname === child.path
                    ? `${theme === 'dark' ? 'bg-blue-900/30 text-white' : 'bg-blue-100 text-blue-800'}`
                    : `hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}
                  transition-all duration-200 ease-in-out
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                `}
                aria-current={location.pathname === child.path ? 'page' : undefined}
              >
                <div className="flex items-center">
                  <span>{child.title}</span>
                  {child.description && (
                    <div className={`
                      absolute left-full ml-2 px-3 py-2 rounded-md text-xs
                      whitespace-nowrap opacity-0 group-hover:opacity-100
                      pointer-events-none transition-all duration-200
                      ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
                      shadow-lg z-50 max-w-xs transform translate-x-0
                      group-hover:translate-x-2
                    `}
                      role="tooltip"
                    >
                      {child.description}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <Link
          to={path || '#'}
          className={`
            flex items-center p-3 rounded-md ${activeClass}
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition-all duration-200 ease-in-out
          `}
          aria-current={isActive ? 'page' : undefined}
        >
          <span className="mr-3 text-blue-500">{icon}</span>
          <span className="text-sm font-medium">{title}</span>
        </Link>
      )}
    </div>
  );
});

SidebarItem.displayName = 'SidebarItem';

const SIDEBAR_ITEMS = [
  {
    title: 'Array Operations',
    icon: <AlignLeft size={20} />,
    children: [
      {
        title: 'Insertion',
        path: '/algorithms/array-insert',
        description: 'Insert elements at any position'
      },
      {
        title: 'Deletion',
        path: '/algorithms/array-delete',
        description: 'Remove elements from any position'
      },
      {
        title: 'Search',
        path: '/algorithms/array-search',
        description: 'Find elements in the array'
      },
      {
        title: 'Update',
        path: '/algorithms/array-update',
        description: 'Modify elements at any position'
      }
    ]
  },
  {
    title: 'Linked List Operations',
    icon: <List size={20} />,
    children: [
      {
        title: 'Insertion',
        path: '/algorithms/linkedlist-insert',
        description: 'Insert a new node into the list'
      },
      {
        title: 'Deletion',
        path: '/algorithms/linkedlist-delete',
        description: 'Remove a node from the list'
      },
      {
        title: 'Search',
        path: '/algorithms/linkedlist-search',
        description: 'Find a value in the list'
      },
      {
        title: 'Update',
        path: '/algorithms/linkedlist-update',
        description: "Modify a node's value"
      }
    ]
  },
  {
    title: 'Tree Operations',
    icon: <GitBranch size={20} />,
    children: [
      {
        title: 'Insertion',
        path: '/algorithms/tree-insert',
        description: 'Insert a new node into the tree'
      },
      {
        title: 'Deletion',
        path: '/algorithms/tree-delete',
        description: 'Remove a node from the tree'
      },
      {
        title: 'Search',
        path: '/algorithms/tree-search',
        description: 'Find a value in the tree'
      },
      {
        title: 'Inorder Traversal',
        path: '/algorithms/tree-traverse-inorder',
        description: 'Traverse tree in Left -> Root -> Right order'
      },
      {
        title: 'Preorder Traversal',
        path: '/algorithms/tree-traverse-preorder',
        description: 'Traverse tree in Root -> Left -> Right order'
      },
      {
        title: 'Postorder Traversal',
        path: '/algorithms/tree-traverse-postorder',
        description: 'Traverse tree in Left -> Right -> Root order'
      }
    ]
  }
];

// Main Sidebar component
const Sidebar: React.FC = () => {
  const { theme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close sidebar on mobile when route changes
  const location = useLocation();
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const toggleSidebar = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className={`
          fixed top-4 left-4 z-40 lg:hidden
          p-2 rounded-md
          ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
          shadow-md
        `}
      >
        <Menu size={24} />
      </button>

      {/* Mobile sidebar backdrop */}
      <div
        className={`
          fixed inset-0 bg-black bg-opacity-50 z-20
          lg:hidden transition-opacity duration-300
          ${isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full z-30
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}
          border-r ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
          shadow-lg
        `}
      >
        {/* Sidebar content */}
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Code size={24} className="text-blue-500" />
              {!isCollapsed && (
                <span className="text-lg font-semibold">Data Structures</span>
              )}
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 hidden lg:block"
            >
              {isCollapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <nav className="space-y-1">
                {SIDEBAR_ITEMS.map((item, index) => (
                  <SidebarItem key={index} {...item} />
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Sidebar);
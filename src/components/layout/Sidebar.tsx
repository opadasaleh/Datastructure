import React, { useState, useCallback, memo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown, ChevronRight, ChevronLeft,
  AlignLeft, GitBranch, Network, Database,
  BarChart2, Binary, Share2, Grid2X2, List, Code, Menu, X, Layers, Triangle
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useSidebar } from '../../contexts/SidebarContext';

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
                      shadow-lg z-50 max-walgorithms-xs transform translate-x-0
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
    title: 'List Operations',
    icon: <List size={20} />,
    children: [
      {
        title: 'Ordered List Insert',
        path: '/algorithms/ordered-list-insert',
        description: 'Insert a number while keeping the list sorted'
      },
      {
        title: 'Unordered List Insert',
        path: '/algorithms/unordered-list-insert',
        description: 'Add a number at the end of the list'
      },
      {
        title: 'Ordered List Search',
        path: '/algorithms/ordered-list-search',
        description: 'Find a number using binary search'
      },
      {
        title: 'Unordered List Search',
        path: '/algorithms/unordered-list-search',
        description: 'Find a number by checking each element'
      }
    ]
  },
  {
    title: 'Linked List Operations',
    icon: <Share2 size={20} />,
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
    title: 'Stack Operations',
    icon: <BarChart2 size={20} />,
    children: [
      {
        title: 'Push',
        path: '/algorithms/stack-push',
        description: 'Add element to top of stack'
      },
      {
        title: 'Pop',
        path: '/algorithms/stack-pop',
        description: 'Remove element from top of stack'
      },
      {
        title: 'Peek',
        path: '/algorithms/stack-peek',
        description: 'View top element without removing'
      },
      {
        title: 'Search',
        path: '/algorithms/stack-search',
        description: 'Find an element in the stack'
      },
      {
        title: 'Clear',
        path: '/algorithms/stack-clear',
        description: 'Remove all elements from stack'
      }
    ]
  },
  {
    title: 'Queue Operations',
    icon: <Layers size={20} />,
    children: [
      {
        title: 'Enqueue',
        path: '/algorithms/queue-enqueue',
        description: 'Add element to the rear of queue'
      },
      {
        title: 'Dequeue',
        path: '/algorithms/queue-dequeue',
        description: 'Remove element from front of queue'
      },
      {
        title: 'Peek',
        path: '/algorithms/queue-peek',
        description: 'View front element without removing'
      },
      {
        title: 'Search',
        path: '/algorithms/queue-search',
        description: 'Find an element in the queue'
      },
      {
        title: 'Clear',
        path: '/algorithms/queue-clear',
        description: 'Remove all elements from queue'
      }
    ]
  },
  {
    title: 'Heap Operations',
    icon: <Triangle size={20} />,
    children: [
      {
        title: 'Insert',
        path: '/algorithms/heap-insert',
        description: 'Add element while maintaining heap property'
      },
      {
        title: 'Extract Max',
        path: '/algorithms/heap-extract',
        description: 'Remove maximum element from heap'
      },
      {
        title: 'Peek',
        path: '/algorithms/heap-peek',
        description: 'View maximum element without removing'
      },
      {
        title: 'Heapify',
        path: '/algorithms/heap-heapify',
        description: 'Convert array into valid heap structure'
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
  },
  {
    title: 'Composite Structures',
    icon: <Database size={20} />,
    children: [
      {
        title: 'Stack using Array',
        path: '/algorithms/stack-using-array',
        description: 'Build a stack using array as storage'
      },
      {
        title: 'Queue using Array',
        path: '/algorithms/queue-using-array',
        description: 'Build a queue using array with pointers'
      },
      {
        title: 'Graph using Matrix',
        path: '/algorithms/graph-using-array',
        description: 'Represent graph with 2D array'
      },
      {
        title: 'Hash Table using Array',
        path: '/algorithms/hash-table-using-array',
        description: 'Build hash table with array and hash function'
      }
    ]
  }
];

// Main Sidebar component
const Sidebar: React.FC = () => {
  const { theme } = useTheme();
  const { toggleSidebar } = useSidebar();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className={`
          fixed top-20 left-4 z-40 lg:hidden
          p-2 rounded-md
          ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
          shadow-md
        `}
      >
        <Menu size={24} />
      </button>

      {/* Desktop toggle button */}
      <button
        onClick={toggleSidebar}
        className={`
          fixed top-20 left-4 z-40 hidden lg:block
          p-2 rounded-md
          ${theme === 'dark' ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-800 hover:bg-gray-100'}
          shadow-md transition-colors duration-200
        `}
        title="Toggle Sidebar"
      >
        <Menu size={20} />
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
          fixed top-16 left-0 h-[calc(100vh-4rem)] z-30
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
          <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <Code size={24} className="text-blue-500" />
              {!isCollapsed && (
                <span className="text-lg font-semibold">Navigation</span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleCollapse}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 hidden lg:block"
                title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? (
                  <ChevronRight size={20} />
                ) : (
                  <ChevronLeft size={20} />
                )}
              </button>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <nav className="space-y-1">
                {!isCollapsed && SIDEBAR_ITEMS.map((item, index) => (
                  <SidebarItem key={index} {...item} />
                ))}
                {isCollapsed && SIDEBAR_ITEMS.map((item, index) => (
                  <div key={index} className="mb-2">
                    <div 
                      className={`
                        p-3 rounded-md flex justify-center
                        ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}
                        transition-colors duration-200
                      `}
                      title={item.title}
                    >
                      <span className="text-blue-500">{item.icon}</span>
                    </div>
                  </div>
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
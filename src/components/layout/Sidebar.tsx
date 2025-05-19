import React, { useState, useCallback, memo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown, ChevronRight, ChevronLeft,
  AlignLeft, GitBranch, Network, Database,
  BarChart2, Binary, Share2, Grid2X2, List
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

  const arrayOperations = {
    title: "Array Operations",
    icon: <AlignLeft size={20} />,
    children: [
      {
        title: "Insertion",
        path: "/algorithms/array-insert",
        description: "Insert elements at any position"
      },
      {
        title: "Deletion",
        path: "/algorithms/array-delete",
        description: "Remove elements from any position"
      },
      {
        title: "Search",
        path: "/algorithms/array-search",
        description: "Find elements in the array"
      },
      {
        title: "Update",
        path: "/algorithms/array-update",
        description: "Modify elements at any position"
      }
    ]
  };

  const linkedListOperations = {
    title: "Linked List Operations",
    icon: <List size={20} />,
    children: [
      {
        title: "Insertion",
        path: "/algorithms/linkedlist-insert",
        description: "Insert a new node into the list"
      },
      {
        title: "Deletion",
        path: "/algorithms/linkedlist-delete",
        description: "Remove a node from the list"
      },
      {
        title: "Search",
        path: "/algorithms/linkedlist-search",
        description: "Find a value in the list"
      },
      {
        title: "Update",
        path: "/algorithms/linkedlist-update",
        description: "Modify a node's value"
      }
    ]
  };

  const nonLinearStructures = [
    {
      title: "Tree Structures",
      icon: <GitBranch size={20} />,
      children: [
        {
          title: "Binary Trees",
          path: "/structures/binary-trees",
          description: "Hierarchical structure where each node has at most two children"
        },
        {
          title: "BST",
          path: "/structures/binary-search-trees",
          description: "Ordered tree structure with efficient search operations"
        },
        {
          title: "AVL Trees",
          path: "/structures/avl-trees",
          description: "Self-balancing BST with height difference ≤ 1"
        },
        {
          title: "Red-Black Trees",
          path: "/structures/red-black-trees",
          description: "Self-balancing BST with color properties"
        }
      ]
    },
    {
      title: "Graph Structures",
      icon: <Network size={20} />,
      children: [
        {
          title: "Directed Graphs",
          path: "/structures/directed-graphs",
          description: "Edges have direction, representing one-way relationships"
        },
        {
          title: "Undirected Graphs",
          path: "/structures/undirected-graphs",
          description: "Edges represent bidirectional relationships"
        },
        {
          title: "Weighted Graphs",
          path: "/structures/weighted-graphs",
          description: "Edges have associated costs or weights"
        }
      ]
    },
    {
      title: "Advanced Trees",
      icon: <Binary size={20} />,
      children: [
        {
          title: "B-Trees",
          path: "/structures/b-trees",
          description: "Self-balancing tree optimized for disk operations"
        },
        {
          title: "Trie",
          path: "/structures/trie",
          description: "Tree for efficient string/prefix operations"
        },
        {
          title: "Segment Trees",
          path: "/structures/segment-trees",
          description: "Tree for range queries and updates"
        }
      ]
    },
    {
      title: "Hash Structures",
      icon: <Grid2X2 size={20} />,
      children: [
        {
          title: "Hash Tables",
          path: "/structures/hash-tables",
          description: "O(1) average case lookup using key-value pairs"
        },
        {
          title: "Bloom Filters",
          path: "/structures/bloom-filters",
          description: "Probabilistic data structure for membership testing"
        }
      ]
    },
    {
      title: "Network Structures",
      icon: <Share2 size={20} />,
      children: [
        {
          title: "Disjoint Sets",
          path: "/structures/disjoint-sets",
          description: "Track elements in non-overlapping sets"
        },
        {
          title: "Network Flow",
          path: "/structures/network-flow",
          description: "Graph structures for flow optimization"
        }
      ]
    }
  ];

  const algorithmCategories = [
    {
      title: "Sorting Algorithms",
      icon: <AlignLeft size={20} />,
      children: [
        {
          title: "Bubble Sort",
          path: "/algorithms/bubble-sort",
          description: "Simple sorting algorithm with O(n²) time complexity"
        },
        {
          title: "Quick Sort",
          path: "/algorithms/quick-sort",
          description: "Efficient, in-place sorting with O(n log n) average case"
        },
        {
          title: "Merge Sort",
          path: "/algorithms/merge-sort",
          description: "Stable sorting with O(n log n) time complexity"
        }
      ]
    },
    {
      title: "Graph Algorithms",
      icon: <Network size={20} />,
      children: [
        {
          title: "Breadth First Search",
          path: "/algorithms/bfs",
          description: "Level by level graph traversal"
        },
        {
          title: "Depth First Search",
          path: "/algorithms/dfs",
          description: "Recursive graph exploration"
        },
        {
          title: "Dijkstra's Algorithm",
          path: "/algorithms/dijkstra",
          description: "Shortest path in weighted graphs"
        }
      ]
    },
    {
      title: "Tree Algorithms",
      icon: <GitBranch size={20} />,
      children: [
        {
          title: "Tree Traversal",
          path: "/algorithms/tree-traversal",
          description: "In-order, pre-order, and post-order traversals"
        },
        {
          title: "Binary Search",
          path: "/algorithms/binary-search",
          description: "Efficient searching in sorted arrays"
        }
      ]
    }
  ];

  const toggleSidebar = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile toggle button */}
      <button
        className="fixed top-4 left-4 p-2 rounded-md bg-blue-500 text-white md:hidden z-50"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle navigation menu"
      >
        <AlignLeft size={20} />
      </button>

      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          ${isCollapsed ? 'w-16' : 'w-72'} 
          ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
          h-full overflow-y-auto border-r 
          ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
          transition-all duration-300 ease-in-out
          transform md:transform-none
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
        aria-label="Sidebar navigation"
      >
        <div className="p-4">
          <div className="space-y-6">
            {/* Data Structures Section */}
            <div>
              {!isCollapsed && (
                <h2 className="text-lg font-semibold px-3 flex items-center mb-4">
                  <Database className="mr-2" size={20} />
                  Data Structures
                </h2>
              )}
              <nav className="space-y-1">
                <SidebarItem {...arrayOperations} />
                <SidebarItem {...linkedListOperations} />
                <SidebarItem
                  title="Linear Structures"
                  icon={<AlignLeft size={20} />}
                  children={[
                    {
                      title: "Arrays",
                      path: "/structures/arrays",
                      description: "Contiguous memory locations for sequential data"
                    },
                    {
                      title: "Linked Lists",
                      path: "/structures/linked-lists",
                      description: "Connected nodes with linear traversal"
                    },
                    {
                      title: "Stacks",
                      path: "/structures/stacks",
                      description: "LIFO data structure for push/pop operations"
                    },
                    {
                      title: "Queues",
                      path: "/structures/queues",
                      description: "FIFO data structure for enqueue/dequeue"
                    }
                  ]}
                />
                {nonLinearStructures.map((structure, index) => (
                  <SidebarItem
                    key={index}
                    title={structure.title}
                    icon={structure.icon}
                    children={structure.children}
                  />
                ))}
              </nav>
            </div>

            {/* Algorithms Section */}
            <div>
              {!isCollapsed && (
                <h2 className="text-lg font-semibold px-3 flex items-center mb-4">
                  <BarChart2 className="mr-2" size={20} />
                  Algorithms
                </h2>
              )}
              <nav className="space-y-1">
                {algorithmCategories.map((category, index) => (
                  <SidebarItem
                    key={index}
                    title={category.title}
                    icon={category.icon}
                    children={category.children}
                  />
                ))}
              </nav>
            </div>
          </div>
        </div>

        <button
          className={`
            absolute bottom-4 ${isCollapsed ? 'left-4' : 'right-4'}
            p-2 rounded-full
            ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-blue-500
          `}
          onClick={toggleSidebar}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </aside>
    </>
  );
};

export default memo(Sidebar);
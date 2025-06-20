import React, { useState, useCallback, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AlignLeft, GitBranch, List, Layers, Share2, Code, X, Database, BarChart2, Triangle
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface CircularSidebarProps {
  isVisible: boolean;
}

const CircularSidebar: React.FC<CircularSidebarProps> = ({ isVisible }) => {
  const { theme } = useTheme();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const SIDEBAR_ITEMS = [
    {
      title: 'Arrays',
      icon: <AlignLeft size={20} />,
      color: '#3B82F6',
      children: [
        { title: 'Insert', path: '/algorithms/array-insert' },
        { title: 'Delete', path: '/algorithms/array-delete' },
        { title: 'Search', path: '/algorithms/array-search' },
        { title: 'Update', path: '/algorithms/array-update' }
      ]
    },
    {
      title: 'Lists',
      icon: <List size={20} />,
      color: '#10B981',
      children: [
        { title: 'Ordered Insert', path: '/algorithms/ordered-list-insert' },
        { title: 'Unordered Insert', path: '/algorithms/unordered-list-insert' },
        { title: 'Ordered Search', path: '/algorithms/ordered-list-search' },
        { title: 'Unordered Search', path: '/algorithms/unordered-list-search' }
      ]
    },
    {
      title: 'Linked Lists',
      icon: <Share2 size={20} />,
      color: '#8B5CF6',
      children: [
        { title: 'Insert', path: '/algorithms/linkedlist-insert' },
        { title: 'Delete', path: '/algorithms/linkedlist-delete' },
        { title: 'Search', path: '/algorithms/linkedlist-search' },
        { title: 'Update', path: '/algorithms/linkedlist-update' }
      ]
    },
    {
      title: 'Stacks',
      icon: <BarChart2 size={20} />,
      color: '#F59E0B',
      children: [
        { title: 'Push', path: '/algorithms/stack-push' },
        { title: 'Pop', path: '/algorithms/stack-pop' },
        { title: 'Peek', path: '/algorithms/stack-peek' },
        { title: 'Search', path: '/algorithms/stack-search' },
        { title: 'Clear', path: '/algorithms/stack-clear' }
      ]
    },
    {
      title: 'Queues',
      icon: <Layers size={20} />,
      color: '#EF4444',
      children: [
        { title: 'Enqueue', path: '/algorithms/queue-enqueue' },
        { title: 'Dequeue', path: '/algorithms/queue-dequeue' },
        { title: 'Peek', path: '/algorithms/queue-peek' },
        { title: 'Search', path: '/algorithms/queue-search' },
        { title: 'Clear', path: '/algorithms/queue-clear' }
      ]
    },
    {
      title: 'Heaps',
      icon: <Triangle size={20} />,
      color: '#EC4899',
      children: [
        { title: 'Insert', path: '/algorithms/heap-insert' },
        { title: 'Extract Max', path: '/algorithms/heap-extract' },
        { title: 'Peek', path: '/algorithms/heap-peek' },
        { title: 'Heapify', path: '/algorithms/heap-heapify' }
      ]
    },
    {
      title: 'Trees',
      icon: <GitBranch size={20} />,
      color: '#6366F1',
      children: [
        { title: 'Insert', path: '/algorithms/tree-insert' },
        { title: 'Delete', path: '/algorithms/tree-delete' },
        { title: 'Search', path: '/algorithms/tree-search' },
        { title: 'Inorder', path: '/algorithms/tree-traverse-inorder' },
        { title: 'Preorder', path: '/algorithms/tree-traverse-preorder' },
        { title: 'Postorder', path: '/algorithms/tree-traverse-postorder' }
      ]
    },
    {
      title: 'Composite',
      icon: <Database size={20} />,
      color: '#14B8A6',
      children: [
        { title: 'Stack using Array', path: '/algorithms/stack-using-array' },
        { title: 'Queue using Array', path: '/algorithms/queue-using-array' },
        { title: 'Graph using Matrix', path: '/algorithms/graph-using-array' },
        { title: 'Hash Table using Array', path: '/algorithms/hash-table-using-array' }
      ]
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 z-50">
      {/* Main Circle */}
      <div
        className={`
          relative w-32 h-32 rounded-full border-2
          ${theme === 'dark' 
            ? 'bg-gray-900/95 border-gray-700' 
            : 'bg-white/95 border-gray-300'}
          backdrop-blur-sm shadow-xl
        `}
      >
        {/* Center Logo */}
        <div
          className={`
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            w-12 h-12 rounded-full flex items-center justify-center
            ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'}
            text-white cursor-pointer
          `}
        >
          <Code size={20} />
        </div>

        {/* Category Buttons Around Circle */}
        {SIDEBAR_ITEMS.map((item, index) => {
          const angle = (index * (360 / SIDEBAR_ITEMS.length)) - 90; // Distribute evenly around circle
          const radian = (angle * Math.PI) / 180;
          const radius = 45;
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;
          
          return (
            <button
              key={index}
              className={`
                absolute w-10 h-10 rounded-full flex items-center justify-center
                transition-all duration-200 border-2
                ${selectedCategory === item.title
                  ? 'scale-110 shadow-lg'
                  : 'hover:scale-105'}
                ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
              `}
              style={{
                left: `calc(50% + ${x}px - 20px)`,
                top: `calc(50% + ${y}px - 20px)`,
                borderColor: item.color,
                backgroundColor: selectedCategory === item.title ? item.color : undefined
              }}
              onClick={() => setSelectedCategory(
                selectedCategory === item.title ? null : item.title
              )}
              title={item.title}
            >
              <div style={{ 
                color: selectedCategory === item.title ? 'white' : item.color 
              }}>
                {item.icon}
              </div>
            </button>
          );
        })}
      </div>

      {/* Dropdown Menu */}
      {selectedCategory && (
        <div
          className={`
            absolute top-full mt-2 right-0
            w-48 rounded-lg border shadow-xl
            ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}
          `}
        >
          <div className="p-3">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">{selectedCategory}</h3>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>
            <div className="space-y-1">
              {SIDEBAR_ITEMS.find(item => item.title === selectedCategory)?.children.map((child, index) => (
                <Link
                  key={index}
                  to={child.path}
                  className={`
                    block p-2 rounded text-sm
                    ${location.pathname === child.path
                      ? `${theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'}`
                      : `hover:${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
                    transition-colors duration-200
                  `}
                  onClick={() => setSelectedCategory(null)}
                >
                  {child.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(CircularSidebar);
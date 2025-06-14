import React, { useState, useCallback, memo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown, ChevronRight, ChevronLeft,
  AlignLeft, GitBranch, Network, Database,
  BarChart2, Binary, Share2, Grid2X2, List, Code, Menu, X, Layers,
  RotateCw, Move, Settings
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useSidebar } from '../../contexts/SidebarContext';

interface CircularSidebarProps {
  isVisible: boolean;
}

const CircularSidebar: React.FC<CircularSidebarProps> = ({ isVisible }) => {
  const { theme } = useTheme();
  const location = useLocation();
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotationStart, setRotationStart] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const SIDEBAR_ITEMS = [
    {
      title: 'Array Operations',
      icon: <AlignLeft size={16} />,
      color: '#3B82F6',
      children: [
        { title: 'Insertion', path: '/algorithms/array-insert' },
        { title: 'Deletion', path: '/algorithms/array-delete' },
        { title: 'Search', path: '/algorithms/array-search' },
        { title: 'Update', path: '/algorithms/array-update' }
      ]
    },
    {
      title: 'List Operations',
      icon: <List size={16} />,
      color: '#10B981',
      children: [
        { title: 'Ordered Insert', path: '/algorithms/ordered-list-insert' },
        { title: 'Unordered Insert', path: '/algorithms/unordered-list-insert' },
        { title: 'Ordered Search', path: '/algorithms/ordered-list-search' },
        { title: 'Unordered Search', path: '/algorithms/unordered-list-search' }
      ]
    },
    {
      title: 'Linked List',
      icon: <Share2 size={16} />,
      color: '#8B5CF6',
      children: [
        { title: 'Insertion', path: '/algorithms/linkedlist-insert' },
        { title: 'Deletion', path: '/algorithms/linkedlist-delete' },
        { title: 'Search', path: '/algorithms/linkedlist-search' },
        { title: 'Update', path: '/algorithms/linkedlist-update' }
      ]
    },
    {
      title: 'Queue Operations',
      icon: <Layers size={16} />,
      color: '#F59E0B',
      children: [
        { title: 'Enqueue', path: '/algorithms/queue-enqueue' },
        { title: 'Dequeue', path: '/algorithms/queue-dequeue' },
        { title: 'Peek', path: '/algorithms/queue-peek' },
        { title: 'Search', path: '/algorithms/queue-search' },
        { title: 'Clear', path: '/algorithms/queue-clear' }
      ]
    },
    {
      title: 'Tree Operations',
      icon: <GitBranch size={16} />,
      color: '#EF4444',
      children: [
        { title: 'Insertion', path: '/algorithms/tree-insert' },
        { title: 'Deletion', path: '/algorithms/tree-delete' },
        { title: 'Search', path: '/algorithms/tree-search' },
        { title: 'Inorder', path: '/algorithms/tree-traverse-inorder' },
        { title: 'Preorder', path: '/algorithms/tree-traverse-preorder' },
        { title: 'Postorder', path: '/algorithms/tree-traverse-postorder' }
      ]
    }
  ];

  // Handle mouse events for dragging
  const handleMouseDown = useCallback((e: React.MouseEvent, type: 'drag' | 'rotate') => {
    e.preventDefault();
    e.stopPropagation();
    
    if (type === 'drag') {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    } else {
      setIsRotating(true);
      setRotationStart(rotation);
    }
  }, [position, rotation]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    } else if (isRotating) {
      const centerX = position.x + 100; // Half of sidebar width
      const centerY = position.y + 100; // Half of sidebar height
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const degrees = (angle * 180) / Math.PI;
      setRotation(degrees);
    }
  }, [isDragging, isRotating, dragStart, position]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsRotating(false);
  }, []);

  // Add global mouse event listeners
  useEffect(() => {
    if (isDragging || isRotating) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isRotating, handleMouseMove, handleMouseUp]);

  // Auto-rotate function
  const startAutoRotation = () => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    
    setTimeout(() => {
      clearInterval(interval);
    }, 3000); // Rotate for 3 seconds
  };

  // Calculate positions for circular menu items
  const getItemPosition = (index: number, total: number, radius: number = 60) => {
    const angle = (index * 360) / total;
    const radian = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius,
      angle: angle
    };
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed z-50 select-none"
      style={{
        left: position.x,
        top: position.y,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'center',
        transition: isDragging || isRotating ? 'none' : 'transform 0.3s ease'
      }}
    >
      {/* Main Circular Container */}
      <div
        className={`
          relative w-48 h-48 rounded-full border-4 cursor-move
          ${theme === 'dark' 
            ? 'bg-gray-900/95 border-gray-700 shadow-2xl' 
            : 'bg-white/95 border-gray-300 shadow-2xl'}
          backdrop-blur-sm transition-all duration-300
          ${isExpanded ? 'scale-150' : 'scale-100'}
        `}
        onMouseDown={(e) => handleMouseDown(e, 'drag')}
      >
        {/* Center Hub */}
        <div
          className={`
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            w-16 h-16 rounded-full flex items-center justify-center
            ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'}
            text-white font-bold text-lg cursor-pointer
            hover:scale-110 transition-transform duration-200
          `}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Code size={24} />
        </div>

        {/* Circular Menu Items */}
        {SIDEBAR_ITEMS.map((item, index) => {
          const pos = getItemPosition(index, SIDEBAR_ITEMS.length, isExpanded ? 80 : 60);
          const isActive = selectedCategory === item.title;
          
          return (
            <div
              key={index}
              className={`
                absolute w-12 h-12 rounded-full flex items-center justify-center
                cursor-pointer transition-all duration-300 group
                ${isActive 
                  ? 'scale-125 shadow-lg' 
                  : 'hover:scale-110'}
                ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
                border-2 shadow-md
              `}
              style={{
                left: `calc(50% + ${pos.x}px - 24px)`,
                top: `calc(50% + ${pos.y}px - 24px)`,
                borderColor: item.color,
                backgroundColor: isActive ? item.color : undefined,
                transform: `rotate(-${rotation}deg)` // Counter-rotate to keep icons upright
              }}
              onClick={() => {
                setSelectedCategory(selectedCategory === item.title ? null : item.title);
              }}
            >
              <div style={{ color: isActive ? 'white' : item.color }}>
                {item.icon}
              </div>
              
              {/* Tooltip */}
              <div
                className={`
                  absolute bottom-full mb-2 px-2 py-1 rounded text-xs whitespace-nowrap
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200
                  ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'}
                  pointer-events-none z-10
                `}
                style={{ transform: `rotate(-${rotation}deg)` }}
              >
                {item.title}
              </div>
            </div>
          );
        })}

        {/* Control Buttons */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {/* Rotate Button */}
          <button
            className={`
              p-2 rounded-full
              ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'}
              border shadow-md transition-colors duration-200
            `}
            onMouseDown={(e) => handleMouseDown(e, 'rotate')}
            title="Rotate"
          >
            <RotateCw size={16} />
          </button>
          
          {/* Auto-rotate Button */}
          <button
            className={`
              p-2 rounded-full
              ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'}
              border shadow-md transition-colors duration-200
            `}
            onClick={startAutoRotation}
            title="Auto Rotate"
          >
            <Settings size={16} />
          </button>
          
          {/* Move Button */}
          <button
            className={`
              p-2 rounded-full
              ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'}
              border shadow-md transition-colors duration-200
            `}
            title="Drag to Move"
          >
            <Move size={16} />
          </button>
        </div>
      </div>

      {/* Expanded Menu */}
      {selectedCategory && (
        <div
          className={`
            absolute top-full mt-4 left-1/2 transform -translate-x-1/2
            min-w-48 rounded-lg border shadow-xl z-20
            ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}
          `}
          style={{ transform: `translateX(-50%) rotate(-${rotation}deg)` }}
        >
          <div className="p-4">
            <h3 className="font-semibold mb-3 text-center">
              {selectedCategory}
            </h3>
            <div className="space-y-2">
              {SIDEBAR_ITEMS.find(item => item.title === selectedCategory)?.children.map((child, index) => (
                <Link
                  key={index}
                  to={child.path}
                  className={`
                    block p-2 rounded text-sm text-center
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
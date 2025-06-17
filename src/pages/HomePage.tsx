import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import {
  AlignLeft,
  List,
  GitBranch,
  ArrowRight,
  Code,
  Star,
  Layers,
  Database,
  Zap,
  Gauge,
  Share2
} from 'lucide-react';
import { motion } from '../utils/motionHelpers';

const HomePage: React.FC = () => {
  const { theme } = useTheme();

  const featuredStructures = [
    {
      title: 'Binary Search Tree',
      icon: <GitBranch size={24} />,
      description: 'A hierarchical data structure where each node has at most two children.',
      path: '/algorithms/tree-insert',
      features: [
        'Efficient search operations',
        'Maintains sorted order',
        'Balanced structure for optimal performance'
      ]
    },
    {
      title: 'Hash Table',
      icon: <Database size={24} />,
      description: 'Fast key-value storage using hash functions for O(1) average access time.',
      path: '/algorithms/hash-table-using-array',
      features: [
        'Constant time operations',
        'Efficient key-value mapping',
        'Collision handling strategies'
      ]
    },
    {
      title: 'Dynamic Array',
      icon: <AlignLeft size={24} />,
      description: 'A resizable array that automatically grows when more space is needed.',
      path: '/algorithms/array-insert',
      features: [
        'Amortized constant time operations',
        'Random access capability',
        'Automatic resizing'
      ]
    }
  ];

  const categories = [
    {
      title: 'Array Operations',
      icon: <AlignLeft size={24} />,
      description: 'Learn and visualize array operations including insertion, deletion, search, and updates.',
      color: 'from-blue-500 to-cyan-500',
      items: [
        { title: 'Array Insertion', path: '/algorithms/array-insert', description: 'Insert elements at any position in the array' },
        { title: 'Array Deletion', path: '/algorithms/array-delete', description: 'Remove elements from any position in the array' },
        { title: 'Array Search', path: '/algorithms/array-search', description: 'Find elements in the array using linear search' },
        { title: 'Array Update', path: '/algorithms/array-update', description: 'Modify elements at any position in the array' }
      ]
    },
    {
      title: 'List Operations',
      icon: <List size={24} />,
      description: 'Explore ordered and unordered list operations with different search strategies.',
      color: 'from-green-500 to-emerald-500',
      items: [
        { title: 'Ordered List Insert', path: '/algorithms/ordered-list-insert', description: 'Insert a number while keeping the list sorted' },
        { title: 'Unordered List Insert', path: '/algorithms/unordered-list-insert', description: 'Add a number at the end of the list' },
        { title: 'Ordered List Search', path: '/algorithms/ordered-list-search', description: 'Find a number using binary search' },
        { title: 'Unordered List Search', path: '/algorithms/unordered-list-search', description: 'Find a number by checking each element' }
      ]
    },
    {
      title: 'Linked List Operations',
      icon: <Share2 size={24} />,
      description: 'Master linked list operations with interactive node-by-node visualizations.',
      color: 'from-purple-500 to-violet-500',
      items: [
        { title: 'Linked List Insert', path: '/algorithms/linkedlist-insert', description: 'Insert a new node into the linked list' },
        { title: 'Linked List Delete', path: '/algorithms/linkedlist-delete', description: 'Remove a node from the linked list' },
        { title: 'Linked List Search', path: '/algorithms/linkedlist-search', description: 'Find a value in the linked list' },
        { title: 'Linked List Update', path: '/algorithms/linkedlist-update', description: "Modify a node's value in the list" }
      ]
    },
    {
      title: 'Queue Operations',
      icon: <Layers size={24} />,
      description: 'Understand FIFO (First In, First Out) operations with queue visualizations.',
      color: 'from-orange-500 to-red-500',
      items: [
        { title: 'Queue Enqueue', path: '/algorithms/queue-enqueue', description: 'Add element to the rear of queue' },
        { title: 'Queue Dequeue', path: '/algorithms/queue-dequeue', description: 'Remove element from front of queue' },
        { title: 'Queue Peek', path: '/algorithms/queue-peek', description: 'View front element without removing' },
        { title: 'Queue Search', path: '/algorithms/queue-search', description: 'Find an element in the queue' },
        { title: 'Queue Clear', path: '/algorithms/queue-clear', description: 'Remove all elements from queue' }
      ]
    },
    {
      title: 'Tree Operations',
      icon: <GitBranch size={24} />,
      description: 'Master tree data structure operations with step-by-step visualizations.',
      color: 'from-pink-500 to-rose-500',
      items: [
        { title: 'Tree Insertion', path: '/algorithms/tree-insert', description: 'Insert a new node into the binary search tree' },
        { title: 'Tree Deletion', path: '/algorithms/tree-delete', description: 'Remove a node from the binary search tree' },
        { title: 'Tree Search', path: '/algorithms/tree-search', description: 'Find a value in the binary search tree' },
        { title: 'Inorder Traversal', path: '/algorithms/tree-traverse-inorder', description: 'Traverse tree in Left → Root → Right order' },
        { title: 'Preorder Traversal', path: '/algorithms/tree-traverse-preorder', description: 'Traverse tree in Root → Left → Right order' },
        { title: 'Postorder Traversal', path: '/algorithms/tree-traverse-postorder', description: 'Traverse tree in Left → Right → Root order' }
      ]
    },
    {
      title: 'Composite Structures',
      icon: <Database size={24} />,
      description: 'Learn how to build complex data structures using simpler ones as building blocks.',
      color: 'from-indigo-500 to-blue-500',
      items: [
        { title: 'Stack using Array', path: '/algorithms/stack-using-array', description: 'Build a stack using array as underlying storage' },
        { title: 'Queue using Array', path: '/algorithms/queue-using-array', description: 'Build a queue using array with pointers' },
        { title: 'Graph using Matrix', path: '/algorithms/graph-using-array', description: 'Represent graph with 2D adjacency matrix' },
        { title: 'Hash Table using Array', path: '/algorithms/hash-table-using-array', description: 'Build hash table with array and hash function' }
      ]
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Visualize
          </span>{' '}
          Data Structures & Algorithms
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-gray-600 dark:text-gray-300"
        >
          Interactive visualizations, step-by-step walkthroughs, and comprehensive explanations
          to help you master the fundamentals of computer science.
        </motion.p>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
            <div className="text-2xl font-bold text-blue-500">25+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Algorithms</div>
          </div>
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
            <div className="text-2xl font-bold text-green-500">8</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Data Structures</div>
          </div>
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
            <div className="text-2xl font-bold text-purple-500">6</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
          </div>
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
            <div className="text-2xl font-bold text-orange-500">∞</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Learning</div>
          </div>
        </div>
      </section>

      {/* Featured Data Structures */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2">
          <Star size={24} className="text-yellow-500" />
          <h2 className="text-2xl font-bold">Featured Data Structures</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredStructures.map((structure, index) => (
            <Link
              key={index}
              to={structure.path}
              className={`
                rounded-lg overflow-hidden
                ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
                shadow-lg border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
                transition-all duration-300 hover:shadow-xl hover:scale-105
                group
              `}
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-blue-500">{structure.icon}</div>
                  <h3 className="text-xl font-semibold">{structure.title}</h3>
                </div>
                <p className={`
                  text-sm mb-4
                  ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
                `}>
                  {structure.description}
                </p>
                <ul className="space-y-2">
                  {structure.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className={`
                        flex items-center space-x-2 text-sm
                        ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
                      `}
                    >
                      <div className={`
                        w-1.5 h-1.5 rounded-full
                        ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-400'}
                      `} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-end">
                  <ArrowRight
                    size={20}
                    className={`
                      text-blue-500 transform transition-transform duration-200
                      group-hover:translate-x-1
                    `}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Explore Operations</h2>
          <p className={`text-lg max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Master fundamental data structures and algorithms through interactive visualizations and step-by-step explanations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`
                rounded-xl overflow-hidden
                ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
                shadow-lg border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
                transition-all duration-300 hover:shadow-xl hover:scale-105
                group
              `}
            >
              {/* Category Header with Gradient */}
              <div className={`
                p-6 bg-gradient-to-r ${category.color} text-white
              `}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
                <p className="text-white/90 text-sm">
                  {category.description}
                </p>
              </div>

              {/* Operations List */}
              <div className="p-4">
                <div className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      to={item.path}
                      className={`
                        block p-3 rounded-lg
                        ${theme === 'dark'
                          ? 'hover:bg-gray-700 text-gray-200'
                          : 'hover:bg-gray-50 text-gray-700'}
                        transition-all duration-200
                        group/item border border-transparent hover:border-blue-200 dark:hover:border-blue-800
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-1">{item.title}</h4>
                          <p className={`
                            text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
                          `}>
                            {item.description}
                          </p>
                        </div>
                        <ArrowRight
                          size={16}
                          className={`
                            text-blue-500 transform transition-transform duration-200 ml-2
                            group-hover/item:translate-x-1 opacity-0 group-hover/item:opacity-100
                          `}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
                
                {/* Category Footer */}
                <div className={`
                  mt-4 pt-3 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
                  text-center
                `}>
                  <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {category.items.length} algorithms available
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className={`
        text-center py-16 px-4 rounded-2xl
        ${theme === 'dark' ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-blue-50 to-purple-50'}
      `}>
        <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
        <p className={`text-lg mb-8 max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Choose any algorithm or data structure to begin your interactive learning journey.
          Each visualization includes step-by-step explanations and code examples.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/algorithms/array-insert"
            className={`
              px-6 py-3 rounded-lg font-medium
              ${theme === 'dark' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-blue-500 hover:bg-blue-600'}
              text-white transition-colors duration-200
              flex items-center space-x-2
            `}
          >
            <Zap size={18} />
            <span>Start with Arrays</span>
          </Link>
          <Link
            to="/quiz"
            className={`
              px-6 py-3 rounded-lg font-medium border
              ${theme === 'dark' 
                ? 'border-gray-600 hover:bg-gray-700' 
                : 'border-gray-300 hover:bg-gray-50'}
              transition-colors duration-200
              flex items-center space-x-2
            `}
          >
            <Gauge size={18} />
            <span>Test Your Knowledge</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
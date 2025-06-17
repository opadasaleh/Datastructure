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
  Target,
  Shuffle,
  BarChart3,
  Network,
  Hash,
  TreePine,
  Grid3X3,
  Cpu,
  Brain,
  Gauge
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
      icon: <Hash size={24} />,
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
      title: 'Linear Data Structures',
      icon: <AlignLeft size={24} />,
      description: 'Master fundamental linear data structures with step-by-step visualizations.',
      color: 'from-blue-500 to-cyan-500',
      items: [
        { title: 'Array Operations', path: '/algorithms/array-insert', description: 'Insert, delete, search, and update elements' },
        { title: 'Dynamic Arrays', path: '/algorithms/dynamic-array', description: 'Resizable arrays with automatic growth' },
        { title: 'Linked Lists', path: '/algorithms/linkedlist-insert', description: 'Singly and doubly linked list operations' },
        { title: 'Circular Lists', path: '/algorithms/circular-list', description: 'Lists where last node points to first' },
        { title: 'Stack Operations', path: '/algorithms/stack-using-array', description: 'LIFO operations: push, pop, peek' },
        { title: 'Queue Operations', path: '/algorithms/queue-enqueue', description: 'FIFO operations: enqueue, dequeue' }
      ]
    },
    {
      title: 'Tree & Hierarchical Structures',
      icon: <TreePine size={24} />,
      description: 'Explore tree-based data structures and their powerful applications.',
      color: 'from-green-500 to-emerald-500',
      items: [
        { title: 'Binary Trees', path: '/algorithms/tree-insert', description: 'Basic tree operations and traversals' },
        { title: 'Binary Search Trees', path: '/algorithms/bst-operations', description: 'Efficient searching in sorted trees' },
        { title: 'AVL Trees', path: '/algorithms/avl-tree', description: 'Self-balancing binary search trees' },
        { title: 'Red-Black Trees', path: '/algorithms/red-black-tree', description: 'Balanced trees with color properties' },
        { title: 'Heap Operations', path: '/algorithms/heap-operations', description: 'Priority queues and heap sort' },
        { title: 'Trie (Prefix Tree)', path: '/algorithms/trie-operations', description: 'String searching and autocomplete' }
      ]
    },
    {
      title: 'Graph Algorithms',
      icon: <Network size={24} />,
      description: 'Understand graph theory and network algorithms with interactive demos.',
      color: 'from-purple-500 to-violet-500',
      items: [
        { title: 'Graph Representation', path: '/algorithms/graph-using-array', description: 'Adjacency matrix and list representations' },
        { title: 'Breadth-First Search', path: '/algorithms/bfs-traversal', description: 'Level-by-level graph exploration' },
        { title: 'Depth-First Search', path: '/algorithms/dfs-traversal', description: 'Deep exploration of graph paths' },
        { title: 'Dijkstra\'s Algorithm', path: '/algorithms/dijkstra', description: 'Shortest path in weighted graphs' },
        { title: 'Minimum Spanning Tree', path: '/algorithms/mst-kruskal', description: 'Connect all vertices with minimum cost' },
        { title: 'Topological Sort', path: '/algorithms/topological-sort', description: 'Ordering vertices in directed graphs' }
      ]
    },
    {
      title: 'Hash-Based Structures',
      icon: <Hash size={24} />,
      description: 'Fast data access using hashing techniques and collision resolution.',
      color: 'from-orange-500 to-red-500',
      items: [
        { title: 'Hash Tables', path: '/algorithms/hash-table-using-array', description: 'Key-value storage with hash functions' },
        { title: 'Collision Resolution', path: '/algorithms/hash-collision', description: 'Chaining and open addressing methods' },
        { title: 'Bloom Filters', path: '/algorithms/bloom-filter', description: 'Probabilistic membership testing' },
        { title: 'Consistent Hashing', path: '/algorithms/consistent-hashing', description: 'Distributed system load balancing' },
        { title: 'Hash Sets', path: '/algorithms/hash-set', description: 'Unique element storage and operations' },
        { title: 'Hash Maps', path: '/algorithms/hash-map', description: 'Advanced key-value mapping techniques' }
      ]
    },
    {
      title: 'Sorting & Searching',
      icon: <BarChart3 size={24} />,
      description: 'Master essential algorithms for organizing and finding data efficiently.',
      color: 'from-pink-500 to-rose-500',
      items: [
        { title: 'Bubble Sort', path: '/algorithms/bubble-sort', description: 'Simple comparison-based sorting' },
        { title: 'Quick Sort', path: '/algorithms/quick-sort', description: 'Efficient divide-and-conquer sorting' },
        { title: 'Merge Sort', path: '/algorithms/merge-sort', description: 'Stable divide-and-conquer sorting' },
        { title: 'Heap Sort', path: '/algorithms/heap-sort', description: 'In-place sorting using heap structure' },
        { title: 'Binary Search', path: '/algorithms/ordered-list-search', description: 'Efficient searching in sorted arrays' },
        { title: 'Interpolation Search', path: '/algorithms/interpolation-search', description: 'Improved binary search for uniform data' }
      ]
    },
    {
      title: 'Advanced Data Structures',
      icon: <Cpu size={24} />,
      description: 'Explore sophisticated structures for specialized use cases.',
      color: 'from-indigo-500 to-blue-500',
      items: [
        { title: 'Segment Trees', path: '/algorithms/segment-tree', description: 'Range queries and updates' },
        { title: 'Fenwick Tree (BIT)', path: '/algorithms/fenwick-tree', description: 'Efficient prefix sum calculations' },
        { title: 'Disjoint Set Union', path: '/algorithms/union-find', description: 'Track connected components' },
        { title: 'B-Trees', path: '/algorithms/b-tree', description: 'Self-balancing trees for databases' },
        { title: 'Skip Lists', path: '/algorithms/skip-list', description: 'Probabilistic alternative to balanced trees' },
        { title: 'Suffix Arrays', path: '/algorithms/suffix-array', description: 'String processing and pattern matching' }
      ]
    },
    {
      title: 'Dynamic Programming',
      icon: <Brain size={24} />,
      description: 'Solve complex problems by breaking them into simpler subproblems.',
      color: 'from-teal-500 to-cyan-500',
      items: [
        { title: 'Fibonacci Sequence', path: '/algorithms/fibonacci-dp', description: 'Classic DP introduction with memoization' },
        { title: 'Longest Common Subsequence', path: '/algorithms/lcs-dp', description: 'String comparison and similarity' },
        { title: 'Knapsack Problem', path: '/algorithms/knapsack-dp', description: 'Optimization with weight constraints' },
        { title: 'Edit Distance', path: '/algorithms/edit-distance', description: 'Minimum operations to transform strings' },
        { title: 'Coin Change', path: '/algorithms/coin-change', description: 'Minimum coins for target amount' },
        { title: 'Matrix Chain Multiplication', path: '/algorithms/matrix-chain', description: 'Optimal parenthesization' }
      ]
    },
    {
      title: 'String Algorithms',
      icon: <Grid3X3 size={24} />,
      description: 'Efficient algorithms for text processing and pattern matching.',
      color: 'from-yellow-500 to-orange-500',
      items: [
        { title: 'KMP Pattern Matching', path: '/algorithms/kmp-search', description: 'Efficient string pattern searching' },
        { title: 'Rabin-Karp Algorithm', path: '/algorithms/rabin-karp', description: 'Rolling hash pattern matching' },
        { title: 'Z Algorithm', path: '/algorithms/z-algorithm', description: 'Linear time pattern matching' },
        { title: 'Manacher\'s Algorithm', path: '/algorithms/manacher', description: 'Find all palindromes in linear time' },
        { title: 'Suffix Tree', path: '/algorithms/suffix-tree', description: 'Compressed trie for all suffixes' },
        { title: 'Aho-Corasick', path: '/algorithms/aho-corasick', description: 'Multiple pattern matching' }
      ]
    },
    {
      title: 'Geometric Algorithms',
      icon: <Target size={24} />,
      description: 'Computational geometry and spatial data structures.',
      color: 'from-emerald-500 to-teal-500',
      items: [
        { title: 'Convex Hull', path: '/algorithms/convex-hull', description: 'Find smallest convex polygon' },
        { title: 'Line Intersection', path: '/algorithms/line-intersection', description: 'Detect intersecting line segments' },
        { title: 'Closest Pair of Points', path: '/algorithms/closest-pair', description: 'Find nearest points efficiently' },
        { title: 'Voronoi Diagrams', path: '/algorithms/voronoi', description: 'Partition plane into regions' },
        { title: 'Range Trees', path: '/algorithms/range-tree', description: 'Multi-dimensional range queries' },
        { title: 'KD-Trees', path: '/algorithms/kd-tree', description: 'Space partitioning for nearest neighbor' }
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
            <div className="text-2xl font-bold text-blue-500">50+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Algorithms</div>
          </div>
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
            <div className="text-2xl font-bold text-green-500">15+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Data Structures</div>
          </div>
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
            <div className="text-2xl font-bold text-purple-500">9</div>
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
            Dive deep into comprehensive algorithm categories, from basic data structures to advanced computational techniques.
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
                <div className="space-y-2 max-h-64 overflow-y-auto">
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
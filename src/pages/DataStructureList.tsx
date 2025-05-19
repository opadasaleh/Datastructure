import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { 
  AlignLeft, GitBranch, Network, Database, 
  LayoutGrid, Layers, ArrowRight
} from 'lucide-react';

const CategoryCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  structures: Array<{ name: string; path: string; }>;
}> = ({ title, description, icon, color, structures }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`
      rounded-xl overflow-hidden shadow-lg
      ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
      transition-transform duration-300 hover:shadow-xl
    `}>
      <div className={`h-24 ${color} flex items-center px-6`}>
        <div className="bg-white/20 p-3 rounded-lg mr-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      
      <div className="p-6">
        <p className={`
          mb-6 
          ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
        `}>
          {description}
        </p>
        
        <ul className="space-y-3">
          {structures.map((structure, index) => (
            <li key={index}>
              <Link 
                to={structure.path}
                className={`
                  flex items-center justify-between p-3 rounded-lg
                  ${theme === 'dark' 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-50 hover:bg-gray-100'}
                  transition-colors duration-200
                `}
              >
                <span>{structure.name}</span>
                <ArrowRight size={18} className="text-gray-400" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const DataStructureList: React.FC = () => {
  const { theme } = useTheme();
  
  const categories = [
    {
      title: 'Linear Structures',
      description: 'Data elements arranged in sequential order, where each element has a unique predecessor and successor.',
      icon: <AlignLeft size={24} className="text-white" />,
      color: 'bg-gradient-to-r from-blue-500 to-blue-700',
      structures: [
        { name: 'Arrays', path: '/structures/arrays' },
        { name: 'Linked Lists', path: '/structures/linked-lists' },
        { name: 'Stacks', path: '/structures/stacks' },
        { name: 'Queues', path: '/structures/queues' }
      ]
    },
    {
      title: 'Tree Structures',
      description: 'Hierarchical data structures with a root value and subtrees of children with a parent node.',
      icon: <GitBranch size={24} className="text-white" />,
      color: 'bg-gradient-to-r from-green-500 to-green-700',
      structures: [
        { name: 'Binary Trees', path: '/structures/binary-trees' },
        { name: 'Binary Search Trees', path: '/structures/binary-search-trees' },
        { name: 'Heap', path: '/structures/heap' },
        { name: 'AVL Trees', path: '/structures/avl-trees' }
      ]
    },
    {
      title: 'Graph Structures',
      description: 'Collection of nodes connected by edges, representing relationships between objects.',
      icon: <Network size={24} className="text-white" />,
      color: 'bg-gradient-to-r from-purple-500 to-purple-700',
      structures: [
        { name: 'Graph Basics', path: '/structures/graph-basics' },
        { name: 'Graph Traversal', path: '/structures/graph-traversal' },
        { name: 'Shortest Path', path: '/structures/shortest-path' },
        { name: 'Minimum Spanning Tree', path: '/structures/minimum-spanning-tree' }
      ]
    },
    {
      title: 'Hash-Based Structures',
      description: 'Data structures that use a hash function to map keys to values for efficient lookup.',
      icon: <Database size={24} className="text-white" />,
      color: 'bg-gradient-to-r from-orange-500 to-orange-700',
      structures: [
        { name: 'Hash Tables', path: '/structures/hash-tables' },
        { name: 'Hash Maps', path: '/structures/hash-maps' },
        { name: 'Hash Sets', path: '/structures/hash-sets' },
        { name: 'Collision Resolution', path: '/structures/collision-resolution' }
      ]
    },
    {
      title: 'Advanced Structures',
      description: 'Specialized data structures designed for specific use cases and optimizations.',
      icon: <LayoutGrid size={24} className="text-white" />,
      color: 'bg-gradient-to-r from-red-500 to-red-700',
      structures: [
        { name: 'Trie', path: '/structures/trie' },
        { name: 'B-Tree', path: '/structures/b-tree' },
        { name: 'Segment Tree', path: '/structures/segment-tree' },
        { name: 'Disjoint Set', path: '/structures/disjoint-set' }
      ]
    },
    {
      title: 'Algorithmic Concepts',
      description: 'Fundamental concepts and analysis techniques for algorithms and data structures.',
      icon: <Layers size={24} className="text-white" />,
      color: 'bg-gradient-to-r from-indigo-500 to-indigo-700',
      structures: [
        { name: 'Big O Notation', path: '/algorithms/big-o' },
        { name: 'Time Complexity', path: '/algorithms/time-complexity' },
        { name: 'Space Complexity', path: '/algorithms/space-complexity' },
        { name: 'Algorithm Design', path: '/algorithms/design-techniques' }
      ]
    }
  ];
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Data Structures & Algorithms
        </h1>
        <p className={`
          text-lg max-w-3xl mx-auto
          ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
        `}>
          Explore our comprehensive library of data structures and algorithms.
          Each topic includes visualizations, code examples, and step-by-step explanations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {categories.map((category, index) => (
          <CategoryCard key={index} {...category} />
        ))}
      </div>
    </div>
  );
};

export default DataStructureList;
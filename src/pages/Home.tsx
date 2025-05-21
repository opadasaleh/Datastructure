import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import {
    AlignLeft,
    List,
    GitBranch,
    ArrowRight,
    Code,
    Star
} from 'lucide-react';

const Home: React.FC = () => {
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
            title: 'Doubly Linked List',
            icon: <List size={24} />,
            description: 'A linked list where each node contains references to both the next and previous nodes.',
            path: '/algorithms/linkedlist-insert',
            features: [
                'Bidirectional traversal',
                'Efficient insertion and deletion',
                'Constant time access to adjacent nodes'
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
            items: [
                { title: 'Insertion', path: '/algorithms/array-insert', description: 'Insert elements at any position' },
                { title: 'Deletion', path: '/algorithms/array-delete', description: 'Remove elements from any position' },
                { title: 'Search', path: '/algorithms/array-search', description: 'Find elements in the array' },
                { title: 'Update', path: '/algorithms/array-update', description: 'Modify elements at any position' }
            ]
        },
        {
            title: 'Linked List Operations',
            icon: <List size={24} />,
            description: 'Explore linked list operations with interactive visualizations.',
            items: [
                { title: 'Insertion', path: '/algorithms/linkedlist-insert', description: 'Insert a new node into the list' },
                { title: 'Deletion', path: '/algorithms/linkedlist-delete', description: 'Remove a node from the list' },
                { title: 'Search', path: '/algorithms/linkedlist-search', description: 'Find a value in the list' },
                { title: 'Update', path: '/algorithms/linkedlist-update', description: "Modify a node's value" }
            ]
        },
        {
            title: 'Tree Operations',
            icon: <GitBranch size={24} />,
            description: 'Master tree data structure operations with step-by-step visualizations.',
            items: [
                { title: 'Insertion', path: '/algorithms/tree-insert', description: 'Insert a new node into the tree' },
                { title: 'Deletion', path: '/algorithms/tree-delete', description: 'Remove a node from the tree' },
                { title: 'Search', path: '/algorithms/tree-search', description: 'Find a value in the tree' },
                { title: 'Inorder Traversal', path: '/algorithms/tree-traverse-inorder', description: 'Traverse tree in Left -> Root -> Right order' },
                { title: 'Preorder Traversal', path: '/algorithms/tree-traverse-preorder', description: 'Traverse tree in Root -> Left -> Right order' },
                { title: 'Postorder Traversal', path: '/algorithms/tree-traverse-postorder', description: 'Traverse tree in Left -> Right -> Root order' }
            ]
        }
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-3">
                    <Code size={32} className="text-blue-500" />
                    <h1 className="text-4xl font-bold">Data Structures Visualizer</h1>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Interactive visualizations of common data structure operations. Learn through step-by-step animations and real-time code execution.
                </p>
            </div>

            {/* Featured Data Structures */}
            <div className="space-y-4">
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
                                transition-all duration-300 hover:shadow-xl
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
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className={`
              rounded-lg overflow-hidden
              ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
              shadow-lg border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
              transition-all duration-300 hover:shadow-xl
            `}
                    >
                        {/* Category Header */}
                        <div className={`
              p-6 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
            `}>
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="text-blue-500">{category.icon}</div>
                                <h2 className="text-xl font-semibold">{category.title}</h2>
                            </div>
                            <p className={`
                text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
              `}>
                                {category.description}
                            </p>
                        </div>

                        {/* Operations List */}
                        <div className="p-4 space-y-2">
                            {category.items.map((item, itemIndex) => (
                                <Link
                                    key={itemIndex}
                                    to={item.path}
                                    className={`
                    block p-3 rounded-md
                    ${theme === 'dark'
                                            ? 'hover:bg-gray-700 text-gray-200'
                                            : 'hover:bg-gray-50 text-gray-700'}
                    transition-colors duration-200
                    group
                  `}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-medium">{item.title}</h3>
                                            <p className={`
                        text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
                      `}>
                                                {item.description}
                                            </p>
                                        </div>
                                        <ArrowRight
                                            size={20}
                                            className={`
                        text-blue-500 transform transition-transform duration-200
                        group-hover:translate-x-1
                      `}
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home; 
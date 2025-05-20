import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
    isHighlighted?: boolean;
    isInPath?: boolean;
}

interface TreeVisualizerProps {
    operation: string;
    speed: number;
    currentStep: number;
    onStepsChange: (steps: number) => void;
}

const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ operation, speed, currentStep, onStepsChange }) => {
    const [tree, setTree] = useState<TreeNode | null>(null);
    const [highlightedNode, setHighlightedNode] = useState<number | null>(null);
    const [traversalPath, setTraversalPath] = useState<number[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [operationResult, setOperationResult] = useState<string>('');

    // Initialize tree with some values
    useEffect(() => {
        const initialTree: TreeNode = {
            value: 50,
            left: {
                value: 30,
                left: { value: 20, left: null, right: null },
                right: { value: 40, left: null, right: null }
            },
            right: {
                value: 70,
                left: { value: 60, left: null, right: null },
                right: { value: 80, left: null, right: null }
            }
        };
        setTree(initialTree);
    }, []);

    // Tree node component (original simple version)
    const TreeNode: React.FC<{
        node: TreeNode;
        level: number;
        position: number;
        parentPosition?: number;
    }> = ({ node, level, position, parentPosition }) => {
        const isHighlighted = highlightedNode === node.value;
        const isInPath = traversalPath.includes(node.value);

        return (
            <div className="flex flex-col items-center">
                <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold
            ${isHighlighted ? 'bg-blue-500' : isInPath ? 'bg-green-500' : 'bg-gray-600'}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {node.value}
                </motion.div>
                <div className="flex gap-4 mt-4">
                    {node.left && (
                        <TreeNode
                            node={node.left}
                            level={level + 1}
                            position={position - 1}
                            parentPosition={position}
                        />
                    )}
                    {node.right && (
                        <TreeNode
                            node={node.right}
                            level={level + 1}
                            position={position + 1}
                            parentPosition={position}
                        />
                    )}
                </div>
            </div>
        );
    };

    // Tree operations with improved visualization
    const insertNode = async (value: number) => {
        setIsAnimating(true);
        setOperationResult(`Inserting value: ${value}`);

        // Create a deep copy of the tree
        const deepCopy = (node: TreeNode | null): TreeNode | null => {
            if (!node) return null;
            return {
                value: node.value,
                left: deepCopy(node.left),
                right: deepCopy(node.right)
            };
        };

        const newTree = deepCopy(tree);
        if (!newTree) {
            setTree({ value, left: null, right: null });
            setOperationResult(`Created new tree with root value: ${value}`);
            setIsAnimating(false);
            return;
        }

        let current = newTree;
        const path: number[] = [];

        while (true) {
            path.push(current.value);
            if (value < current.value) {
                if (!current.left) {
                    current.left = { value, left: null, right: null };
                    break;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = { value, left: null, right: null };
                    break;
                }
                current = current.right;
            }
        }

        // Animate the insertion path
        for (const nodeValue of path) {
            setHighlightedNode(nodeValue);
            await new Promise(resolve => setTimeout(resolve, speed));
        }
        setHighlightedNode(value);
        await new Promise(resolve => setTimeout(resolve, speed));
        setHighlightedNode(null);

        // Update the tree state
        setTree(newTree);
        setOperationResult(`Successfully inserted ${value}`);
        setIsAnimating(false);
    };

    const deleteNode = async (value: number) => {
        setIsAnimating(true);
        setOperationResult(`Deleting value: ${value}`);
        const newTree = { ...tree! };
        let current = newTree;
        const path: number[] = [];

        // Find the node to delete
        while (current && current.value !== value) {
            path.push(current.value);
            if (value < current.value) {
                current = current.left!;
            } else {
                current = current.right!;
            }
        }

        // Animate the deletion path
        for (const nodeValue of path) {
            setHighlightedNode(nodeValue);
            await new Promise(resolve => setTimeout(resolve, speed));
        }
        setHighlightedNode(value);
        await new Promise(resolve => setTimeout(resolve, speed));

        // Delete the node (simplified version)
        if (current) {
            current.value = -1; // Mark for deletion
            setTree({ ...newTree });
            setOperationResult(`Successfully deleted ${value}`);
        } else {
            setOperationResult(`Value ${value} not found in tree`);
        }

        setHighlightedNode(null);
        setIsAnimating(false);
    };

    const searchNode = async (value: number) => {
        setIsAnimating(true);
        setOperationResult(`Searching for value: ${value}`);
        const path: number[] = [];
        let current = tree;
        let found = false;

        while (current) {
            path.push(current.value);
            if (current.value === value) {
                found = true;
                break;
            }
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        // Animate the search path
        for (const nodeValue of path) {
            setHighlightedNode(nodeValue);
            await new Promise(resolve => setTimeout(resolve, speed));
        }
        await new Promise(resolve => setTimeout(resolve, speed));
        setHighlightedNode(null);
        setOperationResult(found ? `Found value ${value}` : `Value ${value} not found`);
        setIsAnimating(false);
    };

    const traverseTree = async (type: 'inorder' | 'preorder' | 'postorder') => {
        setIsAnimating(true);
        setOperationResult(`${type.charAt(0).toUpperCase() + type.slice(1)} traversal started`);
        const path: number[] = [];

        const traverse = (node: TreeNode | null) => {
            if (!node) return;

            if (type === 'preorder') path.push(node.value);
            traverse(node.left);
            if (type === 'inorder') path.push(node.value);
            traverse(node.right);
            if (type === 'postorder') path.push(node.value);
        };

        traverse(tree);

        // Animate the traversal
        for (const nodeValue of path) {
            setHighlightedNode(nodeValue);
            setTraversalPath(prev => [...prev, nodeValue]);
            await new Promise(resolve => setTimeout(resolve, speed));
        }

        setHighlightedNode(null);
        setTraversalPath([]);
        setOperationResult(`${type.charAt(0).toUpperCase() + type.slice(1)} traversal completed`);
        setIsAnimating(false);
    };

    // Handle operation changes
    useEffect(() => {
        if (!tree || isAnimating) return;

        switch (operation) {
            case 'tree-insert':
                insertNode(Math.floor(Math.random() * 100));
                break;
            case 'tree-delete':
                deleteNode(40); // Example value
                break;
            case 'tree-search':
                searchNode(60); // Example value
                break;
            case 'tree-traverse-inorder':
                traverseTree('inorder');
                break;
            case 'tree-traverse-preorder':
                traverseTree('preorder');
                break;
            case 'tree-traverse-postorder':
                traverseTree('postorder');
                break;
        }
    }, [operation, speed]);

    return (
        <div className="flex flex-col items-center p-4">
            {/* Horizontally scrollable tree visualization area */}
            <div className="w-full" style={{ maxWidth: '100vw' }}>
                <div className="overflow-x-scroll" style={{ maxHeight: 350, minHeight: 200 }}>
                    <div className="flex justify-center items-start min-w-[800px]">
                        {tree && <TreeNode node={tree} level={0} position={0} />}
                    </div>
                </div>
            </div>
            {/* Operation Result Display */}
            <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                <p className="text-sm font-medium">{operationResult}</p>
            </div>
            {/* Control Buttons */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition-colors"
                    onClick={() => insertNode(Math.floor(Math.random() * 100))}
                    disabled={isAnimating}
                >
                    Insert Random
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 transition-colors"
                    onClick={() => deleteNode(40)}
                    disabled={isAnimating}
                >
                    Delete 40
                </button>
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 transition-colors"
                    onClick={() => searchNode(60)}
                    disabled={isAnimating}
                >
                    Search 60
                </button>
                <button
                    className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50 transition-colors"
                    onClick={() => traverseTree('inorder')}
                    disabled={isAnimating}
                >
                    Inorder
                </button>
                <button
                    className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50 transition-colors"
                    onClick={() => traverseTree('preorder')}
                    disabled={isAnimating}
                >
                    Preorder
                </button>
                <button
                    className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50 transition-colors"
                    onClick={() => traverseTree('postorder')}
                    disabled={isAnimating}
                >
                    Postorder
                </button>
            </div>
        </div>
    );
};

export default TreeVisualizer; 
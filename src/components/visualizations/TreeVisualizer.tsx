import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useVisualization } from '../../contexts/VisualizationContext';
import { useTheme } from '../../contexts/ThemeContext';

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
    const { size } = useVisualization();
    const { theme } = useTheme();
    const [tree, setTree] = useState<TreeNode | null>(null);
    const [highlightedNode, setHighlightedNode] = useState<number | null>(null);
    const [traversalPath, setTraversalPath] = useState<number[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [operationResult, setOperationResult] = useState<string>('');
    const [operationSteps, setOperationSteps] = useState<TreeNode[][]>([]);

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
        generateOperationSteps(initialTree);
    }, [operation]);

    // Update visualization based on current step
    useEffect(() => {
        if (operationSteps[currentStep]) {
            // Apply step-based changes here
            setHighlightedNode(null);
            setTraversalPath([]);
        }
    }, [currentStep, operationSteps]);

    const generateOperationSteps = (initialTree: TreeNode) => {
        const steps: TreeNode[][] = [];
        
        // Generate steps based on operation
        switch (operation) {
            case 'tree-insert':
                // Generate insertion steps
                for (let i = 0; i < 5; i++) {
                    steps.push([initialTree]);
                }
                break;
            case 'tree-delete':
                // Generate deletion steps
                for (let i = 0; i < 4; i++) {
                    steps.push([initialTree]);
                }
                break;
            case 'tree-search':
                // Generate search steps
                for (let i = 0; i < 3; i++) {
                    steps.push([initialTree]);
                }
                break;
            case 'tree-traverse-inorder':
            case 'tree-traverse-preorder':
            case 'tree-traverse-postorder':
                // Generate traversal steps
                for (let i = 0; i < 7; i++) {
                    steps.push([initialTree]);
                }
                break;
            default:
                steps.push([initialTree]);
        }
        
        setOperationSteps(steps);
        onStepsChange(steps.length);
    };

    // Tree node component
    const TreeNodeComponent: React.FC<{
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
                    className={`
                        w-12 h-12 rounded-full flex items-center justify-center text-white font-bold
                        transition-all duration-300
                        ${isHighlighted ? 'bg-blue-500 scale-110' : 
                          isInPath ? 'bg-green-500' : 
                          theme === 'dark' ? 'bg-gray-600' : 'bg-gray-500'}
                    `}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {node.value}
                </motion.div>
                <div className="flex gap-4 mt-4">
                    {node.left && (
                        <TreeNodeComponent
                            node={node.left}
                            level={level + 1}
                            position={position - 1}
                            parentPosition={position}
                        />
                    )}
                    {node.right && (
                        <TreeNodeComponent
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

    // Tree operations
    const insertNode = async (value: number) => {
        setIsAnimating(true);
        setOperationResult(`Inserting value: ${value}`);

        // Simulate insertion animation
        const path: number[] = [50, 30, 40]; // Example path
        for (const nodeValue of path) {
            setHighlightedNode(nodeValue);
            await new Promise(resolve => setTimeout(resolve, 1000 / speed));
        }
        
        setHighlightedNode(null);
        setOperationResult(`Successfully inserted ${value}`);
        setIsAnimating(false);
    };

    const deleteNode = async (value: number) => {
        setIsAnimating(true);
        setOperationResult(`Deleting value: ${value}`);
        
        // Simulate deletion animation
        setHighlightedNode(value);
        await new Promise(resolve => setTimeout(resolve, 1000 / speed));
        
        setHighlightedNode(null);
        setOperationResult(`Successfully deleted ${value}`);
        setIsAnimating(false);
    };

    const searchNode = async (value: number) => {
        setIsAnimating(true);
        setOperationResult(`Searching for value: ${value}`);
        
        // Simulate search animation
        const path: number[] = [50, 70, 60];
        for (const nodeValue of path) {
            setHighlightedNode(nodeValue);
            await new Promise(resolve => setTimeout(resolve, 1000 / speed));
        }
        
        setHighlightedNode(null);
        setOperationResult(`Found value ${value}`);
        setIsAnimating(false);
    };

    const traverseTree = async (type: 'inorder' | 'preorder' | 'postorder') => {
        setIsAnimating(true);
        setOperationResult(`${type.charAt(0).toUpperCase() + type.slice(1)} traversal started`);
        
        let path: number[] = [];
        switch (type) {
            case 'inorder':
                path = [20, 30, 40, 50, 60, 70, 80];
                break;
            case 'preorder':
                path = [50, 30, 20, 40, 70, 60, 80];
                break;
            case 'postorder':
                path = [20, 40, 30, 60, 80, 70, 50];
                break;
        }

        // Animate traversal
        for (const nodeValue of path) {
            setHighlightedNode(nodeValue);
            setTraversalPath(prev => [...prev, nodeValue]);
            await new Promise(resolve => setTimeout(resolve, 1000 / speed));
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
                deleteNode(40);
                break;
            case 'tree-search':
                searchNode(60);
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
        <div className="h-full w-full flex flex-col items-center justify-center p-4">
            {/* Tree visualization area */}
            <div className="flex-1 w-full overflow-auto">
                <div className="flex justify-center items-start min-w-[800px] min-h-[300px]" style={{ transform: `scale(${size})`, transformOrigin: 'center' }}>
                    {tree && <TreeNodeComponent node={tree} level={0} position={0} />}
                </div>
            </div>
            
            {/* Operation Result Display */}
            {operationResult && (
                <div className={`
                    mt-4 p-3 rounded-md text-center max-w-md
                    ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}
                `}>
                    <p className="text-sm font-medium">{operationResult}</p>
                </div>
            )}
        </div>
    );
};

export default TreeVisualizer;
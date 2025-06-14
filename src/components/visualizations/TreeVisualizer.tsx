import React, { useState, useEffect } from 'react';
import { useVisualization } from '../../contexts/VisualizationContext';
import { useTheme } from '../../contexts/ThemeContext';

interface TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
    isHighlighted?: boolean;
    isInPath?: boolean;
    isNew?: boolean;
    isDeleting?: boolean;
    x?: number;
    y?: number;
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
    const [operationSteps, setOperationSteps] = useState<any[]>([]);
    const [currentStepData, setCurrentStepData] = useState<any>(null);

    // Initialize tree with positioned nodes
    useEffect(() => {
        const initialTree: TreeNode = {
            value: 50,
            x: 400,
            y: 50,
            left: {
                value: 30,
                x: 250,
                y: 150,
                left: { 
                    value: 20, 
                    x: 150, 
                    y: 250, 
                    left: null, 
                    right: null 
                },
                right: { 
                    value: 40, 
                    x: 350, 
                    y: 250, 
                    left: null, 
                    right: null 
                }
            },
            right: {
                value: 70,
                x: 550,
                y: 150,
                left: { 
                    value: 60, 
                    x: 450, 
                    y: 250, 
                    left: null, 
                    right: null 
                },
                right: { 
                    value: 80, 
                    x: 650, 
                    y: 250, 
                    left: null, 
                    right: null 
                }
            }
        };
        setTree(initialTree);
        generateOperationSteps(initialTree);
    }, [operation]);

    // Update visualization based on current step
    useEffect(() => {
        if (operationSteps[currentStep]) {
            setCurrentStepData(operationSteps[currentStep]);
        }
    }, [currentStep, operationSteps]);

    const generateOperationSteps = (initialTree: TreeNode) => {
        const steps: any[] = [];
        
        switch (operation) {
            case 'tree-insert': {
                const newValue = 45;
                steps.push({
                    type: 'start',
                    message: 'Starting insertion of value 45',
                    highlightedNodes: [],
                    tree: initialTree
                });

                steps.push({
                    type: 'compare',
                    message: 'Compare 45 with root (50). 45 < 50, go left',
                    highlightedNodes: [50],
                    tree: initialTree
                });

                steps.push({
                    type: 'compare',
                    message: 'Compare 45 with 30. 45 > 30, go right',
                    highlightedNodes: [30],
                    tree: initialTree
                });

                steps.push({
                    type: 'compare',
                    message: 'Compare 45 with 40. 45 > 40, go right',
                    highlightedNodes: [40],
                    tree: initialTree
                });

                steps.push({
                    type: 'insert',
                    message: 'Found empty spot! Insert 45 as right child of 40',
                    highlightedNodes: [45],
                    newNode: { value: 45, x: 400, y: 350 },
                    tree: initialTree
                });

                steps.push({
                    type: 'complete',
                    message: '✅ Successfully inserted 45 into the tree!',
                    highlightedNodes: [],
                    tree: initialTree
                });
                break;
            }

            case 'tree-delete': {
                steps.push({
                    type: 'start',
                    message: 'Starting deletion of value 30',
                    highlightedNodes: [],
                    tree: initialTree
                });

                steps.push({
                    type: 'find',
                    message: 'Found node 30 to delete',
                    highlightedNodes: [30],
                    tree: initialTree
                });

                steps.push({
                    type: 'analyze',
                    message: 'Node 30 has two children. Need to find replacement',
                    highlightedNodes: [30, 20, 40],
                    tree: initialTree
                });

                steps.push({
                    type: 'replace',
                    message: 'Replace 30 with its successor (40)',
                    highlightedNodes: [40],
                    deletingNode: 30,
                    tree: initialTree
                });

                steps.push({
                    type: 'complete',
                    message: '✅ Successfully deleted 30 from the tree!',
                    highlightedNodes: [],
                    tree: initialTree
                });
                break;
            }

            case 'tree-search': {
                const searchValue = 60;
                steps.push({
                    type: 'start',
                    message: 'Starting search for value 60',
                    highlightedNodes: [],
                    tree: initialTree
                });

                steps.push({
                    type: 'compare',
                    message: 'Compare 60 with root (50). 60 > 50, go right',
                    highlightedNodes: [50],
                    tree: initialTree
                });

                steps.push({
                    type: 'compare',
                    message: 'Compare 60 with 70. 60 < 70, go left',
                    highlightedNodes: [70],
                    tree: initialTree
                });

                steps.push({
                    type: 'found',
                    message: '🎯 Found it! Value 60 is in the tree',
                    highlightedNodes: [60],
                    foundNode: 60,
                    tree: initialTree
                });

                steps.push({
                    type: 'complete',
                    message: '✅ Search completed successfully!',
                    highlightedNodes: [],
                    tree: initialTree
                });
                break;
            }

            case 'tree-traverse-inorder': {
                steps.push({
                    type: 'start',
                    message: 'Starting Inorder Traversal (Left → Root → Right)',
                    highlightedNodes: [],
                    traversalOrder: [],
                    tree: initialTree
                });

                const inorderPath = [20, 30, 40, 50, 60, 70, 80];
                inorderPath.forEach((value, index) => {
                    steps.push({
                        type: 'visit',
                        message: `Visit node ${value} (${index + 1}/${inorderPath.length})`,
                        highlightedNodes: [value],
                        traversalOrder: inorderPath.slice(0, index + 1),
                        tree: initialTree
                    });
                });

                steps.push({
                    type: 'complete',
                    message: '✅ Inorder traversal complete! Order: 20, 30, 40, 50, 60, 70, 80',
                    highlightedNodes: [],
                    traversalOrder: inorderPath,
                    tree: initialTree
                });
                break;
            }

            case 'tree-traverse-preorder': {
                steps.push({
                    type: 'start',
                    message: 'Starting Preorder Traversal (Root → Left → Right)',
                    highlightedNodes: [],
                    traversalOrder: [],
                    tree: initialTree
                });

                const preorderPath = [50, 30, 20, 40, 70, 60, 80];
                preorderPath.forEach((value, index) => {
                    steps.push({
                        type: 'visit',
                        message: `Visit node ${value} (${index + 1}/${preorderPath.length})`,
                        highlightedNodes: [value],
                        traversalOrder: preorderPath.slice(0, index + 1),
                        tree: initialTree
                    });
                });

                steps.push({
                    type: 'complete',
                    message: '✅ Preorder traversal complete! Order: 50, 30, 20, 40, 70, 60, 80',
                    highlightedNodes: [],
                    traversalOrder: preorderPath,
                    tree: initialTree
                });
                break;
            }

            case 'tree-traverse-postorder': {
                steps.push({
                    type: 'start',
                    message: 'Starting Postorder Traversal (Left → Right → Root)',
                    highlightedNodes: [],
                    traversalOrder: [],
                    tree: initialTree
                });

                const postorderPath = [20, 40, 30, 60, 80, 70, 50];
                postorderPath.forEach((value, index) => {
                    steps.push({
                        type: 'visit',
                        message: `Visit node ${value} (${index + 1}/${postorderPath.length})`,
                        highlightedNodes: [value],
                        traversalOrder: postorderPath.slice(0, index + 1),
                        tree: initialTree
                    });
                });

                steps.push({
                    type: 'complete',
                    message: '✅ Postorder traversal complete! Order: 20, 40, 30, 60, 80, 70, 50',
                    highlightedNodes: [],
                    traversalOrder: postorderPath,
                    tree: initialTree
                });
                break;
            }

            default:
                steps.push({
                    type: 'start',
                    message: 'Tree visualization ready',
                    highlightedNodes: [],
                    tree: initialTree
                });
        }
        
        setOperationSteps(steps);
        onStepsChange(steps.length);
    };

    // Render connections between nodes
    const renderConnections = (node: TreeNode, parentX?: number, parentY?: number) => {
        const connections = [];
        
        if (parentX !== undefined && parentY !== undefined && node.x && node.y) {
            connections.push(
                <line
                    key={`line-${node.value}`}
                    x1={parentX}
                    y1={parentY + 25}
                    x2={node.x}
                    y2={node.y + 25}
                    stroke={theme === 'dark' ? '#6B7280' : '#9CA3AF'}
                    strokeWidth="2"
                />
            );
        }

        if (node.left) {
            connections.push(...renderConnections(node.left, node.x, node.y));
        }
        if (node.right) {
            connections.push(...renderConnections(node.right, node.x, node.y));
        }

        return connections;
    };

    // Render tree nodes
    const renderNodes = (node: TreeNode): JSX.Element[] => {
        const nodes = [];
        const isHighlighted = currentStepData?.highlightedNodes?.includes(node.value);
        const isInTraversal = currentStepData?.traversalOrder?.includes(node.value);
        const isNewNode = currentStepData?.newNode?.value === node.value;
        const isDeleting = currentStepData?.deletingNode === node.value;
        const isFound = currentStepData?.foundNode === node.value;

        if (node.x && node.y) {
            nodes.push(
                <g key={`node-${node.value}`}>
                    {/* Node circle */}
                    <circle
                        cx={node.x}
                        cy={node.y + 25}
                        r="25"
                        fill={
                            isFound ? '#10B981' :
                            isNewNode ? '#3B82F6' :
                            isDeleting ? '#EF4444' :
                            isHighlighted ? '#F59E0B' :
                            isInTraversal ? '#8B5CF6' :
                            theme === 'dark' ? '#374151' : '#F3F4F6'
                        }
                        stroke={
                            isHighlighted ? '#F59E0B' :
                            isFound ? '#10B981' :
                            theme === 'dark' ? '#6B7280' : '#9CA3AF'
                        }
                        strokeWidth="2"
                        className={`transition-all duration-300 ${
                            isHighlighted || isFound || isNewNode ? 'animate-pulse' : ''
                        }`}
                    />
                    
                    {/* Node value */}
                    <text
                        x={node.x}
                        y={node.y + 30}
                        textAnchor="middle"
                        className={`text-lg font-bold ${
                            isFound || isNewNode || isDeleting || isHighlighted ? 'fill-white' :
                            theme === 'dark' ? 'fill-white' : 'fill-gray-900'
                        }`}
                    >
                        {node.value}
                    </text>

                    {/* Node labels */}
                    {node.value === 50 && (
                        <text
                            x={node.x}
                            y={node.y - 10}
                            textAnchor="middle"
                            className="text-xs fill-blue-500 font-semibold"
                        >
                            ROOT
                        </text>
                    )}
                </g>
            );
        }

        if (node.left) {
            nodes.push(...renderNodes(node.left));
        }
        if (node.right) {
            nodes.push(...renderNodes(node.right));
        }

        // Add new node if being inserted
        if (currentStepData?.newNode && currentStepData.newNode.value !== node.value) {
            const newNode = currentStepData.newNode;
            nodes.push(
                <g key={`new-node-${newNode.value}`}>
                    <circle
                        cx={newNode.x}
                        cy={newNode.y + 25}
                        r="25"
                        fill="#3B82F6"
                        stroke="#1D4ED8"
                        strokeWidth="2"
                        className="animate-bounce"
                    />
                    <text
                        x={newNode.x}
                        y={newNode.y + 30}
                        textAnchor="middle"
                        className="text-lg font-bold fill-white"
                    >
                        {newNode.value}
                    </text>
                </g>
            );
        }

        return nodes;
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-4">
            {/* Header */}
            <div className="mb-6 text-center">
                <h3 className="text-2xl font-bold mb-2 text-blue-600">
                    {operation === 'tree-insert' && '🌱 Adding to Binary Search Tree'}
                    {operation === 'tree-delete' && '✂️ Removing from Binary Search Tree'}
                    {operation === 'tree-search' && '🔍 Searching Binary Search Tree'}
                    {operation === 'tree-traverse-inorder' && '🚶 Walking Tree (Inorder)'}
                    {operation === 'tree-traverse-preorder' && '🚶 Walking Tree (Preorder)'}
                    {operation === 'tree-traverse-postorder' && '🚶 Walking Tree (Postorder)'}
                </h3>

                {/* Step message */}
                {currentStepData?.message && (
                    <div className="text-lg mb-4">
                        <p>Step {currentStep + 1}: {currentStepData.message}</p>
                    </div>
                )}
            </div>

            {/* Legend */}
            <div className="mb-6 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                    <span>Currently Checking</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span>New Node</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span>Found/Success</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                    <span>Visited</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <span>Deleting</span>
                </div>
            </div>

            {/* Tree visualization */}
            <div className="flex-1 w-full overflow-auto">
                <div 
                    className="min-w-[800px] min-h-[400px] relative"
                    style={{ transform: `scale(${size})`, transformOrigin: 'center' }}
                >
                    <svg width="800" height="400" className="w-full h-full">
                        {/* Render connections first (behind nodes) */}
                        {tree && renderConnections(tree)}
                        
                        {/* Render nodes */}
                        {tree && renderNodes(tree)}

                        {/* Direction labels */}
                        <text x="100" y="30" className="text-sm fill-gray-500 font-semibold">
                            ← Smaller values (Left)
                        </text>
                        <text x="600" y="30" className="text-sm fill-gray-500 font-semibold">
                            Larger values (Right) →
                        </text>
                    </svg>
                </div>
            </div>

            {/* Traversal order display */}
            {currentStepData?.traversalOrder && currentStepData.traversalOrder.length > 0 && (
                <div className={`
                    mt-4 p-4 rounded-lg text-center
                    ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}
                `}>
                    <p className="font-semibold mb-2">Traversal Order:</p>
                    <div className="flex justify-center gap-2 flex-wrap">
                        {currentStepData.traversalOrder.map((value: number, index: number) => (
                            <span
                                key={index}
                                className={`
                                    px-3 py-1 rounded-full text-sm font-medium
                                    ${theme === 'dark' ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-800'}
                                `}
                            >
                                {value}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Tree properties info */}
            <div className={`
                mt-4 p-4 rounded-lg text-center max-w-2xl
                ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}
            `}>
                <p className="text-sm">
                    <strong>Binary Search Tree Rule:</strong> Left children are smaller, right children are larger than their parent.
                    This makes searching very efficient! 🚀
                </p>
            </div>
        </div>
    );
};

export default TreeVisualizer;
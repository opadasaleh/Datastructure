import React, { useState, useEffect } from 'react';
import { useVisualization } from '../../contexts/VisualizationContext';
import { useTheme } from '../../contexts/ThemeContext';

interface TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
    isHighlighted?: boolean;
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

    useEffect(() => {
        const initialTree: TreeNode = {
            value: 50,
            x: 300,
            y: 50,
            left: {
                value: 30,
                x: 200,
                y: 120,
                left: { value: 20, x: 150, y: 190, left: null, right: null },
                right: { value: 40, x: 250, y: 190, left: null, right: null }
            },
            right: {
                value: 70,
                x: 400,
                y: 120,
                left: { value: 60, x: 350, y: 190, left: null, right: null },
                right: { value: 80, x: 450, y: 190, left: null, right: null }
            }
        };
        setTree(initialTree);
        generateOperationSteps(initialTree);
    }, [operation]);

    useEffect(() => {
        if (operationSteps[currentStep]) {
            setTree(operationSteps[currentStep].tree);
        }
    }, [currentStep, operationSteps]);

    const generateOperationSteps = (initialTree: TreeNode) => {
        const steps: any[] = [];
        
        switch (operation) {
            case 'tree-insert': {
                steps.push({ tree: JSON.parse(JSON.stringify(initialTree)), message: 'Starting insertion' });
                
                // Highlight path to insertion point
                const step1 = JSON.parse(JSON.stringify(initialTree));
                if (step1.left) step1.left.isHighlighted = true;
                steps.push({ tree: step1, message: 'Going left (45 < 50)' });

                const step2 = JSON.parse(JSON.stringify(step1));
                if (step2.left?.right) step2.left.right.isHighlighted = true;
                steps.push({ tree: step2, message: 'Going right (45 > 30)' });

                // Add new node
                const finalTree = JSON.parse(JSON.stringify(step2));
                if (finalTree.left?.right) {
                    finalTree.left.right.right = {
                        value: 45,
                        x: 300,
                        y: 260,
                        left: null,
                        right: null,
                        isNew: true
                    };
                }
                steps.push({ tree: finalTree, message: 'Added new node 45' });
                break;
            }

            case 'tree-delete': {
                steps.push({ tree: JSON.parse(JSON.stringify(initialTree)), message: 'Starting deletion' });
                
                const step1 = JSON.parse(JSON.stringify(initialTree));
                if (step1.left) step1.left.isHighlighted = true;
                steps.push({ tree: step1, message: 'Found node 30 to delete' });

                const step2 = JSON.parse(JSON.stringify(step1));
                if (step2.left) step2.left.isDeleting = true;
                steps.push({ tree: step2, message: 'Deleting node 30' });

                const finalTree = JSON.parse(JSON.stringify(initialTree));
                if (finalTree.left) {
                    finalTree.left.value = 40;
                    finalTree.left.right = null;
                }
                steps.push({ tree: finalTree, message: 'Replaced with successor' });
                break;
            }

            case 'tree-search': {
                steps.push({ tree: JSON.parse(JSON.stringify(initialTree)), message: 'Searching for 60' });
                
                const step1 = JSON.parse(JSON.stringify(initialTree));
                step1.isHighlighted = true;
                steps.push({ tree: step1, message: 'Check root (60 > 50)' });

                const step2 = JSON.parse(JSON.stringify(step1));
                if (step2.right) step2.right.isHighlighted = true;
                steps.push({ tree: step2, message: 'Go right (60 < 70)' });

                const finalTree = JSON.parse(JSON.stringify(step2));
                if (finalTree.right?.left) finalTree.right.left.isHighlighted = true;
                steps.push({ tree: finalTree, message: 'Found 60!' });
                break;
            }

            default:
                steps.push({ tree: JSON.parse(JSON.stringify(initialTree)), message: 'Tree ready' });
        }
        
        setOperationSteps(steps);
        onStepsChange(steps.length);
    };

    const renderConnections = (node: TreeNode, parentX?: number, parentY?: number) => {
        const connections = [];
        
        if (parentX !== undefined && parentY !== undefined && node.x && node.y) {
            connections.push(
                <line
                    key={`line-${node.value}`}
                    x1={parentX}
                    y1={parentY + 20}
                    x2={node.x}
                    y2={node.y + 20}
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

    const renderNodes = (node: TreeNode): JSX.Element[] => {
        const nodes = [];

        if (node.x && node.y) {
            nodes.push(
                <g key={`node-${node.value}`}>
                    <circle
                        cx={node.x}
                        cy={node.y + 20}
                        r="20"
                        fill={
                            node.isNew ? '#3B82F6' :
                            node.isDeleting ? '#EF4444' :
                            node.isHighlighted ? '#F59E0B' :
                            theme === 'dark' ? '#374151' : '#F3F4F6'
                        }
                        stroke={theme === 'dark' ? '#6B7280' : '#9CA3AF'}
                        strokeWidth="2"
                    />
                    
                    <text
                        x={node.x}
                        y={node.y + 25}
                        textAnchor="middle"
                        className={`text-sm font-bold ${
                            node.isNew || node.isDeleting || node.isHighlighted ? 'fill-white' :
                            theme === 'dark' ? 'fill-white' : 'fill-gray-900'
                        }`}
                    >
                        {node.value}
                    </text>
                </g>
            );
        }

        if (node.left) {
            nodes.push(...renderNodes(node.left));
        }
        if (node.right) {
            nodes.push(...renderNodes(node.right));
        }

        return nodes;
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8">
            {/* Simple title */}
            <h3 className="text-xl font-bold mb-8 text-center">
                {operation === 'tree-insert' && 'Adding to Tree'}
                {operation === 'tree-delete' && 'Removing from Tree'}
                {operation === 'tree-search' && 'Searching Tree'}
                {operation.includes('traverse') && 'Walking Tree'}
            </h3>

            {/* Tree visualization */}
            <div className="flex-1 w-full overflow-auto">
                <div 
                    className="min-w-[600px] min-h-[300px] relative"
                    style={{ transform: `scale(${size})`, transformOrigin: 'center' }}
                >
                    <svg width="600" height="300" className="w-full h-full">
                        {tree && renderConnections(tree)}
                        {tree && renderNodes(tree)}
                    </svg>
                </div>
            </div>

            {/* Simple status */}
            <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Step {currentStep + 1}: {operationSteps[currentStep]?.message || 'Processing...'}
                </p>
            </div>
        </div>
    );
};

export default TreeVisualizer;
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useVisualization } from '../../contexts/VisualizationContext';

interface ListNode {
    value: number;
    isActive: boolean;
    isHighlighted: boolean;
    isNew: boolean;
    isDeleting: boolean;
}

interface LinkedListVisualizerProps {
    operation: string;
    currentStep: number;
    onStepsChange: (totalSteps: number) => void;
    speed: number;
}

const LinkedListVisualizer: React.FC<LinkedListVisualizerProps> = ({
    operation,
    currentStep,
    onStepsChange,
    speed
}) => {
    const { theme } = useTheme();
    const { size } = useVisualization();
    const [nodes, setNodes] = useState<ListNode[]>([]);
    const [operationSteps, setOperationSteps] = useState<ListNode[][]>([]);

    useEffect(() => {
        const initialSize = 4;
        const newNodes: ListNode[] = Array.from({ length: initialSize }, (_, index) => ({
            value: (index + 1) * 10,
            isActive: false,
            isHighlighted: false,
            isNew: false,
            isDeleting: false
        }));
        setNodes(newNodes);
        generateOperationSteps(newNodes);
    }, [operation]);

    useEffect(() => {
        if (operationSteps[currentStep]) {
            setNodes(operationSteps[currentStep]);
        }
    }, [currentStep, operationSteps]);

    const generateOperationSteps = (initialNodes: ListNode[]) => {
        const steps: ListNode[][] = [initialNodes];
        const list = [...initialNodes];

        steps.push(JSON.parse(JSON.stringify(list)));

        switch (operation) {
            case 'linkedlist-insert': {
                const insertIndex = 2;
                const newValue = 25;

                // Highlight insertion point
                list[insertIndex].isHighlighted = true;
                steps.push(JSON.parse(JSON.stringify(list)));

                // Insert new node
                const newNode: ListNode = {
                    value: newValue,
                    isActive: false,
                    isHighlighted: false,
                    isNew: true,
                    isDeleting: false
                };

                list.splice(insertIndex + 1, 0, newNode);
                steps.push(JSON.parse(JSON.stringify(list)));

                // Reset
                list.forEach(node => {
                    node.isNew = false;
                    node.isHighlighted = false;
                });
                steps.push(JSON.parse(JSON.stringify(list)));
                break;
            }

            case 'linkedlist-delete': {
                const deleteIndex = 2;

                // Highlight node to delete
                list[deleteIndex].isHighlighted = true;
                steps.push(JSON.parse(JSON.stringify(list)));

                // Mark as deleting
                list[deleteIndex].isDeleting = true;
                steps.push(JSON.parse(JSON.stringify(list)));

                // Remove node
                list.splice(deleteIndex, 1);
                steps.push(JSON.parse(JSON.stringify(list)));
                break;
            }

            case 'linkedlist-search': {
                const searchValue = 30;

                for (let i = 0; i < list.length; i++) {
                    list.forEach((node, idx) => {
                        node.isHighlighted = idx === i;
                        node.isActive = idx < i;
                    });
                    steps.push(JSON.parse(JSON.stringify(list)));

                    if (list[i].value === searchValue) {
                        list[i].isActive = true;
                        list[i].isHighlighted = false;
                        steps.push(JSON.parse(JSON.stringify(list)));
                        break;
                    }
                }
                break;
            }

            case 'linkedlist-update': {
                const updateIndex = 2;
                const newValue = 35;

                // Highlight node to update
                list[updateIndex].isHighlighted = true;
                steps.push(JSON.parse(JSON.stringify(list)));

                // Update value
                list[updateIndex].value = newValue;
                list[updateIndex].isNew = true;
                list[updateIndex].isHighlighted = false;
                steps.push(JSON.parse(JSON.stringify(list)));

                // Reset
                list[updateIndex].isNew = false;
                steps.push(JSON.parse(JSON.stringify(list)));
                break;
            }
        }

        setOperationSteps(steps);
        onStepsChange(steps.length);
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8">
            {/* Simple title */}
            <h3 className="text-xl font-bold mb-8 text-center">
                {operation === 'linkedlist-insert' && 'Adding Node'}
                {operation === 'linkedlist-delete' && 'Removing Node'}
                {operation === 'linkedlist-search' && 'Finding Node'}
                {operation === 'linkedlist-update' && 'Updating Node'}
            </h3>

            {/* Linked list visualization */}
            <div className="flex items-center gap-4" style={{ transform: `scale(${size})` }}>
                {nodes.map((node, index) => (
                    <div key={index} className="flex items-center">
                        {/* Node */}
                        <div
                            className={`
                                flex items-center justify-center
                                w-16 h-16 border-2 font-bold text-lg rounded
                                transition-all duration-300
                                ${node.isHighlighted ? 'border-yellow-400 bg-yellow-100 dark:bg-yellow-900' : ''}
                                ${node.isActive ? 'border-green-400 bg-green-100 dark:bg-green-900' : ''}
                                ${node.isNew ? 'border-blue-400 bg-blue-100 dark:bg-blue-900 animate-pulse' : ''}
                                ${node.isDeleting ? 'opacity-50 scale-90' : ''}
                                ${!node.isHighlighted && !node.isActive && !node.isNew ? 
                                    (theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-white') : ''}
                            `}
                        >
                            {node.value}
                        </div>

                        {/* Arrow to next node */}
                        {index < nodes.length - 1 && (
                            <div className="mx-2 text-gray-400">→</div>
                        )}
                    </div>
                ))}
            </div>

            {/* Simple status */}
            <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Step {currentStep + 1}: {
                        currentStep === 0 ? 'Starting...' :
                        currentStep === 1 ? 'Processing...' :
                        currentStep === 2 ? 'Almost done...' :
                        'Complete!'
                    }
                </p>
            </div>
        </div>
    );
};

export default LinkedListVisualizer;
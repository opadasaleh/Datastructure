import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface ListNode {
    value: number;
    isActive: boolean;
    isHighlighted: boolean;
    isNew: boolean;
    isDeleting: boolean;
    isHead: boolean;
    isTail: boolean;
    isPointerActive: boolean;
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
    const [nodes, setNodes] = useState<ListNode[]>([]);
    const [operationSteps, setOperationSteps] = useState<ListNode[][]>([]);

    // Initialize linked list on mount
    useEffect(() => {
        console.log('Operation:', operation);
        const initialSize = 5;
        const newNodes: ListNode[] = Array.from({ length: initialSize }, (_, index) => ({
            value: (index + 1) * 10,
            isActive: false,
            isHighlighted: false,
            isNew: false,
            isDeleting: false,
            isHead: index === 0,
            isTail: index === initialSize - 1,
            isPointerActive: false
        }));
        setNodes(newNodes);
        generateOperationSteps(newNodes);
    }, [operation]);

    // Update visualization based on current step
    useEffect(() => {
        if (operationSteps[currentStep]) {
            setNodes(operationSteps[currentStep]);
        }
    }, [currentStep, operationSteps]);

    const generateOperationSteps = (initialNodes: ListNode[]) => {
        const steps: ListNode[][] = [initialNodes];
        const list = [...initialNodes];

        // First step: Show initial list
        steps.push(JSON.parse(JSON.stringify(list)));

        switch (operation) {
            case 'linkedlist-insert': {
                // Insert node after position 2
                const insertIndex = 2;
                const newValue = 35;

                // Highlight the node where we'll insert after
                const highlightStep = list.map((node, idx) => ({
                    ...node,
                    isHighlighted: idx === insertIndex,
                    isPointerActive: idx === insertIndex
                }));
                steps.push(JSON.parse(JSON.stringify(highlightStep)));

                // Create new node
                const newNode: ListNode = {
                    value: newValue,
                    isActive: false,
                    isHighlighted: false,
                    isNew: true,
                    isDeleting: false,
                    isHead: false,
                    isTail: false,
                    isPointerActive: true
                };

                // Insert the new node
                list.splice(insertIndex + 1, 0, newNode);
                list[insertIndex].isPointerActive = true;
                steps.push(JSON.parse(JSON.stringify(list)));

                // Update pointers
                list.forEach((node, idx) => {
                    node.isTail = idx === list.length - 1;
                    node.isNew = false;
                    node.isHighlighted = false;
                    node.isPointerActive = false;
                });
                steps.push(JSON.parse(JSON.stringify(list)));
                break;
            }

            case 'linkedlist-delete': {
                // Delete node at position 2
                const deleteIndex = 2;

                // Highlight the node to delete and update pointers
                const highlightStep = list.map((node, idx) => ({
                    ...node,
                    isHighlighted: idx === deleteIndex,
                    isPointerActive: idx === deleteIndex - 1 || idx === deleteIndex
                }));
                steps.push(JSON.parse(JSON.stringify(highlightStep)));

                // Show the node being deleted
                list[deleteIndex].isDeleting = true;
                steps.push(JSON.parse(JSON.stringify(list)));

                // Remove the node and update pointers
                list.splice(deleteIndex, 1);
                list.forEach((node, idx) => {
                    node.isTail = idx === list.length - 1;
                    node.isHighlighted = false;
                    node.isPointerActive = false;
                });
                steps.push(JSON.parse(JSON.stringify(list)));
                break;
            }

            case 'linkedlist-search': {
                // Search for value 30
                const searchValue = 30;

                // Traverse the list
                for (let i = 0; i < list.length; i++) {
                    // Highlight current node being checked
                    list.forEach((node, idx) => {
                        node.isHighlighted = idx === i;
                        node.isActive = idx < i && node.value !== searchValue;
                        node.isPointerActive = idx === i - 1;
                    });
                    steps.push(JSON.parse(JSON.stringify(list)));

                    if (list[i].value === searchValue) {
                        // Found the node
                        list[i].isActive = true;
                        list[i].isHighlighted = false;
                        if (i > 0) list[i - 1].isPointerActive = true;
                        steps.push(JSON.parse(JSON.stringify(list)));
                        break;
                    }
                }

                // Reset pointers
                list.forEach(node => {
                    node.isPointerActive = false;
                });
                steps.push(JSON.parse(JSON.stringify(list)));
                break;
            }

            case 'linkedlist-update': {
                // Update node at position 3
                const updateIndex = 3;
                const newValue = 45;

                // Traverse to the node
                for (let i = 0; i <= updateIndex; i++) {
                    list.forEach((node, idx) => {
                        node.isHighlighted = idx === i;
                        node.isPointerActive = idx === i - 1;
                    });
                    steps.push(JSON.parse(JSON.stringify(list)));
                }

                // Update the value
                list[updateIndex].value = newValue;
                list[updateIndex].isNew = true;
                list[updateIndex].isHighlighted = false;
                steps.push(JSON.parse(JSON.stringify(list)));

                // Reset states
                list.forEach(node => {
                    node.isNew = false;
                    node.isHighlighted = false;
                    node.isPointerActive = false;
                });
                steps.push(JSON.parse(JSON.stringify(list)));
                break;
            }

            default:
                console.warn('Unknown operation:', operation);
                break;
        }

        console.log('Generated steps:', steps.length);
        setOperationSteps(steps);
        onStepsChange(steps.length);
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-4">
            <div className="flex items-center gap-6">
                {nodes.map((node, index) => (
                    <div key={index} className="relative">
                        {/* Node */}
                        <div
                            className={`
                                relative flex flex-col items-center
                                transition-all duration-200 transform
                                ${node.isHighlighted ? 'scale-110' : ''}
                                ${node.isDeleting ? 'opacity-50 scale-90' : ''}
                            `}
                        >
                            {/* Node Box */}
                            <div className={`
                                flex flex-col
                                w-24 rounded-md border-2
                                transition-all duration-200
                                ${node.isHighlighted ? 'ring-2 ring-yellow-400' : ''}
                                ${node.isActive ? 'border-green-500' :
                                    theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}
                                ${node.isNew ? 'animate-bounce border-blue-500' : ''}
                                ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
                            `}>
                                {/* Value Section */}
                                <div className="p-2 border-b-2 border-dashed border-inherit">
                                    <span className={`
                                        font-mono text-lg
                                        ${node.isNew ? 'text-blue-500 font-bold' : ''}
                                        ${node.isActive ? 'text-green-500' : ''}
                                        ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
                                    `}>
                                        {node.value}
                                    </span>
                                </div>
                                {/* Next Section */}
                                <div className="p-2 text-xs text-center text-gray-500">
                                    next
                                </div>
                            </div>

                            {/* Head/Tail Labels */}
                            <div className="absolute -top-6 left-0 right-0 text-center">
                                {node.isHead && (
                                    <span className="text-xs text-blue-500 font-semibold">Head</span>
                                )}
                            </div>
                            <div className="absolute -bottom-6 left-0 right-0 text-center">
                                {node.isTail && (
                                    <span className="text-xs text-blue-500 font-semibold">Tail</span>
                                )}
                            </div>
                        </div>

                        {/* Pointer Arrow */}
                        {!node.isTail && (
                            <div className={`
                                absolute top-1/2 -right-6 w-6 h-0.5
                                transform translate-x-full
                                transition-all duration-200
                                ${node.isPointerActive ? 'bg-yellow-400' :
                                    theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}
                            `}>
                                <div className={`
                                    absolute right-0 top-1/2 transform -translate-y-1/2
                                    w-2 h-2 border-t-2 border-r-2 rotate-45
                                    ${node.isPointerActive ? 'border-yellow-400' :
                                        theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}
                                `} />
                            </div>
                        )}
                        {node.isTail && (
                            <div className={`
                                absolute top-1/2 -right-4 
                                transform translate-x-full
                                transition-all duration-200
                                ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}
                            `}>
                                NULL
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {nodes.length === 0 && (
                <div className="text-center text-gray-500">
                    Empty linked list
                </div>
            )}
        </div>
    );
};

export default LinkedListVisualizer; 
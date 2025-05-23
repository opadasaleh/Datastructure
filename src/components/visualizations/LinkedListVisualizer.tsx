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
            {/* Game-like Header */}
            <div className="mb-8 text-center">
                <h3 className="text-2xl font-bold mb-2 text-blue-600">
                    {operation === 'linked-list-insert' && '🎮 Adding a New Box'}
                    {operation === 'linked-list-delete' && '🎮 Removing a Box'}
                    {operation === 'linked-list-search' && '🔍 Finding a Number'}
                    {operation === 'linked-list-update' && '✏️ Changing a Number'}
                </h3>

                {/* Simple Story-like Explanation */}
                <div className="text-lg mb-4">
                    {operation === 'linked-list-insert' && (
                        <div className="space-y-2">
                            <p>🌟 Let's add a new box to our chain!</p>
                            <p>Step {currentStep + 1}: {
                                currentStep === 0 ? "Here's our chain of boxes" :
                                    currentStep === 1 ? "Finding the perfect spot for our new box" :
                                        currentStep === 2 ? "Creating a shiny new box" :
                                            currentStep === 3 ? "Connecting our new box to the chain" :
                                                "✨ All done! Our new box is part of the chain"
                            }</p>
                        </div>
                    )}
                    {operation === 'linked-list-delete' && (
                        <div className="space-y-2">
                            <p>🗑️ Let's remove a box from our chain!</p>
                            <p>Step {currentStep + 1}: {
                                currentStep === 0 ? "Here's our chain of boxes" :
                                    currentStep === 1 ? "Finding the box we want to remove" :
                                        currentStep === 2 ? "Taking out the box" :
                                            "✨ All done! The chain is connected again"
                            }</p>
                        </div>
                    )}
                    {operation === 'linked-list-search' && (
                        <div className="space-y-2">
                            <p>🔍 Let's find a number in our chain!</p>
                            <p>Step {currentStep + 1}: {
                                currentStep === 0 ? "Starting from the first box" :
                                    currentStep === 1 ? "Looking through each box" :
                                        currentStep === 2 ? "🎯 Found it! The number is in this box" :
                                            "✨ Search complete!"
                            }</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Simple Color Guide */}
            <div className="mb-8 flex gap-6 text-lg">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 border-2 border-blue-500 animate-bounce"></div>
                    <span>New Box</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 border-2 border-yellow-400"></div>
                    <span>Looking Here</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 border-2 border-green-500"></div>
                    <span>Found It!</span>
                </div>
            </div>

            {/* The Chain of Boxes */}
            <div className="flex items-center gap-6">
                {nodes.map((node, index) => (
                    <div key={index} className="relative">
                        {/* Box */}
                        <div
                            className={`
                                relative flex flex-col items-center
                                transition-all duration-200 transform
                                ${node.isHighlighted ? 'scale-110' : ''}
                                ${node.isDeleting ? 'opacity-50 scale-90' : ''}
                            `}
                        >
                            {/* Box Design */}
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
                                {/* Number Inside Box */}
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
                                {/* Next Pointer Section */}
                                <div className="p-2 text-xs text-center">
                                    <div className="text-gray-500 mb-1">Points to:</div>
                                    <div className={`
                                        px-2 py-1 rounded
                                        ${node.isPointerActive ? 'bg-yellow-100 text-yellow-800' :
                                            theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}
                                    `}>
                                        {node.isTail ? 'Nothing (End)' : 'Next Box →'}
                                    </div>
                                </div>
                            </div>

                            {/* Head/Tail Labels */}
                            <div className="absolute -top-6 left-0 right-0 text-center">
                                {node.isHead && (
                                    <span className="text-sm text-blue-500 font-semibold">Start Here</span>
                                )}
                            </div>
                            <div className="absolute -bottom-6 left-0 right-0 text-center">
                                {node.isTail && (
                                    <span className="text-sm text-blue-500 font-semibold">End Here</span>
                                )}
                            </div>
                        </div>

                        {/* Arrow to Next Box */}
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
                                The End
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {nodes.length === 0 && (
                <div className="text-center text-gray-500 text-lg">
                    No boxes in the chain yet
                </div>
            )}
        </div>
    );
};

export default LinkedListVisualizer; 
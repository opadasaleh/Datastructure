import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useVisualization } from '../../contexts/VisualizationContext';

interface ListNode {
    value: number;
    isActive: boolean;
    isHighlighted: boolean;
    isNew: boolean;
    isDeleting: boolean;
    isTraversing: boolean;
    isTarget: boolean;
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
    const [operationSteps, setOperationSteps] = useState<any[]>([]);
    const [currentPointer, setCurrentPointer] = useState<number | null>(null);

    useEffect(() => {
        const initialSize = 4;
        const newNodes: ListNode[] = Array.from({ length: initialSize }, (_, index) => ({
            value: (index + 1) * 10,
            isActive: false,
            isHighlighted: false,
            isNew: false,
            isDeleting: false,
            isTraversing: false,
            isTarget: false
        }));
        setNodes(newNodes);
        generateOperationSteps(newNodes);
    }, [operation]);

    useEffect(() => {
        if (operationSteps[currentStep]) {
            setNodes(operationSteps[currentStep].nodes);
            setCurrentPointer(operationSteps[currentStep].pointer || null);
        }
    }, [currentStep, operationSteps]);

    const generateOperationSteps = (initialNodes: ListNode[]) => {
        const steps: any[] = [];
        
        // Initial state
        steps.push({
            nodes: JSON.parse(JSON.stringify(initialNodes)),
            pointer: null,
            title: 'Initial State',
            description: 'Starting with our linked list. Each node contains data and a pointer to the next node.',
            explanation: 'A linked list is a linear data structure where elements are stored in nodes. Each node contains data and a reference (pointer) to the next node in the sequence.'
        });

        switch (operation) {
            case 'linkedlist-insert': {
                const insertPosition = 2;
                const newValue = 25;
                let list = JSON.parse(JSON.stringify(initialNodes));

                // Step 1: Start traversal
                steps.push({
                    nodes: JSON.parse(JSON.stringify(list)),
                    pointer: 0,
                    title: 'Step 1: Start Traversal',
                    description: 'Begin at the head of the list to find the insertion position.',
                    explanation: 'To insert at position 2, we need to traverse to position 1 (the node before our target position).'
                });

                // Step 2: Traverse to position
                for (let i = 0; i < insertPosition; i++) {
                    if (i > 0) {
                        list[i - 1].isTraversing = false;
                    }
                    if (i < list.length) {
                        list[i].isTraversing = true;
                    }
                    
                    steps.push({
                        nodes: JSON.parse(JSON.stringify(list)),
                        pointer: i,
                        title: `Step ${steps.length}: Traverse to Position ${i}`,
                        description: `Moving through the list. Currently at node ${i} with value ${list[i]?.value || 'N/A'}.`,
                        explanation: i === insertPosition - 1 
                            ? 'Found the position! This is where we\'ll insert our new node.'
                            : 'Keep moving through the list to find the correct insertion point.'
                    });
                }

                // Step 3: Highlight insertion point
                list[insertPosition - 1].isHighlighted = true;
                list[insertPosition - 1].isTraversing = false;
                steps.push({
                    nodes: JSON.parse(JSON.stringify(list)),
                    pointer: insertPosition - 1,
                    title: `Step ${steps.length}: Found Insertion Point`,
                    description: `Found the node before our insertion position. We'll insert after this node.`,
                    explanation: 'We need to insert the new node between this node and the next one. This requires updating pointer connections.'
                });

                // Step 4: Create new node
                const newNode: ListNode = {
                    value: newValue,
                    isActive: false,
                    isHighlighted: false,
                    isNew: true,
                    isDeleting: false,
                    isTraversing: false,
                    isTarget: false
                };

                list.splice(insertPosition, 0, newNode);
                steps.push({
                    nodes: JSON.parse(JSON.stringify(list)),
                    pointer: insertPosition,
                    title: `Step ${steps.length}: Create New Node`,
                    description: `Created new node with value ${newValue}. Now connecting it to the list.`,
                    explanation: 'The new node is created and inserted. The previous node now points to our new node, and our new node points to what was previously the next node.'
                });

                // Step 5: Update connections
                list[insertPosition - 1].isHighlighted = false;
                list[insertPosition].isNew = false;
                list[insertPosition].isActive = true;
                steps.push({
                    nodes: JSON.parse(JSON.stringify(list)),
                    pointer: null,
                    title: `Step ${steps.length}: Update Connections`,
                    description: 'Pointer connections updated. The new node is now part of the linked list.',
                    explanation: 'Insertion complete! The linked list now has the new node properly connected in the sequence.'
                });

                // Step 6: Final state
                list[insertPosition].isActive = false;
                steps.push({
                    nodes: JSON.parse(JSON.stringify(list)),
                    pointer: null,
                    title: 'Insertion Complete',
                    description: 'The new node has been successfully inserted into the linked list.',
                    explanation: 'The linked list now contains the new element. All pointer connections are properly maintained.'
                });
                break;
            }

            case 'linkedlist-delete': {
                const deletePosition = 2;
                let list = JSON.parse(JSON.stringify(initialNodes));

                // Step 1: Start traversal
                steps.push({
                    nodes: JSON.parse(JSON.stringify(list)),
                    pointer: 0,
                    title: 'Step 1: Start Traversal',
                    description: 'Begin at the head to find the node to delete.',
                    explanation: 'To delete a node, we need to find it first and update the previous node\'s pointer to skip over it.'
                });

                // Step 2: Traverse to find node
                for (let i = 0; i <= deletePosition; i++) {
                    if (i > 0) {
                        list[i - 1].isTraversing = false;
                    }
                    if (i < list.length) {
                        list[i].isTraversing = true;
                    }
                    
                    steps.push({
                        nodes: JSON.parse(JSON.stringify(list)),
                        pointer: i,
                        title: `Step ${steps.length}: Traverse to Position ${i}`,
                        description: `Currently at node ${i}${i === deletePosition ? ' - This is our target!' : ''}`,
                        explanation: i === deletePosition 
                            ? 'Found the node to delete! Now we need to update the previous node\'s pointer.'
                            : 'Continuing to search for the node to delete.'
                    });
                }

                // Step 3: Mark for deletion
                list[deletePosition].isTraversing = false;
                list[deletePosition].isTarget = true;
                if (deletePosition > 0) {
                    list[deletePosition - 1].isHighlighted = true;
                }
                steps.push({
                    nodes: JSON.parse(JSON.stringify(list)),
                    pointer: deletePosition,
                    title: `Step ${steps.length}: Mark Node for Deletion`,
                    description: `Node with value ${list[deletePosition].value} marked for deletion.`,
                    explanation: 'Before deleting, we need to update the previous node to point to the next node, effectively skipping over the node to be deleted.'
                });

                // Step 4: Update pointer connections
                list[deletePosition].isDeleting = true;
                list[deletePosition].isTarget = false;
                if (deletePosition > 0) {
                    list[deletePosition - 1].isHighlighted = false;
                    list[deletePosition - 1].isActive = true;
                }
                steps.push({
                    nodes: JSON.parse(JSON.stringify(list)),
                    pointer: deletePosition - 1,
                    title: `Step ${steps.length}: Update Connections`,
                    description: 'Updating the previous node to skip over the deleted node.',
                    explanation: 'The previous node now points directly to the next node, bypassing the node we want to delete.'
                });

                // Step 5: Remove node
                list.splice(deletePosition, 1);
                if (deletePosition > 0 && deletePosition - 1 < list.length) {
                    list[deletePosition - 1].isActive = false;
                }
                steps.push({
                    nodes: JSON.parse(JSON.stringify(list)),
                    pointer: null,
                    title: `Step ${steps.length}: Remove Node`,
                    description: 'Node successfully removed from the linked list.',
                    explanation: 'The node has been deleted and removed from memory. The linked list maintains its integrity with updated pointer connections.'
                });

                // Step 6: Final state
                steps.push({
                    nodes: JSON.parse(JSON.stringify(list)),
                    pointer: null,
                    title: 'Deletion Complete',
                    description: 'The node has been successfully deleted from the linked list.',
                    explanation: 'Deletion complete! The linked list now has one fewer node, and all remaining connections are properly maintained.'
                });
                break;
            }

            case 'linkedlist-search': {
                const searchValue = 30;
                let list = JSON.parse(JSON.stringify(initialNodes));

                // Step 1: Start search
                steps.push({
                    nodes: JSON.parse(JSON.stringify(list)),
                    pointer: 0,
                    title: 'Step 1: Start Search',
                    description: `Looking for value ${searchValue}. Starting at the head of the list.`,
                    explanation: 'Linear search in a linked list requires traversing from the head node until we find the target value or reach the end.'
                });

                // Step 2: Traverse and search
                for (let i = 0; i < list.length; i++) {
                    // Clear previous highlighting
                    if (i > 0) {
                        list[i - 1].isTraversing = false;
                        list[i - 1].isActive = true;
                    }
                    
                    // Highlight current node
                    list[i].isTraversing = true;
                    
                    steps.push({
                        nodes: JSON.parse(JSON.stringify(list)),
                        pointer: i,
                        title: `Step ${steps.length}: Check Node ${i}`,
                        description: `Checking node with value ${list[i].value}. ${list[i].value === searchValue ? 'Found it!' : 'Not a match, continue searching.'}`,
                        explanation: list[i].value === searchValue 
                            ? `Success! Found the target value ${searchValue} at position ${i}.`
                            : `Value ${list[i].value} doesn't match our target ${searchValue}. Move to the next node.`
                    });

                    if (list[i].value === searchValue) {
                        // Found the target
                        list[i].isTraversing = false;
                        list[i].isTarget = true;
                        steps.push({
                            nodes: JSON.parse(JSON.stringify(list)),
                            pointer: i,
                            title: `Step ${steps.length}: Target Found!`,
                            description: `Successfully found value ${searchValue} at position ${i}.`,
                            explanation: 'Search complete! The target value has been located in the linked list.'
                        });
                        break;
                    }
                }

                // Final state
                steps.push({
                    nodes: JSON.parse(JSON.stringify(list)),
                    pointer: null,
                    title: 'Search Complete',
                    description: `Search operation finished. Value ${searchValue} was found in the list.`,
                    explanation: 'The linear search successfully located the target value by traversing through the linked list nodes sequentially.'
                });
                break;
            }

            case 'linkedlist-update': {
                const updatePosition = 2;
                const newValue = 35;
                let list = JSON.parse(JSON.stringify(initialNodes));

                // Step 1: Start traversal
                steps.push({
                    nodes: JSON.parse(JSON.stringify(list)),
                    pointer: 0,
                    title: 'Step 1: Start Traversal',
                    description: `Looking for position ${updatePosition} to update the value.`,
                    explanation: 'To update a node, we first need to traverse to the correct position in the linked list.'
                });

                // Step 2: Traverse to position
                for (let i = 0; i <= updatePosition; i++) {
                    if (i > 0) {
                        list[i - 1].isTraversing = false;
                        list[i - 1].isActive = true;
                    }
                    if (i < list.length) {
                        list[i].isTraversing = true;
                    }
                    
                    steps.push({
                        nodes: JSON.parse(JSON.stringify(list)),
                        pointer: i,
                        title: `Step ${steps.length}: Traverse to Position ${i}`,
                        description: `Currently at position ${i}${i === updatePosition ? ' - This is our target position!' : ''}`,
                        explanation: i === updatePosition 
                            ? 'Found the node to update! Now we can change its value.'
                            : 'Continuing to traverse to find the correct position.'
                    });
                }

                // Step 3: Highlight target node
                list[updatePosition].isTraversing = false;
                list[updatePosition].isHighlighted = true;
                steps.push({
                    nodes: JSON.parse(JSON.stringify(list)),
                    pointer: updatePosition,
                    title: `Step ${steps.length}: Target Node Found`,
                    description: `Found the node at position ${updatePosition} with current value ${list[updatePosition].value}.`,
                    explanation: 'This is the node we want to update. We can directly modify its value since we have access to it.'
                });

                // Step 4: Update value
                list[updatePosition].value = newValue;
                list[updatePosition].isHighlighted = false;
                list[updatePosition].isNew = true;
                steps.push({
                    nodes: JSON.parse(JSON.stringify(list)),
                    pointer: updatePosition,
                    title: `Step ${steps.length}: Update Value`,
                    description: `Updated the node's value to ${newValue}.`,
                    explanation: 'The node\'s value has been successfully updated. The structure of the linked list remains unchanged.'
                });

                // Step 5: Final state
                list[updatePosition].isNew = false;
                steps.push({
                    nodes: JSON.parse(JSON.stringify(list)),
                    pointer: null,
                    title: 'Update Complete',
                    description: `Node value successfully updated to ${newValue}.`,
                    explanation: 'Update operation complete! The node now contains the new value while maintaining all pointer connections.'
                });
                break;
            }
        }

        setOperationSteps(steps);
        onStepsChange(steps.length);
    };

    const currentStepData = operationSteps[currentStep] || {};

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8">
            {/* Operation Title */}
            <h3 className="text-2xl font-bold mb-4 text-center">
                {operation === 'linkedlist-insert' && 'Linked List Insertion'}
                {operation === 'linkedlist-delete' && 'Linked List Deletion'}
                {operation === 'linkedlist-search' && 'Linked List Search'}
                {operation === 'linkedlist-update' && 'Linked List Update'}
            </h3>

            {/* Current Step Info */}
            <div className={`
                mb-6 p-4 rounded-lg text-center max-w-2xl
                ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}
            `}>
                <h4 className="text-lg font-semibold mb-2">{currentStepData.title}</h4>
                <p className="text-sm mb-2">{currentStepData.description}</p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {currentStepData.explanation}
                </p>
            </div>

            {/* Linked list visualization */}
            <div className="flex items-center gap-4 mb-8" style={{ transform: `scale(${size})` }}>
                {/* Head pointer */}
                <div className="text-center">
                    <div className="text-sm font-bold mb-2">HEAD</div>
                    <div className="text-2xl">↓</div>
                </div>

                {nodes.map((node, index) => (
                    <div key={index} className="flex items-center">
                        {/* Node */}
                        <div className="relative">
                            {/* Current pointer indicator */}
                            {currentPointer === index && (
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                    <div className="text-xs font-bold text-blue-500">CURRENT</div>
                                    <div className="text-blue-500">↓</div>
                                </div>
                            )}
                            
                            <div
                                className={`
                                    flex items-center justify-center
                                    w-20 h-16 border-2 font-bold text-lg rounded-lg
                                    transition-all duration-500
                                    ${node.isHighlighted ? 'border-yellow-400 bg-yellow-100 dark:bg-yellow-900 shadow-lg' : ''}
                                    ${node.isActive ? 'border-green-400 bg-green-100 dark:bg-green-900 shadow-lg' : ''}
                                    ${node.isNew ? 'border-blue-400 bg-blue-100 dark:bg-blue-900 animate-pulse shadow-lg' : ''}
                                    ${node.isDeleting ? 'opacity-50 scale-90 border-red-400 bg-red-100 dark:bg-red-900' : ''}
                                    ${node.isTraversing ? 'border-purple-400 bg-purple-100 dark:bg-purple-900 shadow-lg animate-pulse' : ''}
                                    ${node.isTarget ? 'border-green-500 bg-green-200 dark:bg-green-800 shadow-xl' : ''}
                                    ${!node.isHighlighted && !node.isActive && !node.isNew && !node.isTraversing && !node.isTarget ? 
                                        (theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-white') : ''}
                                `}
                            >
                                <div className="text-center">
                                    <div className="text-lg">{node.value}</div>
                                    <div className="text-xs text-gray-500">data</div>
                                </div>
                            </div>
                            
                            {/* Node index */}
                            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
                                [{index}]
                            </div>
                        </div>

                        {/* Arrow to next node */}
                        {index < nodes.length - 1 && (
                            <div className="mx-3 flex flex-col items-center">
                                <div className="text-xs text-gray-500 mb-1">next</div>
                                <div className="text-2xl text-gray-400">→</div>
                            </div>
                        )}

                        {/* NULL pointer for last node */}
                        {index === nodes.length - 1 && (
                            <div className="mx-3 flex flex-col items-center">
                                <div className="text-xs text-gray-500 mb-1">next</div>
                                <div className="text-lg text-gray-400">→ NULL</div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 text-xs">
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-purple-400 bg-purple-100 dark:bg-purple-900 rounded"></div>
                    <span>Traversing</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-yellow-400 bg-yellow-100 dark:bg-yellow-900 rounded"></div>
                    <span>Highlighted</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-blue-400 bg-blue-100 dark:bg-blue-900 rounded"></div>
                    <span>New/Modified</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-green-500 bg-green-200 dark:bg-green-800 rounded"></div>
                    <span>Target Found</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-red-400 bg-red-100 dark:bg-red-900 rounded opacity-50"></div>
                    <span>Deleting</span>
                </div>
            </div>

            {/* Progress indicator */}
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Step {currentStep + 1} of {operationSteps.length}
                </p>
            </div>
        </div>
    );
};

export default LinkedListVisualizer;
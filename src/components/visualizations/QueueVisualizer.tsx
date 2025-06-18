import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useVisualization } from '../../contexts/VisualizationContext';

interface QueueElement {
    value: number;
    isActive: boolean;
    isHighlighted: boolean;
    isNew: boolean;
    isDeleting: boolean;
    isFront: boolean;
    isRear: boolean;
    isSearching: boolean;
    isFound: boolean;
}

interface QueueVisualizerProps {
    operation: string;
    currentStep: number;
    onStepsChange: (totalSteps: number) => void;
    speed: number;
}

const QueueVisualizer: React.FC<QueueVisualizerProps> = ({
    operation,
    currentStep,
    onStepsChange,
    speed
}) => {
    const { theme } = useTheme();
    const { size } = useVisualization();
    const [elements, setElements] = useState<QueueElement[]>([]);
    const [operationSteps, setOperationSteps] = useState<any[]>([]);
    const [queueInfo, setQueueInfo] = useState({ front: 0, rear: -1, size: 0 });

    useEffect(() => {
        const initialSize = 4;
        const newElements: QueueElement[] = Array.from({ length: initialSize }, (_, index) => ({
            value: (index + 1) * 10,
            isActive: false,
            isHighlighted: false,
            isNew: false,
            isDeleting: false,
            isFront: index === 0,
            isRear: index === initialSize - 1,
            isSearching: false,
            isFound: false
        }));
        setElements(newElements);
        setQueueInfo({ front: 0, rear: initialSize - 1, size: initialSize });
        generateOperationSteps(newElements);
    }, [operation]);

    useEffect(() => {
        if (operationSteps[currentStep]) {
            setElements(operationSteps[currentStep].elements);
            setQueueInfo(operationSteps[currentStep].queueInfo);
        }
    }, [currentStep, operationSteps]);

    const generateOperationSteps = (initialQueue: QueueElement[]) => {
        const steps: any[] = [];
        
        // Initial state
        steps.push({
            elements: JSON.parse(JSON.stringify(initialQueue)),
            queueInfo: { front: 0, rear: initialQueue.length - 1, size: initialQueue.length },
            title: 'Initial Queue State',
            description: 'Starting with our queue. Elements are arranged in FIFO (First In, First Out) order.',
            explanation: 'A queue is a linear data structure that follows FIFO principle. Elements are added at the rear and removed from the front.',
            concept: 'Queue follows FIFO: First element added is the first to be removed.'
        });

        switch (operation) {
            case 'queue-enqueue': {
                const newValue = 50;
                let queue = JSON.parse(JSON.stringify(initialQueue));
                let info = { front: 0, rear: initialQueue.length - 1, size: initialQueue.length };

                // Step 1: Check queue capacity
                steps.push({
                    elements: JSON.parse(JSON.stringify(queue)),
                    queueInfo: { ...info },
                    title: 'Step 1: Check Queue Capacity',
                    description: 'Before adding an element, we check if the queue has space.',
                    explanation: 'In a real implementation, we would check if the queue is full. Here we assume there\'s space available.',
                    concept: 'Always check capacity before enqueue to prevent overflow.'
                });

                // Step 2: Highlight rear position
                queue[info.rear].isHighlighted = true;
                steps.push({
                    elements: JSON.parse(JSON.stringify(queue)),
                    queueInfo: { ...info },
                    title: 'Step 2: Locate Rear Position',
                    description: `Current rear is at position ${info.rear}. New element will be added after this.`,
                    explanation: 'The rear pointer indicates where the last element was added. New elements are always added after the rear.',
                    concept: 'Rear pointer tracks the last element in the queue.'
                });

                // Step 3: Move rear pointer
                queue[info.rear].isHighlighted = false;
                queue[info.rear].isRear = false;
                info.rear++;
                info.size++;
                
                const newElement: QueueElement = {
                    value: newValue,
                    isActive: false,
                    isHighlighted: false,
                    isNew: true,
                    isDeleting: false,
                    isFront: false,
                    isRear: true,
                    isSearching: false,
                    isFound: false
                };

                queue.push(newElement);
                steps.push({
                    elements: JSON.parse(JSON.stringify(queue)),
                    queueInfo: { ...info },
                    title: 'Step 3: Add New Element',
                    description: `Added element ${newValue} at the rear. Rear pointer updated to position ${info.rear}.`,
                    explanation: 'The new element is placed at the rear position, and the rear pointer is incremented to point to this new element.',
                    concept: 'Enqueue adds element at rear and updates rear pointer.'
                });

                // Step 4: Update queue state
                queue[info.rear].isNew = false;
                steps.push({
                    elements: JSON.parse(JSON.stringify(queue)),
                    queueInfo: { ...info },
                    title: 'Step 4: Update Queue State',
                    description: 'Queue size increased. The new element is now part of the queue.',
                    explanation: 'The enqueue operation is complete. The queue now has one more element, and all pointers are properly updated.',
                    concept: 'Queue size increases by 1 after successful enqueue.'
                });

                // Step 5: Final state
                steps.push({
                    elements: JSON.parse(JSON.stringify(queue)),
                    queueInfo: { ...info },
                    title: 'Enqueue Complete',
                    description: `Element ${newValue} successfully added to the queue.`,
                    explanation: 'Enqueue operation finished. The queue maintains FIFO order with the new element at the rear.',
                    concept: 'New elements always join at the rear of the queue.'
                });
                break;
            }

            case 'queue-dequeue': {
                let queue = JSON.parse(JSON.stringify(initialQueue));
                let info = { front: 0, rear: initialQueue.length - 1, size: initialQueue.length };

                // Step 1: Check if queue is empty
                steps.push({
                    elements: JSON.parse(JSON.stringify(queue)),
                    queueInfo: { ...info },
                    title: 'Step 1: Check Queue Status',
                    description: 'Before removing an element, check if the queue is empty.',
                    explanation: 'We must verify the queue has elements before attempting to dequeue. Empty queue dequeue would cause an error.',
                    concept: 'Always check if queue is empty before dequeue.'
                });

                // Step 2: Highlight front element
                queue[info.front].isHighlighted = true;
                steps.push({
                    elements: JSON.parse(JSON.stringify(queue)),
                    queueInfo: { ...info },
                    title: 'Step 2: Identify Front Element',
                    description: `Front element with value ${queue[info.front].value} will be removed.`,
                    explanation: 'The front pointer indicates which element will be removed. In FIFO, the oldest element (first in) is removed first.',
                    concept: 'Front pointer identifies the next element to be removed.'
                });

                // Step 3: Mark for removal
                queue[info.front].isHighlighted = false;
                queue[info.front].isDeleting = true;
                steps.push({
                    elements: JSON.parse(JSON.stringify(queue)),
                    queueInfo: { ...info },
                    title: 'Step 3: Mark Element for Removal',
                    description: 'Preparing to remove the front element from the queue.',
                    explanation: 'The element is marked for deletion. In a real implementation, we would save its value to return to the caller.',
                    concept: 'Dequeue returns the value of the removed element.'
                });

                // Step 4: Remove element and update front
                const removedValue = queue[info.front].value;
                queue.shift();
                info.front = 0; // Reset front to 0 after removal
                info.size--;
                
                if (queue.length > 0) {
                    queue[0].isFront = true;
                }
                if (queue.length > 0) {
                    queue[queue.length - 1].isRear = true;
                }

                steps.push({
                    elements: JSON.parse(JSON.stringify(queue)),
                    queueInfo: { ...info },
                    title: 'Step 4: Remove Element',
                    description: `Element ${removedValue} removed. Front pointer updated to next element.`,
                    explanation: 'The front element is removed from the queue. The front pointer now points to what was previously the second element.',
                    concept: 'After dequeue, the next element becomes the new front.'
                });

                // Step 5: Update queue state
                steps.push({
                    elements: JSON.parse(JSON.stringify(queue)),
                    queueInfo: { ...info },
                    title: 'Step 5: Update Queue State',
                    description: 'Queue size decreased. All remaining elements maintain their relative order.',
                    explanation: 'The dequeue operation is complete. The queue is smaller but maintains FIFO ordering for remaining elements.',
                    concept: 'Queue size decreases by 1 after successful dequeue.'
                });

                // Step 6: Final state
                steps.push({
                    elements: JSON.parse(JSON.stringify(queue)),
                    queueInfo: { ...info },
                    title: 'Dequeue Complete',
                    description: `Successfully removed element ${removedValue} from the front of the queue.`,
                    explanation: 'Dequeue operation finished. The oldest element has been removed, maintaining FIFO principle.',
                    concept: 'Dequeue always removes the oldest element in the queue.'
                });
                break;
            }

            case 'queue-peek': {
                let queue = JSON.parse(JSON.stringify(initialQueue));
                let info = { front: 0, rear: initialQueue.length - 1, size: initialQueue.length };

                // Step 1: Check queue status
                steps.push({
                    elements: JSON.parse(JSON.stringify(queue)),
                    queueInfo: { ...info },
                    title: 'Step 1: Check Queue Status',
                    description: 'Verify the queue is not empty before peeking.',
                    explanation: 'Peek operation requires at least one element in the queue. Empty queue peek would cause an error.',
                    concept: 'Always verify queue has elements before peek operation.'
                });

                // Step 2: Highlight front element
                queue[info.front].isHighlighted = true;
                steps.push({
                    elements: JSON.parse(JSON.stringify(queue)),
                    queueInfo: { ...info },
                    title: 'Step 2: Locate Front Element',
                    description: `Front element is at position ${info.front} with value ${queue[info.front].value}.`,
                    explanation: 'The front pointer indicates which element we can peek at. This is the element that would be removed next.',
                    concept: 'Peek shows the front element without removing it.'
                });

                // Step 3: Access front value
                queue[info.front].isHighlighted = false;
                queue[info.front].isActive = true;
                steps.push({
                    elements: JSON.parse(JSON.stringify(queue)),
                    queueInfo: { ...info },
                    title: 'Step 3: Access Front Value',
                    description: `Reading value ${queue[info.front].value} from the front element.`,
                    explanation: 'We access the value of the front element without modifying the queue structure. The element remains in the queue.',
                    concept: 'Peek is a read-only operation that doesn\'t modify the queue.'
                });

                // Step 4: Return value
                queue[info.front].isActive = false;
                steps.push({
                    elements: JSON.parse(JSON.stringify(queue)),
                    queueInfo: { ...info },
                    title: 'Step 4: Return Value',
                    description: `Peek operation returns ${queue[info.front].value}. Queue remains unchanged.`,
                    explanation: 'The peek operation is complete. We have the front value, but the queue structure is exactly the same as before.',
                    concept: 'Peek returns front value without changing queue state.'
                });

                // Step 5: Final state
                steps.push({
                    elements: JSON.parse(JSON.stringify(queue)),
                    queueInfo: { ...info },
                    title: 'Peek Complete',
                    description: `Successfully viewed front element value ${queue[info.front].value}.`,
                    explanation: 'Peek operation finished. The queue is unchanged, but we now know the value of the front element.',
                    concept: 'Peek is useful for checking the next element without removing it.'
                });
                break;
            }

            case 'queue-search': {
                const searchValue = 30;
                let queue = JSON.parse(JSON.stringify(initialQueue));
                let info = { front: 0, rear: initialQueue.length - 1, size: initialQueue.length };

                // Step 1: Start search
                steps.push({
                    elements: JSON.parse(JSON.stringify(queue)),
                    queueInfo: { ...info },
                    title: 'Step 1: Initialize Search',
                    description: `Searching for value ${searchValue} in the queue.`,
                    explanation: 'Queue search requires checking each element from front to rear. This is a linear search operation.',
                    concept: 'Queue search examines elements in FIFO order.'
                });

                // Step 2: Search through elements
                for (let i = 0; i < queue.length; i++) {
                    // Clear previous highlighting
                    if (i > 0) {
                        queue[i - 1].isSearching = false;
                        queue[i - 1].isActive = true;
                    }
                    
                    // Highlight current element
                    queue[i].isSearching = true;
                    
                    steps.push({
                        elements: JSON.parse(JSON.stringify(queue)),
                        queueInfo: { ...info },
                        title: `Step ${steps.length}: Check Position ${i}`,
                        description: `Examining element at position ${i} with value ${queue[i].value}.`,
                        explanation: queue[i].value === searchValue 
                            ? `Found the target value ${searchValue}! Search is successful.`
                            : `Value ${queue[i].value} doesn't match target ${searchValue}. Continue searching.`,
                        concept: i === 0 ? 'Search starts from the front of the queue.' : 'Move to next element in queue order.'
                    });

                    if (queue[i].value === searchValue) {
                        // Found the target
                        queue[i].isSearching = false;
                        queue[i].isFound = true;
                        steps.push({
                            elements: JSON.parse(JSON.stringify(queue)),
                            queueInfo: { ...info },
                            title: `Step ${steps.length}: Target Found!`,
                            description: `Successfully found value ${searchValue} at position ${i}.`,
                            explanation: 'Search complete! The target value has been located in the queue.',
                            concept: 'Search returns the position where the element was found.'
                        });
                        break;
                    }
                }

                // Step 3: Search result
                steps.push({
                    elements: JSON.parse(JSON.stringify(queue)),
                    queueInfo: { ...info },
                    title: 'Search Complete',
                    description: `Search operation finished. Value ${searchValue} was found in the queue.`,
                    explanation: 'The linear search successfully located the target value by examining queue elements in order.',
                    concept: 'Queue search has O(n) time complexity in worst case.'
                });
                break;
            }

            case 'queue-clear': {
                let queue = JSON.parse(JSON.stringify(initialQueue));
                let info = { front: 0, rear: initialQueue.length - 1, size: initialQueue.length };

                // Step 1: Prepare to clear
                steps.push({
                    elements: JSON.parse(JSON.stringify(queue)),
                    queueInfo: { ...info },
                    title: 'Step 1: Prepare to Clear Queue',
                    description: 'About to remove all elements from the queue.',
                    explanation: 'Clear operation removes all elements from the queue, making it empty. This resets the queue to its initial state.',
                    concept: 'Clear operation removes all elements at once.'
                });

                // Step 2: Mark all elements for deletion
                queue.forEach(el => el.isDeleting = true);
                steps.push({
                    elements: JSON.parse(JSON.stringify(queue)),
                    queueInfo: { ...info },
                    title: 'Step 2: Mark All Elements',
                    description: 'All elements marked for removal from the queue.',
                    explanation: 'Every element in the queue is prepared for deletion. This is more efficient than removing one by one.',
                    concept: 'Batch operations are more efficient than individual operations.'
                });

                // Step 3: Remove all elements
                queue = [];
                info = { front: 0, rear: -1, size: 0 };
                steps.push({
                    elements: JSON.parse(JSON.stringify(queue)),
                    queueInfo: { ...info },
                    title: 'Step 3: Remove All Elements',
                    description: 'All elements removed. Queue is now empty.',
                    explanation: 'The queue is now completely empty. Front and rear pointers are reset to their initial values.',
                    concept: 'Empty queue has size 0 and rear pointer at -1.'
                });

                // Step 4: Reset queue state
                steps.push({
                    elements: JSON.parse(JSON.stringify(queue)),
                    queueInfo: { ...info },
                    title: 'Step 4: Reset Queue State',
                    description: 'Queue pointers and size reset to initial empty state.',
                    explanation: 'All queue metadata is reset. The queue is ready to accept new elements starting from the beginning.',
                    concept: 'Clear operation resets queue to initial empty state.'
                });

                // Step 5: Final state
                steps.push({
                    elements: JSON.parse(JSON.stringify(queue)),
                    queueInfo: { ...info },
                    title: 'Clear Complete',
                    description: 'Queue successfully cleared. Ready for new operations.',
                    explanation: 'Clear operation finished. The queue is empty and ready to accept new elements.',
                    concept: 'Cleared queue can immediately accept new enqueue operations.'
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
                {operation === 'queue-enqueue' && 'Queue Enqueue (Add Element)'}
                {operation === 'queue-dequeue' && 'Queue Dequeue (Remove Element)'}
                {operation === 'queue-peek' && 'Queue Peek (View Front)'}
                {operation === 'queue-search' && 'Queue Search (Find Element)'}
                {operation === 'queue-clear' && 'Queue Clear (Remove All)'}
            </h3>

            {/* Current Step Info */}
            <div className={`
                mb-6 p-4 rounded-lg text-center max-w-3xl
                ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}
            `}>
                <h4 className="text-lg font-semibold mb-2">{currentStepData.title}</h4>
                <p className="text-sm mb-2">{currentStepData.description}</p>
                <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {currentStepData.explanation}
                </p>
                {currentStepData.concept && (
                    <div className={`
                        mt-3 p-2 rounded text-xs font-medium
                        ${theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'}
                    `}>
                        💡 Key Concept: {currentStepData.concept}
                    </div>
                )}
            </div>

            {/* Queue Info Panel */}
            <div className={`
                mb-6 p-3 rounded-lg text-center
                ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}
            `}>
                <div className="flex justify-center space-x-6 text-sm">
                    <div>
                        <span className="font-semibold">Size: </span>
                        <span className="text-blue-500 font-bold">{queueInfo.size}</span>
                    </div>
                    <div>
                        <span className="font-semibold">Front: </span>
                        <span className="text-purple-500 font-bold">{queueInfo.front}</span>
                    </div>
                    <div>
                        <span className="font-semibold">Rear: </span>
                        <span className="text-orange-500 font-bold">{queueInfo.rear}</span>
                    </div>
                </div>
            </div>

            {/* Queue visualization */}
            <div className="flex flex-col items-center mb-8">
                {/* FIFO Direction Indicator */}
                <div className="mb-4 text-center">
                    <div className="text-sm font-bold mb-2">FIFO Direction</div>
                    <div className="flex items-center space-x-2">
                        <span className="text-purple-500 font-bold">FRONT</span>
                        <span className="text-2xl">←</span>
                        <span className="text-gray-500">Queue Flow</span>
                        <span className="text-2xl">←</span>
                        <span className="text-orange-500 font-bold">REAR</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Elements exit from front, enter at rear</div>
                </div>

                <div className="flex items-center gap-2" style={{ transform: `scale(${size})` }}>
                    {elements.length === 0 ? (
                        <div className={`
                            flex items-center justify-center
                            w-32 h-16 border-2 border-dashed rounded-lg
                            ${theme === 'dark' ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-500'}
                        `}>
                            Empty Queue
                        </div>
                    ) : (
                        elements.map((element, index) => (
                            <div key={index} className="relative">
                                {/* Position indicators */}
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-center">
                                    {element.isFront && (
                                        <div className="text-xs font-bold text-purple-500">FRONT</div>
                                    )}
                                    {element.isRear && (
                                        <div className="text-xs font-bold text-orange-500">REAR</div>
                                    )}
                                    <div className="text-xs text-gray-500">[{index}]</div>
                                </div>

                                {/* Queue element */}
                                <div
                                    className={`
                                        flex items-center justify-center
                                        w-16 h-16 border-2 font-bold text-lg rounded-lg
                                        transition-all duration-500
                                        ${element.isHighlighted ? 'border-yellow-400 bg-yellow-100 dark:bg-yellow-900 shadow-lg animate-pulse' : ''}
                                        ${element.isActive ? 'border-green-400 bg-green-100 dark:bg-green-900 shadow-lg' : ''}
                                        ${element.isNew ? 'border-blue-400 bg-blue-100 dark:bg-blue-900 shadow-lg animate-bounce' : ''}
                                        ${element.isDeleting ? 'opacity-50 scale-90 border-red-400 bg-red-100 dark:bg-red-900' : ''}
                                        ${element.isFront && !element.isHighlighted && !element.isActive && !element.isNew ? 'border-purple-400 bg-purple-100 dark:bg-purple-900' : ''}
                                        ${element.isRear && !element.isHighlighted && !element.isActive && !element.isNew && !element.isFront ? 'border-orange-400 bg-orange-100 dark:bg-orange-900' : ''}
                                        ${element.isSearching ? 'border-cyan-400 bg-cyan-100 dark:bg-cyan-900 shadow-lg animate-pulse' : ''}
                                        ${element.isFound ? 'border-green-500 bg-green-200 dark:bg-green-800 shadow-xl' : ''}
                                        ${!element.isHighlighted && !element.isActive && !element.isNew && !element.isFront && !element.isRear && !element.isSearching && !element.isFound ? 
                                            (theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-white') : ''}
                                    `}
                                >
                                    {element.value}
                                </div>

                                {/* Flow arrows */}
                                {index < elements.length - 1 && (
                                    <div className="absolute top-1/2 -right-3 transform -translate-y-1/2">
                                        <div className="text-gray-400 text-xl">→</div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* Queue operation indicators */}
                <div className="mt-4 flex justify-between w-full max-w-md text-sm">
                    <div className="text-center">
                        <div className="text-purple-500 font-bold">← DEQUEUE</div>
                        <div className="text-xs text-gray-500">Remove from front</div>
                    </div>
                    <div className="text-center">
                        <div className="text-orange-500 font-bold">ENQUEUE →</div>
                        <div className="text-xs text-gray-500">Add to rear</div>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 text-xs mb-4">
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-purple-400 bg-purple-100 dark:bg-purple-900 rounded"></div>
                    <span>Front Element</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-orange-400 bg-orange-100 dark:bg-orange-900 rounded"></div>
                    <span>Rear Element</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-cyan-400 bg-cyan-100 dark:bg-cyan-900 rounded"></div>
                    <span>Searching</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-blue-400 bg-blue-100 dark:bg-blue-900 rounded"></div>
                    <span>New Element</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-green-500 bg-green-200 dark:bg-green-800 rounded"></div>
                    <span>Found/Active</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-red-400 bg-red-100 dark:bg-red-900 rounded opacity-50"></div>
                    <span>Deleting</span>
                </div>
            </div>

            {/* Progress indicator */}
            <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Step {currentStep + 1} of {operationSteps.length}
                </p>
            </div>
        </div>
    );
};

export default QueueVisualizer;
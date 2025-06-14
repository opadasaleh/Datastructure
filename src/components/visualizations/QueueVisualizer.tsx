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
    const [operationSteps, setOperationSteps] = useState<QueueElement[][]>([]);

    // Initialize queue on mount
    useEffect(() => {
        console.log('Operation:', operation);
        const initialSize = 5;
        const newElements: QueueElement[] = Array.from({ length: initialSize }, (_, index) => ({
            value: (index + 1) * 10,
            isActive: false,
            isHighlighted: false,
            isNew: false,
            isDeleting: false,
            isFront: index === 0,
            isRear: index === initialSize - 1
        }));
        setElements(newElements);
        generateOperationSteps(newElements);
    }, [operation]);

    // Update visualization based on current step
    useEffect(() => {
        if (operationSteps[currentStep]) {
            setElements(operationSteps[currentStep]);
        }
    }, [currentStep, operationSteps]);

    const generateOperationSteps = (initialQueue: QueueElement[]) => {
        const steps: QueueElement[][] = [initialQueue];
        const queue = [...initialQueue];

        // First step: Show initial queue
        steps.push(JSON.parse(JSON.stringify(queue)));

        switch (operation) {
            case 'queue-enqueue': {
                // Add element to rear of queue
                const newValue = 60;

                // Highlight the rear position
                const highlightStep = queue.map((el, idx) => ({
                    ...el,
                    isHighlighted: el.isRear
                }));
                steps.push(JSON.parse(JSON.stringify(highlightStep)));

                // Create new element
                const newElement: QueueElement = {
                    value: newValue,
                    isActive: false,
                    isHighlighted: false,
                    isNew: true,
                    isDeleting: false,
                    isFront: false,
                    isRear: true
                };

                // Update rear pointer
                queue.forEach(el => el.isRear = false);
                
                // Add the new element
                queue.push(newElement);
                steps.push(JSON.parse(JSON.stringify(queue)));

                // Reset states
                queue.forEach(el => {
                    el.isNew = false;
                    el.isHighlighted = false;
                });
                steps.push(JSON.parse(JSON.stringify(queue)));
                break;
            }

            case 'queue-dequeue': {
                // Remove element from front of queue
                if (queue.length === 0) break;

                // Highlight the front element
                const highlightStep = queue.map((el, idx) => ({
                    ...el,
                    isHighlighted: el.isFront
                }));
                steps.push(JSON.parse(JSON.stringify(highlightStep)));

                // Show the element being deleted
                queue[0].isDeleting = true;
                steps.push(JSON.parse(JSON.stringify(queue)));

                // Remove the front element
                queue.shift();
                
                // Update front pointer
                if (queue.length > 0) {
                    queue[0].isFront = true;
                }
                steps.push(JSON.parse(JSON.stringify(queue)));

                // Reset highlights
                queue.forEach(el => {
                    el.isHighlighted = false;
                    el.isDeleting = false;
                });
                steps.push(JSON.parse(JSON.stringify(queue)));
                break;
            }

            case 'queue-peek': {
                // Show front element without removing
                if (queue.length === 0) break;

                // Highlight the front element
                const highlightStep = queue.map((el, idx) => ({
                    ...el,
                    isHighlighted: el.isFront,
                    isActive: el.isFront
                }));
                steps.push(JSON.parse(JSON.stringify(highlightStep)));

                // Keep highlighting for a moment
                steps.push(JSON.parse(JSON.stringify(highlightStep)));

                // Reset states
                queue.forEach(el => {
                    el.isHighlighted = false;
                    el.isActive = false;
                });
                steps.push(JSON.parse(JSON.stringify(queue)));
                break;
            }

            case 'queue-search': {
                // Search for value 30
                const searchValue = 30;

                // Sequential search from front to rear
                for (let i = 0; i < queue.length; i++) {
                    // Highlight current element being checked
                    queue.forEach((el, idx) => {
                        el.isHighlighted = idx === i;
                        el.isActive = idx < i && el.value !== searchValue;
                    });
                    steps.push(JSON.parse(JSON.stringify(queue)));

                    if (queue[i].value === searchValue) {
                        // Found the element
                        queue[i].isActive = true;
                        queue[i].isHighlighted = false;
                        steps.push(JSON.parse(JSON.stringify(queue)));
                        break;
                    }
                }

                // Reset states
                queue.forEach(el => {
                    el.isHighlighted = false;
                    el.isActive = false;
                });
                steps.push(JSON.parse(JSON.stringify(queue)));
                break;
            }

            case 'queue-clear': {
                // Clear all elements one by one from front
                while (queue.length > 0) {
                    // Highlight the front element
                    queue[0].isHighlighted = true;
                    queue[0].isDeleting = true;
                    steps.push(JSON.parse(JSON.stringify(queue)));

                    // Remove the front element
                    queue.shift();
                    
                    // Update front pointer
                    if (queue.length > 0) {
                        queue[0].isFront = true;
                    }
                    steps.push(JSON.parse(JSON.stringify(queue)));
                }
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
                    {operation === 'queue-enqueue' && '📥 Adding to Queue (Enqueue)'}
                    {operation === 'queue-dequeue' && '📤 Removing from Queue (Dequeue)'}
                    {operation === 'queue-peek' && '👀 Peeking at Front'}
                    {operation === 'queue-search' && '🔍 Searching in Queue'}
                    {operation === 'queue-clear' && '🗑️ Clearing Queue'}
                </h3>

                {/* Simple Story-like Explanation */}
                <div className="text-lg mb-4">
                    {operation === 'queue-enqueue' && (
                        <div className="space-y-2">
                            <p>🎫 Like joining a line at the movies!</p>
                            <p>Step {currentStep + 1}: {
                                currentStep === 0 ? "Here's our queue (line)" :
                                    currentStep === 1 ? "Finding the back of the line" :
                                        currentStep === 2 ? "Adding new person to the back" :
                                            "✨ All done! New person is in line"
                            }</p>
                        </div>
                    )}
                    {operation === 'queue-dequeue' && (
                        <div className="space-y-2">
                            <p>🚪 The first person in line gets served!</p>
                            <p>Step {currentStep + 1}: {
                                currentStep === 0 ? "Here's our queue" :
                                    currentStep === 1 ? "The first person is being served" :
                                        currentStep === 2 ? "First person leaves the line" :
                                            "✨ Next person moves to the front"
                            }</p>
                        </div>
                    )}
                    {operation === 'queue-peek' && (
                        <div className="space-y-2">
                            <p>👀 Let's see who's first in line!</p>
                            <p>Step {currentStep + 1}: {
                                currentStep === 0 ? "Looking at our queue" :
                                    currentStep === 1 ? "👁️ This person is first!" :
                                        "✨ We can see who's next without removing them"
                            }</p>
                        </div>
                    )}
                    {operation === 'queue-search' && (
                        <div className="space-y-2">
                            <p>🔍 Looking for someone in the line!</p>
                            <p>Step {currentStep + 1}: {
                                currentStep === 0 ? "Starting from the front of the line" :
                                    currentStep === 1 ? "Checking each person one by one" :
                                        "🎯 Found them! They're in the queue"
                            }</p>
                        </div>
                    )}
                    {operation === 'queue-clear' && (
                        <div className="space-y-2">
                            <p>🗑️ Everyone is leaving the line!</p>
                            <p>Step {currentStep + 1}: {
                                currentStep === 0 ? "Starting to clear the queue" :
                                    "People are leaving one by one from the front"
                            }</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Simple Color Guide */}
            <div className="mb-8 flex gap-6 text-lg">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 border-2 border-blue-500 animate-bounce"></div>
                    <span>New Person</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 border-2 border-yellow-400"></div>
                    <span>Looking Here</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 border-2 border-green-500"></div>
                    <span>Found/Active</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 border-2 border-purple-500"></div>
                    <span>Front</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 border-2 border-orange-500"></div>
                    <span>Rear</span>
                </div>
            </div>

            {/* Queue Visualization */}
            <div className="flex flex-col items-center">
                {/* Front/Rear Labels */}
                <div className="flex justify-between w-full max-w-4xl mb-2">
                    <div className="text-purple-500 font-bold text-lg">
                        ← FRONT (First Out)
                    </div>
                    <div className="text-orange-500 font-bold text-lg">
                        REAR (Last In) →
                    </div>
                </div>

                {/* The Queue */}
                <div className="flex items-center gap-2" style={{ transform: `scale(${size})`, transformOrigin: 'center' }}>
                    {elements.map((element, index) => (
                        <div
                            key={index}
                            className={`
                                relative flex flex-col items-center justify-center
                                w-16 h-20 rounded-lg border-2 
                                transition-all duration-200 transform
                                ${element.isHighlighted ? 'ring-2 ring-yellow-400 scale-110' : ''}
                                ${element.isActive ? 'border-green-500' :
                                    element.isFront ? 'border-purple-500' :
                                        element.isRear ? 'border-orange-500' :
                                            theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}
                                ${element.isNew ? 'animate-bounce border-blue-500' : ''}
                                ${element.isDeleting ? 'opacity-50 scale-90' : ''}
                                ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
                            `}
                        >
                            {/* Number */}
                            <span className={`
                                font-mono text-lg font-bold
                                ${element.isNew ? 'text-blue-500' : ''}
                                ${element.isActive ? 'text-green-500' : ''}
                                ${element.isFront ? 'text-purple-500' : ''}
                                ${element.isRear ? 'text-orange-500' : ''}
                                ${!element.isNew && !element.isActive && !element.isFront && !element.isRear ? 
                                    (theme === 'dark' ? 'text-white' : 'text-gray-900') : ''}
                            `}>
                                {element.value}
                            </span>

                            {/* Position Label */}
                            <div className="absolute -bottom-6 left-0 right-0 text-center">
                                <span className="text-xs text-gray-500">{index}</span>
                            </div>

                            {/* Front/Rear Indicators */}
                            {element.isFront && (
                                <div className="absolute -top-8 left-0 right-0 text-center">
                                    <span className="text-xs text-purple-500 font-bold">FRONT</span>
                                </div>
                            )}
                            {element.isRear && (
                                <div className="absolute -top-8 left-0 right-0 text-center">
                                    <span className="text-xs text-orange-500 font-bold">REAR</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Empty Queue Message */}
                {elements.length === 0 && (
                    <div className="text-center text-gray-500 text-lg mt-8">
                        📭 The queue is empty!
                    </div>
                )}

                {/* Queue Info */}
                <div className="mt-8 text-center">
                    <div className={`
                        inline-flex items-center px-4 py-2 rounded-lg
                        ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}
                    `}>
                        <span className="font-medium">Queue Size: {elements.length}</span>
                        {elements.length > 0 && (
                            <>
                                <span className="mx-2">•</span>
                                <span>Front: {elements.find(el => el.isFront)?.value || 'N/A'}</span>
                                <span className="mx-2">•</span>
                                <span>Rear: {elements.find(el => el.isRear)?.value || 'N/A'}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QueueVisualizer;
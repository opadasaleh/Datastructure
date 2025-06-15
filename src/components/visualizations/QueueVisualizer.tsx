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

    useEffect(() => {
        const initialSize = 4;
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

    useEffect(() => {
        if (operationSteps[currentStep]) {
            setElements(operationSteps[currentStep]);
        }
    }, [currentStep, operationSteps]);

    const generateOperationSteps = (initialQueue: QueueElement[]) => {
        const steps: QueueElement[][] = [initialQueue];
        const queue = [...initialQueue];

        steps.push(JSON.parse(JSON.stringify(queue)));

        switch (operation) {
            case 'queue-enqueue': {
                const newValue = 50;

                // Highlight rear
                queue.forEach(el => el.isHighlighted = el.isRear);
                steps.push(JSON.parse(JSON.stringify(queue)));

                // Add new element
                const newElement: QueueElement = {
                    value: newValue,
                    isActive: false,
                    isHighlighted: false,
                    isNew: true,
                    isDeleting: false,
                    isFront: false,
                    isRear: true
                };

                queue.forEach(el => el.isRear = false);
                queue.push(newElement);
                steps.push(JSON.parse(JSON.stringify(queue)));

                // Reset
                queue.forEach(el => {
                    el.isNew = false;
                    el.isHighlighted = false;
                });
                steps.push(JSON.parse(JSON.stringify(queue)));
                break;
            }

            case 'queue-dequeue': {
                // Highlight front
                queue[0].isHighlighted = true;
                steps.push(JSON.parse(JSON.stringify(queue)));

                // Mark as deleting
                queue[0].isDeleting = true;
                steps.push(JSON.parse(JSON.stringify(queue)));

                // Remove front element
                queue.shift();
                if (queue.length > 0) {
                    queue[0].isFront = true;
                }
                steps.push(JSON.parse(JSON.stringify(queue)));
                break;
            }

            case 'queue-peek': {
                // Highlight front
                queue[0].isHighlighted = true;
                queue[0].isActive = true;
                steps.push(JSON.parse(JSON.stringify(queue)));

                // Reset
                queue[0].isHighlighted = false;
                queue[0].isActive = false;
                steps.push(JSON.parse(JSON.stringify(queue)));
                break;
            }

            case 'queue-search': {
                const searchValue = 30;

                for (let i = 0; i < queue.length; i++) {
                    queue.forEach((el, idx) => {
                        el.isHighlighted = idx === i;
                        el.isActive = idx < i;
                    });
                    steps.push(JSON.parse(JSON.stringify(queue)));

                    if (queue[i].value === searchValue) {
                        queue[i].isActive = true;
                        queue[i].isHighlighted = false;
                        steps.push(JSON.parse(JSON.stringify(queue)));
                        break;
                    }
                }
                break;
            }

            case 'queue-clear': {
                while (queue.length > 0) {
                    queue[0].isDeleting = true;
                    steps.push(JSON.parse(JSON.stringify(queue)));
                    queue.shift();
                    if (queue.length > 0) {
                        queue[0].isFront = true;
                    }
                    steps.push(JSON.parse(JSON.stringify(queue)));
                }
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
                {operation === 'queue-enqueue' && 'Adding to Queue'}
                {operation === 'queue-dequeue' && 'Removing from Queue'}
                {operation === 'queue-peek' && 'Looking at Front'}
                {operation === 'queue-search' && 'Finding in Queue'}
                {operation === 'queue-clear' && 'Clearing Queue'}
            </h3>

            {/* Queue visualization */}
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 mb-4" style={{ transform: `scale(${size})` }}>
                    {elements.map((element, index) => (
                        <div
                            key={index}
                            className={`
                                flex items-center justify-center
                                w-16 h-16 border-2 font-bold text-lg
                                transition-all duration-300
                                ${element.isHighlighted ? 'border-yellow-400 bg-yellow-100 dark:bg-yellow-900' : ''}
                                ${element.isActive ? 'border-green-400 bg-green-100 dark:bg-green-900' : ''}
                                ${element.isNew ? 'border-blue-400 bg-blue-100 dark:bg-blue-900 animate-pulse' : ''}
                                ${element.isDeleting ? 'opacity-50 scale-90' : ''}
                                ${element.isFront ? 'border-purple-400 bg-purple-100 dark:bg-purple-900' : ''}
                                ${element.isRear ? 'border-orange-400 bg-orange-100 dark:bg-orange-900' : ''}
                                ${!element.isHighlighted && !element.isActive && !element.isNew && !element.isFront && !element.isRear ? 
                                    (theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-white') : ''}
                            `}
                        >
                            {element.value}
                        </div>
                    ))}
                </div>

                {/* Front/Rear labels */}
                <div className="flex justify-between w-full max-w-xs text-sm">
                    <span className="text-purple-500">← FRONT</span>
                    <span className="text-orange-500">REAR →</span>
                </div>
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

export default QueueVisualizer;
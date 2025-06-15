import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useVisualization } from '../../contexts/VisualizationContext';

interface ArrayElement {
    value: number;
    isActive: boolean;
    isHighlighted: boolean;
    isNew: boolean;
    isDeleting: boolean;
}

interface ArrayVisualizerProps {
    operation: string;
    currentStep: number;
    onStepsChange: (totalSteps: number) => void;
    speed: number;
}

const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({
    operation,
    currentStep,
    onStepsChange,
    speed
}) => {
    const { theme } = useTheme();
    const { size } = useVisualization();
    const [elements, setElements] = useState<ArrayElement[]>([]);
    const [operationSteps, setOperationSteps] = useState<ArrayElement[][]>([]);

    // Initialize array on mount
    useEffect(() => {
        const initialSize = 6;
        const newElements: ArrayElement[] = Array.from({ length: initialSize }, (_, index) => ({
            value: (index + 1) * 10,
            isActive: false,
            isHighlighted: false,
            isNew: false,
            isDeleting: false
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

    const generateOperationSteps = (initialArray: ArrayElement[]) => {
        const steps: ArrayElement[][] = [initialArray];
        const array = [...initialArray];

        steps.push(JSON.parse(JSON.stringify(array)));

        switch (operation) {
            case 'array-insert': {
                const newValue = 35;
                const insertIndex = 2;

                // Highlight insertion point
                array[insertIndex].isHighlighted = true;
                steps.push(JSON.parse(JSON.stringify(array)));

                // Create new array with inserted element
                const newArray = [...array];
                newArray.splice(insertIndex, 0, {
                    value: newValue,
                    isActive: false,
                    isHighlighted: false,
                    isNew: true,
                    isDeleting: false
                });
                steps.push(JSON.parse(JSON.stringify(newArray)));

                // Reset states
                newArray.forEach(el => {
                    el.isNew = false;
                    el.isHighlighted = false;
                });
                steps.push(JSON.parse(JSON.stringify(newArray)));
                break;
            }

            case 'array-delete': {
                const deleteIndex = 2;

                // Highlight element to delete
                array[deleteIndex].isHighlighted = true;
                steps.push(JSON.parse(JSON.stringify(array)));

                // Mark as deleting
                array[deleteIndex].isDeleting = true;
                steps.push(JSON.parse(JSON.stringify(array)));

                // Remove element
                array.splice(deleteIndex, 1);
                steps.push(JSON.parse(JSON.stringify(array)));
                break;
            }

            case 'array-search': {
                const searchValue = 30;

                for (let i = 0; i < array.length; i++) {
                    array.forEach((el, idx) => {
                        el.isHighlighted = idx === i;
                        el.isActive = idx < i;
                    });
                    steps.push(JSON.parse(JSON.stringify(array)));

                    if (array[i].value === searchValue) {
                        array[i].isActive = true;
                        array[i].isHighlighted = false;
                        steps.push(JSON.parse(JSON.stringify(array)));
                        break;
                    }
                }
                break;
            }

            case 'array-update': {
                const updateIndex = 3;
                const newValue = 75;

                // Highlight element to update
                array[updateIndex].isHighlighted = true;
                steps.push(JSON.parse(JSON.stringify(array)));

                // Update value
                array[updateIndex].value = newValue;
                array[updateIndex].isNew = true;
                array[updateIndex].isHighlighted = false;
                steps.push(JSON.parse(JSON.stringify(array)));

                // Reset
                array[updateIndex].isNew = false;
                steps.push(JSON.parse(JSON.stringify(array)));
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
                {operation === 'array-insert' && 'Adding Element'}
                {operation === 'array-delete' && 'Removing Element'}
                {operation === 'array-search' && 'Finding Element'}
                {operation === 'array-update' && 'Updating Element'}
            </h3>

            {/* Array visualization */}
            <div className="flex items-center gap-1" style={{ transform: `scale(${size})` }}>
                {elements.map((element, index) => (
                    <div
                        key={index}
                        className={`
                            relative flex items-center justify-center
                            w-16 h-16 border-2 font-bold text-lg
                            transition-all duration-300
                            ${element.isHighlighted ? 'border-yellow-400 bg-yellow-100 dark:bg-yellow-900' : ''}
                            ${element.isActive ? 'border-green-400 bg-green-100 dark:bg-green-900' : ''}
                            ${element.isNew ? 'border-blue-400 bg-blue-100 dark:bg-blue-900 animate-pulse' : ''}
                            ${element.isDeleting ? 'opacity-50 scale-90' : ''}
                            ${!element.isHighlighted && !element.isActive && !element.isNew ? 
                                (theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-white') : ''}
                        `}
                    >
                        {element.value}
                        <div className="absolute -bottom-6 text-xs text-gray-500">
                            {index}
                        </div>
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

export default ArrayVisualizer;
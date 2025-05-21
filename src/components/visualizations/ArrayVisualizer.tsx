import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

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
    const [elements, setElements] = useState<ArrayElement[]>([]);
    const [operationSteps, setOperationSteps] = useState<ArrayElement[][]>([]);

    // Initialize array on mount
    useEffect(() => {
        console.log('Operation:', operation); // Debug log
        const initialSize = 8;
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

        // First step: Show initial array
        steps.push(JSON.parse(JSON.stringify(array)));

        switch (operation) {
            case 'array-insert': {
                // Insert element at index 3
                const newValue = 45;
                const insertIndex = 3;

                // Create a new array with one more element
                const newArray = [...array, { value: 0, isActive: false, isHighlighted: false, isNew: false, isDeleting: false }];

                // Highlight the insertion point
                const highlightStep = newArray.map((el, idx) => ({
                    ...el,
                    isHighlighted: idx === insertIndex
                }));
                steps.push(JSON.parse(JSON.stringify(highlightStep)));

                // Show elements shifting right
                for (let i = newArray.length - 2; i >= insertIndex; i--) {
                    newArray[i + 1] = { ...newArray[i], isHighlighted: true };
                    steps.push(JSON.parse(JSON.stringify(newArray)));
                }

                // Show the new element appearing
                newArray[insertIndex] = {
                    value: newValue,
                    isActive: false,
                    isHighlighted: false,
                    isNew: true,
                    isDeleting: false
                };
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
                // Delete element at index 2
                const deleteIndex = 2;

                // Highlight the element to delete
                const highlightStep = array.map((el, idx) => ({
                    ...el,
                    isHighlighted: idx === deleteIndex
                }));
                steps.push(JSON.parse(JSON.stringify(highlightStep)));

                // Show the element being deleted
                array[deleteIndex].isDeleting = true;
                steps.push(JSON.parse(JSON.stringify(array)));

                // Show elements shifting left
                for (let i = deleteIndex; i < array.length - 1; i++) {
                    array[i] = { ...array[i + 1], isHighlighted: true };
                    steps.push(JSON.parse(JSON.stringify(array)));
                }

                // Remove the last element
                array.pop();
                steps.push(JSON.parse(JSON.stringify(array)));

                // Reset highlights
                array.forEach(el => el.isHighlighted = false);
                steps.push(JSON.parse(JSON.stringify(array)));
                break;
            }

            case 'array-search': {
                // Search for value 40
                const searchValue = 40;

                // Sequential search visualization
                for (let i = 0; i < array.length; i++) {
                    // Highlight current element being checked
                    array.forEach((el, idx) => {
                        el.isHighlighted = idx === i;
                        el.isActive = idx < i && el.value !== searchValue;
                    });
                    steps.push(JSON.parse(JSON.stringify(array)));

                    if (array[i].value === searchValue) {
                        // Found the element
                        array[i].isActive = true;
                        array[i].isHighlighted = false;
                        steps.push(JSON.parse(JSON.stringify(array)));
                        break;
                    }
                }

                // If not found, show all elements as checked
                if (!array.some(el => el.isActive)) {
                    array.forEach(el => {
                        el.isHighlighted = false;
                        el.isActive = true;
                    });
                    steps.push(JSON.parse(JSON.stringify(array)));
                }
                break;
            }

            case 'array-update': {
                // Update element at index 4
                const updateIndex = 4;
                const newValue = 75;

                // Highlight the element to update
                const highlightStep = array.map((el, idx) => ({
                    ...el,
                    isHighlighted: idx === updateIndex
                }));
                steps.push(JSON.parse(JSON.stringify(highlightStep)));

                // Show old value fading
                array[updateIndex].isDeleting = true;
                steps.push(JSON.parse(JSON.stringify(array)));

                // Update the value and show it as new
                array[updateIndex] = {
                    value: newValue,
                    isActive: false,
                    isHighlighted: false,
                    isNew: true,
                    isDeleting: false
                };
                steps.push(JSON.parse(JSON.stringify(array)));

                // Reset states
                array[updateIndex].isNew = false;
                steps.push(JSON.parse(JSON.stringify(array)));
                break;
            }

            default:
                console.warn('Unknown operation:', operation);
                break;
        }

        console.log('Generated steps:', steps.length); // Debug log
        setOperationSteps(steps);
        onStepsChange(steps.length);
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-4">
            <div className="flex items-center gap-2">
                {elements.map((element, index) => (
                    <div
                        key={index}
                        className={`
                            relative flex items-center justify-center
                            w-12 h-12 rounded-lg border-2 
                            transition-all duration-200 transform
                            ${element.isHighlighted ? 'ring-2 ring-yellow-400 scale-110' : ''}
                            ${element.isActive ? 'border-green-500' :
                                theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}
                            ${element.isNew ? 'animate-bounce border-blue-500' : ''}
                            ${element.isDeleting ? 'opacity-50 scale-90' : ''}
                            ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
                        `}
                    >
                        <span className={`
                            font-mono text-lg
                            ${element.isNew ? 'text-blue-500 font-bold' : ''}
                            ${element.isActive ? 'text-green-500' : ''}
                            ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
                        `}>
                            {element.value}
                        </span>
                        <div className="absolute -top-6 left-0 right-0 text-center">
                            <span className="text-xs text-gray-500">{index}</span>
                        </div>
                    </div>
                ))}
            </div>
            {elements.length === 0 && (
                <div className="text-center text-gray-500">
                    No elements to display
                </div>
            )}
        </div>
    );
};

export default ArrayVisualizer; 
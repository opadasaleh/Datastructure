import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface ListElement {
    value: number;
    isActive: boolean;
    isHighlighted: boolean;
    isNew: boolean;
    isDeleting: boolean;
    isOrdered: boolean;
    isSelected: boolean;
}

interface ListVisualizerProps {
    operation: string;
    currentStep: number;
    onStepsChange: (totalSteps: number) => void;
    speed: number;
}

const ListVisualizer: React.FC<ListVisualizerProps> = ({
    operation,
    currentStep,
    onStepsChange,
    speed
}) => {
    const { theme } = useTheme();
    const [elements, setElements] = useState<ListElement[]>([]);
    const [operationSteps, setOperationSteps] = useState<ListElement[][]>([]);

    // Initialize list on mount
    useEffect(() => {
        console.log('Operation:', operation);
        const initialSize = 5;
        const newElements: ListElement[] = Array.from({ length: initialSize }, (_, index) => ({
            value: (index + 1) * 10,
            isActive: false,
            isHighlighted: false,
            isNew: false,
            isDeleting: false,
            isOrdered: operation.includes('ordered'),
            isSelected: false
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

    const generateOperationSteps = (initialElements: ListElement[]) => {
        const steps: ListElement[][] = [initialElements];
        const list = [...initialElements];

        // First step: Show initial list
        steps.push(JSON.parse(JSON.stringify(list)));

        switch (operation) {
            case 'ordered-list-insert': {
                // Insert element in ordered list
                const newValue = 35;

                // Find insertion point
                let insertIndex = 0;
                while (insertIndex < list.length && list[insertIndex].value < newValue) {
                    list[insertIndex].isHighlighted = true;
                    steps.push(JSON.parse(JSON.stringify(list)));
                    insertIndex++;
                }

                // Create new element
                const newElement: ListElement = {
                    value: newValue,
                    isActive: false,
                    isHighlighted: false,
                    isNew: true,
                    isDeleting: false,
                    isOrdered: true,
                    isSelected: false
                };

                // Insert the new element
                list.splice(insertIndex, 0, newElement);
                steps.push(JSON.parse(JSON.stringify(list)));

                // Reset states
                list.forEach(element => {
                    element.isHighlighted = false;
                    element.isNew = false;
                });
                steps.push(JSON.parse(JSON.stringify(list)));
                break;
            }

            case 'unordered-list-insert': {
                // Insert element at end of unordered list
                const newValue = 35;

                // Highlight the last element
                list[list.length - 1].isHighlighted = true;
                steps.push(JSON.parse(JSON.stringify(list)));

                // Create new element
                const newElement: ListElement = {
                    value: newValue,
                    isActive: false,
                    isHighlighted: false,
                    isNew: true,
                    isDeleting: false,
                    isOrdered: false,
                    isSelected: false
                };

                // Add the new element
                list.push(newElement);
                steps.push(JSON.parse(JSON.stringify(list)));

                // Reset states
                list.forEach(element => {
                    element.isHighlighted = false;
                    element.isNew = false;
                });
                steps.push(JSON.parse(JSON.stringify(list)));
                break;
            }

            case 'ordered-list-search': {
                // Binary search in ordered list
                const searchValue = 30;
                let left = 0;
                let right = list.length - 1;

                while (left <= right) {
                    const mid = Math.floor((left + right) / 2);

                    // Highlight current range
                    list.forEach((element, idx) => {
                        element.isHighlighted = idx >= left && idx <= right;
                    });
                    steps.push(JSON.parse(JSON.stringify(list)));

                    if (list[mid].value === searchValue) {
                        // Found the value
                        list[mid].isActive = true;
                        steps.push(JSON.parse(JSON.stringify(list)));
                        break;
                    } else if (list[mid].value < searchValue) {
                        left = mid + 1;
                    } else {
                        right = mid - 1;
                    }
                }

                // Reset states
                list.forEach(element => {
                    element.isHighlighted = false;
                });
                steps.push(JSON.parse(JSON.stringify(list)));
                break;
            }

            case 'unordered-list-search': {
                // Linear search in unordered list
                const searchValue = 30;

                for (let i = 0; i < list.length; i++) {
                    // Highlight current element
                    list.forEach((element, idx) => {
                        element.isHighlighted = idx === i;
                        element.isActive = idx < i && element.value === searchValue;
                    });
                    steps.push(JSON.parse(JSON.stringify(list)));

                    if (list[i].value === searchValue) {
                        // Found the value
                        list[i].isActive = true;
                        steps.push(JSON.parse(JSON.stringify(list)));
                        break;
                    }
                }

                // Reset states
                list.forEach(element => {
                    element.isHighlighted = false;
                });
                steps.push(JSON.parse(JSON.stringify(list)));
                break;
            }
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
                    {operation.includes('ordered') ? '📊 Ordered List' : '📝 Unordered List'}
                </h3>

                {/* Simple Story-like Explanation */}
                <div className="text-lg mb-4">
                    {operation === 'ordered-list-insert' && (
                        <div className="space-y-2">
                            <p>🌟 Let's add a new number to our ordered list!</p>
                            <p>Step {currentStep + 1}: {
                                currentStep === 0 ? "Here's our ordered list" :
                                    currentStep === 1 ? "Finding the right spot for our new number" :
                                        currentStep === 2 ? "Adding the new number in order" :
                                            "✨ All done! The list is still in order"
                            }</p>
                        </div>
                    )}
                    {operation === 'unordered-list-insert' && (
                        <div className="space-y-2">
                            <p>🌟 Let's add a new number to our list!</p>
                            <p>Step {currentStep + 1}: {
                                currentStep === 0 ? "Here's our list" :
                                    currentStep === 1 ? "Getting ready to add a new number" :
                                        currentStep === 2 ? "Adding the new number at the end" :
                                            "✨ All done! The new number is added"
                            }</p>
                        </div>
                    )}
                    {operation === 'ordered-list-search' && (
                        <div className="space-y-2">
                            <p>🔍 Let's find a number in our ordered list!</p>
                            <p>Step {currentStep + 1}: {
                                currentStep === 0 ? "Starting our binary search" :
                                    currentStep === 1 ? "Looking in the middle of our range" :
                                        currentStep === 2 ? "🎯 Found it! The number is here" :
                                            "✨ Search complete!"
                            }</p>
                        </div>
                    )}
                    {operation === 'unordered-list-search' && (
                        <div className="space-y-2">
                            <p>🔍 Let's find a number in our list!</p>
                            <p>Step {currentStep + 1}: {
                                currentStep === 0 ? "Starting from the beginning" :
                                    currentStep === 1 ? "Checking each number one by one" :
                                        currentStep === 2 ? "🎯 Found it! The number is here" :
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
                    <span>New Number</span>
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

            {/* The List */}
            <div className="flex items-center gap-4">
                {elements.map((element, index) => (
                    <div
                        key={index}
                        className={`
                            relative flex items-center justify-center
                            w-16 h-16 rounded-lg border-2 
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
                <div className="text-center text-gray-500 text-lg">
                    No numbers in the list yet
                </div>
            )}
        </div>
    );
};

export default ListVisualizer; 
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useVisualization } from '../../contexts/VisualizationContext';

interface ListElement {
    value: number;
    isActive: boolean;
    isHighlighted: boolean;
    isNew: boolean;
    isDeleting: boolean;
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
    const { size } = useVisualization();
    const [elements, setElements] = useState<ListElement[]>([]);
    const [operationSteps, setOperationSteps] = useState<ListElement[][]>([]);

    useEffect(() => {
        const initialSize = 5;
        const newElements: ListElement[] = Array.from({ length: initialSize }, (_, index) => ({
            value: operation.includes('ordered') ? (index + 1) * 10 : [15, 42, 8, 23, 31][index],
            isActive: false,
            isHighlighted: false,
            isNew: false,
            isDeleting: false
        }));
        setElements(newElements);
        generateOperationSteps(newElements);
    }, [operation]);

    useEffect(() => {
        if (operationSteps[currentStep]) {
            setElements(operationSteps[currentStep]);
        }
    }, [currentStep, operationSteps]);

    const generateOperationSteps = (initialElements: ListElement[]) => {
        const steps: ListElement[][] = [initialElements];
        const list = [...initialElements];

        steps.push(JSON.parse(JSON.stringify(list)));

        switch (operation) {
            case 'ordered-list-insert': {
                const newValue = 25;
                let insertIndex = 0;
                
                // Find insertion point
                while (insertIndex < list.length && list[insertIndex].value < newValue) {
                    list[insertIndex].isHighlighted = true;
                    steps.push(JSON.parse(JSON.stringify(list)));
                    insertIndex++;
                }

                // Insert element
                const newElement: ListElement = {
                    value: newValue,
                    isActive: false,
                    isHighlighted: false,
                    isNew: true,
                    isDeleting: false
                };

                list.splice(insertIndex, 0, newElement);
                steps.push(JSON.parse(JSON.stringify(list)));

                // Reset
                list.forEach(element => {
                    element.isHighlighted = false;
                    element.isNew = false;
                });
                steps.push(JSON.parse(JSON.stringify(list)));
                break;
            }

            case 'unordered-list-insert': {
                const newValue = 67;

                // Highlight end
                list[list.length - 1].isHighlighted = true;
                steps.push(JSON.parse(JSON.stringify(list)));

                // Add element
                const newElement: ListElement = {
                    value: newValue,
                    isActive: false,
                    isHighlighted: false,
                    isNew: true,
                    isDeleting: false
                };

                list.push(newElement);
                steps.push(JSON.parse(JSON.stringify(list)));

                // Reset
                list.forEach(element => {
                    element.isHighlighted = false;
                    element.isNew = false;
                });
                steps.push(JSON.parse(JSON.stringify(list)));
                break;
            }

            case 'ordered-list-search': {
                const searchValue = 30;
                let left = 0;
                let right = list.length - 1;

                while (left <= right) {
                    const mid = Math.floor((left + right) / 2);

                    // Highlight range
                    list.forEach((element, idx) => {
                        element.isHighlighted = idx >= left && idx <= right;
                    });
                    steps.push(JSON.parse(JSON.stringify(list)));

                    if (list[mid].value === searchValue) {
                        list[mid].isActive = true;
                        steps.push(JSON.parse(JSON.stringify(list)));
                        break;
                    } else if (list[mid].value < searchValue) {
                        left = mid + 1;
                    } else {
                        right = mid - 1;
                    }
                }
                break;
            }

            case 'unordered-list-search': {
                const searchValue = 23;

                for (let i = 0; i < list.length; i++) {
                    list.forEach((element, idx) => {
                        element.isHighlighted = idx === i;
                        element.isActive = idx < i;
                    });
                    steps.push(JSON.parse(JSON.stringify(list)));

                    if (list[i].value === searchValue) {
                        list[i].isActive = true;
                        steps.push(JSON.parse(JSON.stringify(list)));
                        break;
                    }
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
                {operation.includes('ordered') ? 'Sorted List' : 'Unsorted List'}
                {operation.includes('insert') && ' - Adding'}
                {operation.includes('search') && ' - Finding'}
            </h3>

            {/* List visualization */}
            <div className="flex items-center gap-1" style={{ transform: `scale(${size})` }}>
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
                            ${!element.isHighlighted && !element.isActive && !element.isNew ? 
                                (theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-white') : ''}
                        `}
                    >
                        {element.value}
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

export default ListVisualizer;
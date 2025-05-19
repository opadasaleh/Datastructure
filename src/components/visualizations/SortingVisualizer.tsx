import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface Bar {
    value: number;
    isComparing: boolean;
    isSorted: boolean;
    isSwapping: boolean;
}

interface SortingVisualizerProps {
    algorithm: string;
    currentStep: number;
    onStepsChange: (totalSteps: number) => void;
    speed: number;
}

const SortingVisualizer: React.FC<SortingVisualizerProps> = ({
    algorithm,
    currentStep,
    onStepsChange,
    speed
}) => {
    const { theme } = useTheme();
    const [bars, setBars] = useState<Bar[]>([]);
    const [sortingSteps, setSortingSteps] = useState<Bar[][]>([]);

    // Generate random array on mount
    useEffect(() => {
        const arraySize = 20;
        const newBars: Bar[] = Array.from({ length: arraySize }, () => ({
            value: Math.floor(Math.random() * 80) + 20,
            isComparing: false,
            isSorted: false,
            isSwapping: false
        }));
        setBars(newBars);
        generateSortingSteps(newBars);
    }, [algorithm]);

    // Update visualization based on current step
    useEffect(() => {
        if (sortingSteps[currentStep]) {
            setBars(sortingSteps[currentStep]);
        }
    }, [currentStep, sortingSteps]);

    const generateSortingSteps = (initialArray: Bar[]) => {
        const steps: Bar[][] = [initialArray];
        const array = [...initialArray];

        if (algorithm === 'bubble-sort') {
            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < array.length - i - 1; j++) {
                    // Add comparing state
                    const comparingStep = array.map((bar, index) => ({
                        ...bar,
                        isComparing: index === j || index === j + 1,
                        isSwapping: false
                    }));
                    steps.push(JSON.parse(JSON.stringify(comparingStep)));

                    if (array[j].value > array[j + 1].value) {
                        // Add swapping state
                        const swappingStep = array.map((bar, index) => ({
                            ...bar,
                            isComparing: index === j || index === j + 1,
                            isSwapping: index === j || index === j + 1
                        }));
                        steps.push(JSON.parse(JSON.stringify(swappingStep)));

                        // Perform swap
                        [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    }
                }
                // Mark sorted elements
                array[array.length - i - 1].isSorted = true;
                steps.push(JSON.parse(JSON.stringify(array)));
            }
        }
        // Add final state with all bars marked as sorted
        const finalStep = array.map(bar => ({ ...bar, isSorted: true, isComparing: false, isSwapping: false }));
        steps.push(finalStep);

        setSortingSteps(steps);
        onStepsChange(steps.length);
    };

    return (
        <div className="h-full w-full flex items-end justify-center gap-1 p-4">
            {bars.map((bar, index) => (
                <div
                    key={index}
                    className={`
            w-4 transition-all duration-200
            ${bar.isComparing ? 'bg-yellow-400' : ''}
            ${bar.isSwapping ? 'bg-red-500' : ''}
            ${bar.isSorted ? 'bg-green-500' : ''}
            ${!bar.isComparing && !bar.isSwapping && !bar.isSorted
                            ? theme === 'dark' ? 'bg-blue-500' : 'bg-blue-400'
                            : ''
                        }
          `}
                    style={{ height: `${bar.value}%` }}
                />
            ))}
        </div>
    );
};

export default SortingVisualizer; 
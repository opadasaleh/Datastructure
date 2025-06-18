import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useVisualization } from '../../contexts/VisualizationContext';

interface ListElement {
    value: number;
    isActive: boolean;
    isHighlighted: boolean;
    isNew: boolean;
    isDeleting: boolean;
    isComparing: boolean;
    isSearchRange: boolean;
    isMidpoint: boolean;
    isFound: boolean;
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
    const [operationSteps, setOperationSteps] = useState<any[]>([]);
    const [searchBounds, setSearchBounds] = useState({ left: -1, right: -1, mid: -1 });

    useEffect(() => {
        const initialSize = 5;
        const newElements: ListElement[] = Array.from({ length: initialSize }, (_, index) => ({
            value: operation.includes('ordered') ? (index + 1) * 10 : [15, 42, 8, 23, 31][index],
            isActive: false,
            isHighlighted: false,
            isNew: false,
            isDeleting: false,
            isComparing: false,
            isSearchRange: false,
            isMidpoint: false,
            isFound: false
        }));
        setElements(newElements);
        generateOperationSteps(newElements);
    }, [operation]);

    useEffect(() => {
        if (operationSteps[currentStep]) {
            setElements(operationSteps[currentStep].elements);
            setSearchBounds(operationSteps[currentStep].searchBounds || { left: -1, right: -1, mid: -1 });
        }
    }, [currentStep, operationSteps]);

    const generateOperationSteps = (initialElements: ListElement[]) => {
        const steps: any[] = [];
        
        // Initial state
        steps.push({
            elements: JSON.parse(JSON.stringify(initialElements)),
            searchBounds: { left: -1, right: -1, mid: -1 },
            title: 'Initial State',
            description: operation.includes('ordered') 
                ? 'Starting with a sorted list. Elements are arranged in ascending order.'
                : 'Starting with an unsorted list. Elements are in random order.',
            explanation: operation.includes('ordered')
                ? 'Ordered lists maintain elements in sorted order, enabling efficient operations like binary search.'
                : 'Unordered lists store elements without any particular arrangement, requiring linear search.',
            concept: operation.includes('ordered')
                ? 'Sorted data enables faster search algorithms'
                : 'Unsorted data is simpler to maintain but slower to search'
        });

        switch (operation) {
            case 'ordered-list-insert': {
                const newValue = 25;
                let list = JSON.parse(JSON.stringify(initialElements));
                let insertIndex = 0;
                
                // Step 1: Explain the insertion strategy
                steps.push({
                    elements: JSON.parse(JSON.stringify(list)),
                    searchBounds: { left: -1, right: -1, mid: -1 },
                    title: 'Step 1: Insertion Strategy',
                    description: `Inserting value ${newValue} while maintaining sorted order.`,
                    explanation: 'In an ordered list, we must find the correct position to insert the new element so that the list remains sorted.',
                    concept: 'Ordered insertion maintains the sorted property of the list'
                });

                // Step 2: Start comparison process
                steps.push({
                    elements: JSON.parse(JSON.stringify(list)),
                    searchBounds: { left: -1, right: -1, mid: -1 },
                    title: 'Step 2: Find Insertion Position',
                    description: 'Comparing the new value with existing elements to find the correct position.',
                    explanation: 'We need to find the first element that is greater than our new value. The new element will be inserted before that position.',
                    concept: 'Linear scan finds the insertion point in O(n) time'
                });
                
                // Step 3: Compare with each element
                while (insertIndex < list.length && list[insertIndex].value < newValue) {
                    // Clear previous highlighting
                    if (insertIndex > 0) {
                        list[insertIndex - 1].isComparing = false;
                        list[insertIndex - 1].isActive = true;
                    }
                    
                    // Highlight current comparison
                    list[insertIndex].isComparing = true;
                    
                    steps.push({
                        elements: JSON.parse(JSON.stringify(list)),
                        searchBounds: { left: -1, right: -1, mid: -1 },
                        title: `Step ${steps.length}: Compare with ${list[insertIndex].value}`,
                        description: `Comparing ${newValue} with ${list[insertIndex].value}. Since ${newValue} > ${list[insertIndex].value}, continue searching.`,
                        explanation: `${newValue} is greater than ${list[insertIndex].value}, so we need to look further right in the list to maintain sorted order.`,
                        concept: 'Keep searching until we find a larger element or reach the end'
                    });
                    
                    insertIndex++;
                }

                // Step 4: Found insertion point
                if (insertIndex < list.length) {
                    list[insertIndex].isHighlighted = true;
                    if (insertIndex > 0) {
                        list[insertIndex - 1].isComparing = false;
                        list[insertIndex - 1].isActive = true;
                    }
                    
                    steps.push({
                        elements: JSON.parse(JSON.stringify(list)),
                        searchBounds: { left: -1, right: -1, mid: -1 },
                        title: `Step ${steps.length}: Found Insertion Point`,
                        description: `Found position! ${newValue} should be inserted before ${list[insertIndex].value}.`,
                        explanation: `${list[insertIndex].value} is the first element greater than ${newValue}, so we insert before this position to maintain order.`,
                        concept: 'Insert before the first element greater than the new value'
                    });
                } else {
                    // Insert at end
                    if (list.length > 0) {
                        list[list.length - 1].isComparing = false;
                        list[list.length - 1].isActive = true;
                    }
                    
                    steps.push({
                        elements: JSON.parse(JSON.stringify(list)),
                        searchBounds: { left: -1, right: -1, mid: -1 },
                        title: `Step ${steps.length}: Insert at End`,
                        description: `${newValue} is larger than all existing elements. Insert at the end.`,
                        explanation: 'Since no element is greater than our new value, we insert it at the end of the list.',
                        concept: 'If new value is largest, append to the end'
                    });
                }

                // Step 5: Shift elements and insert
                const newElement: ListElement = {
                    value: newValue,
                    isActive: false,
                    isHighlighted: false,
                    isNew: true,
                    isDeleting: false,
                    isComparing: false,
                    isSearchRange: false,
                    isMidpoint: false,
                    isFound: false
                };

                list.splice(insertIndex, 0, newElement);
                
                // Clear highlighting
                list.forEach((el, idx) => {
                    if (idx !== insertIndex) {
                        el.isHighlighted = false;
                        el.isActive = false;
                        el.isComparing = false;
                    }
                });

                steps.push({
                    elements: JSON.parse(JSON.stringify(list)),
                    searchBounds: { left: -1, right: -1, mid: -1 },
                    title: `Step ${steps.length}: Insert Element`,
                    description: `Inserted ${newValue} at position ${insertIndex}. Elements shifted to make room.`,
                    explanation: 'The new element is inserted and existing elements are shifted right. The list remains sorted.',
                    concept: 'Insertion requires shifting elements, making it O(n) operation'
                });

                // Step 6: Final state
                list[insertIndex].isNew = false;
                steps.push({
                    elements: JSON.parse(JSON.stringify(list)),
                    searchBounds: { left: -1, right: -1, mid: -1 },
                    title: 'Insertion Complete',
                    description: `Successfully inserted ${newValue}. The list remains sorted.`,
                    explanation: 'Ordered insertion complete! The list maintains its sorted property with the new element in the correct position.',
                    concept: 'Ordered list insertion preserves the sorted invariant'
                });
                break;
            }

            case 'unordered-list-insert': {
                const newValue = 67;
                let list = JSON.parse(JSON.stringify(initialElements));

                // Step 1: Explain unordered insertion
                steps.push({
                    elements: JSON.parse(JSON.stringify(list)),
                    searchBounds: { left: -1, right: -1, mid: -1 },
                    title: 'Step 1: Unordered Insertion Strategy',
                    description: `Adding ${newValue} to the unordered list.`,
                    explanation: 'In an unordered list, we can simply add the new element at the end since there\'s no sorting requirement.',
                    concept: 'Unordered insertion is simpler - just append to the end'
                });

                // Step 2: Highlight end position
                if (list.length > 0) {
                    list[list.length - 1].isHighlighted = true;
                }
                
                steps.push({
                    elements: JSON.parse(JSON.stringify(list)),
                    searchBounds: { left: -1, right: -1, mid: -1 },
                    title: 'Step 2: Locate End Position',
                    description: 'The new element will be added at the end of the list.',
                    explanation: 'Since order doesn\'t matter, we can efficiently add the element at the end without any comparisons or shifting.',
                    concept: 'Append operation is O(1) - constant time'
                });

                // Step 3: Add element
                const newElement: ListElement = {
                    value: newValue,
                    isActive: false,
                    isHighlighted: false,
                    isNew: true,
                    isDeleting: false,
                    isComparing: false,
                    isSearchRange: false,
                    isMidpoint: false,
                    isFound: false
                };

                if (list.length > 0) {
                    list[list.length - 1].isHighlighted = false;
                }
                list.push(newElement);

                steps.push({
                    elements: JSON.parse(JSON.stringify(list)),
                    searchBounds: { left: -1, right: -1, mid: -1 },
                    title: 'Step 3: Add Element',
                    description: `Added ${newValue} at the end of the list.`,
                    explanation: 'The new element is appended to the end. No shifting or comparison needed.',
                    concept: 'Unordered insertion is very efficient'
                });

                // Step 4: Final state
                list[list.length - 1].isNew = false;
                steps.push({
                    elements: JSON.parse(JSON.stringify(list)),
                    searchBounds: { left: -1, right: -1, mid: -1 },
                    title: 'Insertion Complete',
                    description: `Successfully added ${newValue} to the unordered list.`,
                    explanation: 'Unordered insertion complete! The element is added efficiently without maintaining any order.',
                    concept: 'Trade-off: Fast insertion but slower search later'
                });
                break;
            }

            case 'ordered-list-search': {
                const searchValue = 30;
                let list = JSON.parse(JSON.stringify(initialElements));
                let left = 0;
                let right = list.length - 1;

                // Step 1: Explain binary search
                steps.push({
                    elements: JSON.parse(JSON.stringify(list)),
                    searchBounds: { left: 0, right: list.length - 1, mid: -1 },
                    title: 'Step 1: Binary Search Strategy',
                    description: `Searching for ${searchValue} using binary search.`,
                    explanation: 'Binary search takes advantage of the sorted order to eliminate half of the remaining elements in each step.',
                    concept: 'Binary search is O(log n) - much faster than linear search'
                });

                // Step 2: Initialize search bounds
                list.forEach((el, idx) => {
                    el.isSearchRange = idx >= left && idx <= right;
                });

                steps.push({
                    elements: JSON.parse(JSON.stringify(list)),
                    searchBounds: { left, right, mid: -1 },
                    title: 'Step 2: Initialize Search Range',
                    description: `Search range: indices ${left} to ${right} (entire list).`,
                    explanation: 'We start by considering the entire sorted list as our search range.',
                    concept: 'Binary search starts with the full range'
                });

                let stepCount = 3;
                while (left <= right) {
                    const mid = Math.floor((left + right) / 2);

                    // Clear previous highlighting
                    list.forEach(el => {
                        el.isMidpoint = false;
                        el.isComparing = false;
                    });

                    // Update search range highlighting
                    list.forEach((el, idx) => {
                        el.isSearchRange = idx >= left && idx <= right;
                    });

                    // Highlight midpoint
                    list[mid].isMidpoint = true;
                    list[mid].isComparing = true;

                    steps.push({
                        elements: JSON.parse(JSON.stringify(list)),
                        searchBounds: { left, right, mid },
                        title: `Step ${stepCount}: Check Midpoint`,
                        description: `Checking middle element at index ${mid} with value ${list[mid].value}.`,
                        explanation: `Compare ${searchValue} with ${list[mid].value} at the middle of our current search range.`,
                        concept: 'Always check the middle element to divide the problem in half'
                    });

                    stepCount++;

                    if (list[mid].value === searchValue) {
                        // Found the target
                        list[mid].isComparing = false;
                        list[mid].isMidpoint = false;
                        list[mid].isFound = true;
                        
                        // Clear search range highlighting
                        list.forEach(el => el.isSearchRange = false);

                        steps.push({
                            elements: JSON.parse(JSON.stringify(list)),
                            searchBounds: { left, right, mid },
                            title: `Step ${stepCount}: Target Found!`,
                            description: `Found ${searchValue} at index ${mid}!`,
                            explanation: 'Success! The target value has been located using binary search.',
                            concept: 'Binary search found the target in O(log n) time'
                        });
                        break;
                    } else if (list[mid].value < searchValue) {
                        // Search right half
                        left = mid + 1;
                        
                        steps.push({
                            elements: JSON.parse(JSON.stringify(list)),
                            searchBounds: { left: mid + 1, right, mid },
                            title: `Step ${stepCount}: Search Right Half`,
                            description: `${list[mid].value} < ${searchValue}, so search the right half.`,
                            explanation: `Since ${list[mid].value} is less than our target, the target must be in the right half of the current range.`,
                            concept: 'Eliminate left half when midpoint is too small'
                        });
                    } else {
                        // Search left half
                        right = mid - 1;
                        
                        steps.push({
                            elements: JSON.parse(JSON.stringify(list)),
                            searchBounds: { left, right: mid - 1, mid },
                            title: `Step ${stepCount}: Search Left Half`,
                            description: `${list[mid].value} > ${searchValue}, so search the left half.`,
                            explanation: `Since ${list[mid].value} is greater than our target, the target must be in the left half of the current range.`,
                            concept: 'Eliminate right half when midpoint is too large'
                        });
                    }
                    stepCount++;
                }

                // Final state
                steps.push({
                    elements: JSON.parse(JSON.stringify(list)),
                    searchBounds: { left: -1, right: -1, mid: -1 },
                    title: 'Binary Search Complete',
                    description: `Binary search finished. Found ${searchValue} efficiently.`,
                    explanation: 'Binary search completed in logarithmic time by repeatedly dividing the search space in half.',
                    concept: 'Binary search: O(log n) vs Linear search: O(n)'
                });
                break;
            }

            case 'unordered-list-search': {
                const searchValue = 23;
                let list = JSON.parse(JSON.stringify(initialElements));

                // Step 1: Explain linear search
                steps.push({
                    elements: JSON.parse(JSON.stringify(list)),
                    searchBounds: { left: -1, right: -1, mid: -1 },
                    title: 'Step 1: Linear Search Strategy',
                    description: `Searching for ${searchValue} using linear search.`,
                    explanation: 'Since the list is unordered, we must check each element one by one until we find the target or reach the end.',
                    concept: 'Unordered data requires linear search - O(n) time'
                });

                // Step 2: Start search
                steps.push({
                    elements: JSON.parse(JSON.stringify(list)),
                    searchBounds: { left: -1, right: -1, mid: -1 },
                    title: 'Step 2: Begin Sequential Check',
                    description: 'Starting from the first element, check each one sequentially.',
                    explanation: 'Linear search examines elements in order from left to right until the target is found or all elements are checked.',
                    concept: 'Sequential access is the only option for unordered data'
                });

                // Step 3: Search through elements
                for (let i = 0; i < list.length; i++) {
                    // Clear previous highlighting
                    if (i > 0) {
                        list[i - 1].isComparing = false;
                        list[i - 1].isActive = true;
                    }
                    
                    // Highlight current element
                    list[i].isComparing = true;
                    
                    steps.push({
                        elements: JSON.parse(JSON.stringify(list)),
                        searchBounds: { left: -1, right: -1, mid: -1 },
                        title: `Step ${steps.length}: Check Element ${i}`,
                        description: `Checking element at index ${i} with value ${list[i].value}.`,
                        explanation: list[i].value === searchValue 
                            ? `Found it! ${list[i].value} matches our target ${searchValue}.`
                            : `${list[i].value} ≠ ${searchValue}. Continue to next element.`,
                        concept: i === 0 ? 'Start from the beginning' : 'Move to next element sequentially'
                    });

                    if (list[i].value === searchValue) {
                        // Found the target
                        list[i].isComparing = false;
                        list[i].isFound = true;
                        
                        steps.push({
                            elements: JSON.parse(JSON.stringify(list)),
                            searchBounds: { left: -1, right: -1, mid: -1 },
                            title: `Step ${steps.length}: Target Found!`,
                            description: `Successfully found ${searchValue} at index ${i}.`,
                            explanation: 'Linear search complete! Found the target by checking elements sequentially.',
                            concept: `Found target after checking ${i + 1} element(s)`
                        });
                        break;
                    }
                }

                // Final state
                steps.push({
                    elements: JSON.parse(JSON.stringify(list)),
                    searchBounds: { left: -1, right: -1, mid: -1 },
                    title: 'Linear Search Complete',
                    description: `Linear search finished. Found ${searchValue} in the unordered list.`,
                    explanation: 'Linear search successfully located the target by examining elements one by one.',
                    concept: 'Linear search: Simple but potentially slow for large lists'
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
                {operation === 'ordered-list-insert' && 'Ordered List Insertion'}
                {operation === 'unordered-list-insert' && 'Unordered List Insertion'}
                {operation === 'ordered-list-search' && 'Binary Search (Ordered List)'}
                {operation === 'unordered-list-search' && 'Linear Search (Unordered List)'}
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

            {/* Search bounds indicator for binary search */}
            {operation === 'ordered-list-search' && (searchBounds.left !== -1 || searchBounds.right !== -1) && (
                <div className={`
                    mb-4 p-3 rounded-lg text-center
                    ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}
                `}>
                    <div className="text-sm">
                        <span className="font-semibold">Search Range: </span>
                        <span className="text-blue-500">Left = {searchBounds.left}</span>
                        {searchBounds.mid !== -1 && (
                            <span className="text-purple-500 ml-4">Mid = {searchBounds.mid}</span>
                        )}
                        <span className="text-orange-500 ml-4">Right = {searchBounds.right}</span>
                    </div>
                </div>
            )}

            {/* List visualization */}
            <div className="flex items-center gap-1 mb-8" style={{ transform: `scale(${size})` }}>
                {elements.map((element, index) => (
                    <div key={index} className="relative">
                        {/* Index labels */}
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
                            {index}
                        </div>

                        {/* Search bound indicators */}
                        {operation === 'ordered-list-search' && (
                            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-xs">
                                {searchBounds.left === index && (
                                    <span className="text-blue-500 font-bold">L</span>
                                )}
                                {searchBounds.mid === index && (
                                    <span className="text-purple-500 font-bold">M</span>
                                )}
                                {searchBounds.right === index && (
                                    <span className="text-orange-500 font-bold">R</span>
                                )}
                            </div>
                        )}

                        <div
                            className={`
                                flex items-center justify-center
                                w-16 h-16 border-2 font-bold text-lg rounded-lg
                                transition-all duration-500
                                ${element.isHighlighted ? 'border-yellow-400 bg-yellow-100 dark:bg-yellow-900 shadow-lg' : ''}
                                ${element.isActive ? 'border-green-400 bg-green-100 dark:bg-green-900 shadow-lg' : ''}
                                ${element.isNew ? 'border-blue-400 bg-blue-100 dark:bg-blue-900 animate-pulse shadow-lg' : ''}
                                ${element.isDeleting ? 'opacity-50 scale-90 border-red-400 bg-red-100 dark:bg-red-900' : ''}
                                ${element.isComparing ? 'border-purple-400 bg-purple-100 dark:bg-purple-900 shadow-lg animate-pulse' : ''}
                                ${element.isSearchRange ? 'border-cyan-400 bg-cyan-50 dark:bg-cyan-900/30' : ''}
                                ${element.isMidpoint ? 'border-purple-500 bg-purple-200 dark:bg-purple-800 shadow-xl' : ''}
                                ${element.isFound ? 'border-green-500 bg-green-200 dark:bg-green-800 shadow-xl animate-bounce' : ''}
                                ${!element.isHighlighted && !element.isActive && !element.isNew && !element.isComparing && !element.isSearchRange && !element.isMidpoint && !element.isFound ? 
                                    (theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-white') : ''}
                            `}
                        >
                            {element.value}
                        </div>
                    </div>
                ))}
            </div>

            {/* Algorithm comparison */}
            <div className={`
                mb-6 p-4 rounded-lg max-w-4xl
                ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}
            `}>
                <h4 className="text-lg font-semibold mb-3 text-center">Algorithm Comparison</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                        <h5 className="font-bold mb-2">Ordered List</h5>
                        <ul className="space-y-1 text-xs">
                            <li>• <strong>Insert:</strong> O(n) - Find position + shift elements</li>
                            <li>• <strong>Search:</strong> O(log n) - Binary search</li>
                            <li>• <strong>Advantage:</strong> Fast search operations</li>
                            <li>• <strong>Use case:</strong> Frequent searches, less frequent insertions</li>
                        </ul>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100'}`}>
                        <h5 className="font-bold mb-2">Unordered List</h5>
                        <ul className="space-y-1 text-xs">
                            <li>• <strong>Insert:</strong> O(1) - Append to end</li>
                            <li>• <strong>Search:</strong> O(n) - Linear search</li>
                            <li>• <strong>Advantage:</strong> Fast insertion operations</li>
                            <li>• <strong>Use case:</strong> Frequent insertions, less frequent searches</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 text-xs mb-4">
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-purple-400 bg-purple-100 dark:bg-purple-900 rounded"></div>
                    <span>Comparing</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-cyan-400 bg-cyan-50 dark:bg-cyan-900/30 rounded"></div>
                    <span>Search Range</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-purple-500 bg-purple-200 dark:bg-purple-800 rounded"></div>
                    <span>Midpoint</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-blue-400 bg-blue-100 dark:bg-blue-900 rounded"></div>
                    <span>New Element</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-green-500 bg-green-200 dark:bg-green-800 rounded"></div>
                    <span>Found/Active</span>
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

export default ListVisualizer;
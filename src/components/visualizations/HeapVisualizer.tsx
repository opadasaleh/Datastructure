import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useVisualization } from '../../contexts/VisualizationContext';

interface HeapNode {
    value: number;
    isActive: boolean;
    isHighlighted: boolean;
    isNew: boolean;
    isDeleting: boolean;
    isComparing: boolean;
    isSwapping: boolean;
    isRoot: boolean;
    isLeaf: boolean;
    x?: number;
    y?: number;
    index: number;
}

interface HeapVisualizerProps {
    operation: string;
    currentStep: number;
    onStepsChange: (totalSteps: number) => void;
    speed: number;
}

const HeapVisualizer: React.FC<HeapVisualizerProps> = ({
    operation,
    currentStep,
    onStepsChange,
    speed
}) => {
    const { theme } = useTheme();
    const { size } = useVisualization();
    const [heap, setHeap] = useState<HeapNode[]>([]);
    const [operationSteps, setOperationSteps] = useState<any[]>([]);
    const [heapType, setHeapType] = useState<'max' | 'min'>('max');

    useEffect(() => {
        // Initialize with a sample max heap
        const initialHeap: HeapNode[] = [
            { value: 90, index: 0, x: 300, y: 50, isActive: false, isHighlighted: false, isNew: false, isDeleting: false, isComparing: false, isSwapping: false, isRoot: true, isLeaf: false },
            { value: 80, index: 1, x: 200, y: 120, isActive: false, isHighlighted: false, isNew: false, isDeleting: false, isComparing: false, isSwapping: false, isRoot: false, isLeaf: false },
            { value: 70, index: 2, x: 400, y: 120, isActive: false, isHighlighted: false, isNew: false, isDeleting: false, isComparing: false, isSwapping: false, isRoot: false, isLeaf: false },
            { value: 60, index: 3, x: 150, y: 190, isActive: false, isHighlighted: false, isNew: false, isDeleting: false, isComparing: false, isSwapping: false, isRoot: false, isLeaf: false },
            { value: 50, index: 4, x: 250, y: 190, isActive: false, isHighlighted: false, isNew: false, isDeleting: false, isComparing: false, isSwapping: false, isRoot: false, isLeaf: true }
        ];
        setHeap(initialHeap);
        generateOperationSteps(initialHeap);
    }, [operation]);

    useEffect(() => {
        if (operationSteps[currentStep]) {
            setHeap(operationSteps[currentStep].heap);
        }
    }, [currentStep, operationSteps]);

    const generateOperationSteps = (initialHeap: HeapNode[]) => {
        const steps: any[] = [];
        
        // Initial state
        steps.push({
            heap: JSON.parse(JSON.stringify(initialHeap)),
            title: 'Initial Heap State',
            description: 'Starting with our max heap. The largest element is at the root.',
            explanation: 'A heap is a complete binary tree that satisfies the heap property. In a max heap, every parent node is greater than or equal to its children.',
            concept: 'Heap Property: Parent ≥ Children (Max Heap) or Parent ≤ Children (Min Heap)',
            heapDemo: 'Think of a corporate hierarchy - the CEO (root) has the highest authority, managers below, and so on!'
        });

        switch (operation) {
            case 'heap-insert': {
                const newValue = 85;
                let currentHeap = JSON.parse(JSON.stringify(initialHeap));

                // Step 1: Add new element at the end
                steps.push({
                    heap: JSON.parse(JSON.stringify(currentHeap)),
                    title: 'Step 1: Insert Strategy',
                    description: `Inserting value ${newValue} into the max heap.`,
                    explanation: 'In heap insertion, we first add the new element at the end of the heap (maintaining complete tree property), then bubble it up to restore heap property.',
                    concept: 'Heap insertion maintains the complete binary tree structure.',
                    heapDemo: 'Like adding a new employee at the bottom and promoting them based on performance!'
                });

                // Add new node at the end
                const newNode: HeapNode = {
                    value: newValue,
                    index: currentHeap.length,
                    x: 350,
                    y: 190,
                    isActive: false,
                    isHighlighted: false,
                    isNew: true,
                    isDeleting: false,
                    isComparing: false,
                    isSwapping: false,
                    isRoot: false,
                    isLeaf: true
                };

                currentHeap.push(newNode);
                steps.push({
                    heap: JSON.parse(JSON.stringify(currentHeap)),
                    title: 'Step 2: Add at End',
                    description: `Added ${newValue} at the end of the heap (index ${newNode.index}).`,
                    explanation: 'The new element is placed at the next available position to maintain the complete binary tree property.',
                    concept: 'Complete Binary Tree: All levels filled except possibly the last, which fills left to right.',
                    heapDemo: 'New employee starts at the entry level position!'
                });

                // Bubble up process
                let childIndex = currentHeap.length - 1;
                let parentIndex = Math.floor((childIndex - 1) / 2);

                while (childIndex > 0 && currentHeap[childIndex].value > currentHeap[parentIndex].value) {
                    // Highlight comparison
                    currentHeap[childIndex].isComparing = true;
                    currentHeap[parentIndex].isComparing = true;
                    
                    steps.push({
                        heap: JSON.parse(JSON.stringify(currentHeap)),
                        title: `Step ${steps.length}: Compare with Parent`,
                        description: `Comparing ${currentHeap[childIndex].value} with parent ${currentHeap[parentIndex].value}.`,
                        explanation: `Since ${currentHeap[childIndex].value} > ${currentHeap[parentIndex].value}, we need to swap them to maintain max heap property.`,
                        concept: 'Bubble Up: Compare with parent and swap if heap property is violated.',
                        heapDemo: 'Employee performs better than manager, so they get promoted!'
                    });

                    // Swap elements
                    currentHeap[childIndex].isComparing = false;
                    currentHeap[parentIndex].isComparing = false;
                    currentHeap[childIndex].isSwapping = true;
                    currentHeap[parentIndex].isSwapping = true;

                    const temp = currentHeap[childIndex].value;
                    currentHeap[childIndex].value = currentHeap[parentIndex].value;
                    currentHeap[parentIndex].value = temp;

                    steps.push({
                        heap: JSON.parse(JSON.stringify(currentHeap)),
                        title: `Step ${steps.length}: Swap Elements`,
                        description: `Swapped ${temp} with ${currentHeap[childIndex].value}.`,
                        explanation: 'The swap restores the heap property for this parent-child relationship.',
                        concept: 'Heap property is maintained through strategic swapping.',
                        heapDemo: 'Promotion complete - better performer moves up!'
                    });

                    currentHeap[childIndex].isSwapping = false;
                    currentHeap[parentIndex].isSwapping = false;
                    currentHeap[parentIndex].isNew = true;

                    // Move up the tree
                    childIndex = parentIndex;
                    parentIndex = Math.floor((childIndex - 1) / 2);
                }

                // Final state
                currentHeap.forEach(node => {
                    node.isNew = false;
                    node.isComparing = false;
                    node.isSwapping = false;
                });

                steps.push({
                    heap: JSON.parse(JSON.stringify(currentHeap)),
                    title: 'Insertion Complete',
                    description: `Successfully inserted ${newValue} into the max heap.`,
                    explanation: 'The heap property is restored. The new element has found its correct position in the heap.',
                    concept: 'Heap insertion time complexity: O(log n) due to tree height.',
                    heapDemo: 'Everyone is now in their correct position in the hierarchy!'
                });
                break;
            }

            case 'heap-extract': {
                let currentHeap = JSON.parse(JSON.stringify(initialHeap));

                // Step 1: Identify root
                steps.push({
                    heap: JSON.parse(JSON.stringify(currentHeap)),
                    title: 'Step 1: Extract Maximum',
                    description: 'Extracting the maximum element (root) from the heap.',
                    explanation: 'In a max heap, the root always contains the maximum element. This is the element we want to extract.',
                    concept: 'Heap Extract: Always removes the root element (max in max heap, min in min heap).',
                    heapDemo: 'The CEO is leaving the company - we need to reorganize!'
                });

                // Highlight root for extraction
                currentHeap[0].isHighlighted = true;
                steps.push({
                    heap: JSON.parse(JSON.stringify(currentHeap)),
                    title: 'Step 2: Mark Root for Removal',
                    description: `Root element ${currentHeap[0].value} will be extracted.`,
                    explanation: 'We mark the root for removal, but we need to maintain the heap structure after removal.',
                    concept: 'Root removal requires heap restructuring to maintain properties.',
                    heapDemo: 'Identifying the departing CEO before reorganization!'
                });

                // Move last element to root
                const lastElement = currentHeap[currentHeap.length - 1];
                const rootValue = currentHeap[0].value;
                
                currentHeap[0].isHighlighted = false;
                currentHeap[0].value = lastElement.value;
                currentHeap[0].isNew = true;
                currentHeap.pop(); // Remove last element

                steps.push({
                    heap: JSON.parse(JSON.stringify(currentHeap)),
                    title: 'Step 3: Replace Root',
                    description: `Moved last element ${lastElement.value} to root position.`,
                    explanation: 'We replace the root with the last element to maintain the complete binary tree structure, then restore heap property.',
                    concept: 'Replacement Strategy: Use last element to maintain tree completeness.',
                    heapDemo: 'Temporary CEO appointed - now we need to check if they\'re qualified!'
                });

                // Bubble down process
                let parentIndex = 0;
                
                while (true) {
                    let leftChild = 2 * parentIndex + 1;
                    let rightChild = 2 * parentIndex + 2;
                    let largest = parentIndex;

                    // Check if we have children to compare
                    if (leftChild >= currentHeap.length) break;

                    // Highlight comparison nodes
                    currentHeap[parentIndex].isComparing = true;
                    if (leftChild < currentHeap.length) {
                        currentHeap[leftChild].isComparing = true;
                    }
                    if (rightChild < currentHeap.length) {
                        currentHeap[rightChild].isComparing = true;
                    }

                    steps.push({
                        heap: JSON.parse(JSON.stringify(currentHeap)),
                        title: `Step ${steps.length}: Compare with Children`,
                        description: `Comparing parent ${currentHeap[parentIndex].value} with its children.`,
                        explanation: 'We compare the parent with its children to find the largest element that should be the parent.',
                        concept: 'Bubble Down: Compare with children and swap with larger child if needed.',
                        heapDemo: 'Checking if the temporary CEO is better than their subordinates!'
                    });

                    // Find the largest among parent and children
                    if (leftChild < currentHeap.length && currentHeap[leftChild].value > currentHeap[largest].value) {
                        largest = leftChild;
                    }
                    if (rightChild < currentHeap.length && currentHeap[rightChild].value > currentHeap[largest].value) {
                        largest = rightChild;
                    }

                    // Clear comparison highlighting
                    currentHeap.forEach(node => node.isComparing = false);

                    // If parent is already the largest, we're done
                    if (largest === parentIndex) {
                        steps.push({
                            heap: JSON.parse(JSON.stringify(currentHeap)),
                            title: `Step ${steps.length}: Heap Property Satisfied`,
                            description: 'Parent is larger than both children. Heap property is satisfied.',
                            explanation: 'No more swaps needed. The heap property is now restored throughout the tree.',
                            concept: 'Bubble down stops when parent ≥ children.',
                            heapDemo: 'The temporary CEO is indeed the best choice for the position!'
                        });
                        break;
                    }

                    // Swap parent with largest child
                    currentHeap[parentIndex].isSwapping = true;
                    currentHeap[largest].isSwapping = true;

                    const temp = currentHeap[parentIndex].value;
                    currentHeap[parentIndex].value = currentHeap[largest].value;
                    currentHeap[largest].value = temp;

                    steps.push({
                        heap: JSON.parse(JSON.stringify(currentHeap)),
                        title: `Step ${steps.length}: Swap with Larger Child`,
                        description: `Swapped ${currentHeap[largest].value} with ${currentHeap[parentIndex].value}.`,
                        explanation: 'The larger child becomes the parent to maintain the max heap property.',
                        concept: 'Swap with the larger child to maintain heap property.',
                        heapDemo: 'Better qualified person gets promoted to the higher position!'
                    });

                    currentHeap[parentIndex].isSwapping = false;
                    currentHeap[largest].isSwapping = false;

                    // Move down the tree
                    parentIndex = largest;
                }

                // Final state
                currentHeap.forEach(node => {
                    node.isNew = false;
                    node.isComparing = false;
                    node.isSwapping = false;
                });

                steps.push({
                    heap: JSON.parse(JSON.stringify(currentHeap)),
                    title: 'Extract Complete',
                    description: `Successfully extracted ${rootValue} from the heap.`,
                    explanation: 'The maximum element has been removed and the heap property is restored for the remaining elements.',
                    concept: 'Heap extract time complexity: O(log n) due to bubble down operation.',
                    heapDemo: 'Reorganization complete - everyone is in their proper position!'
                });
                break;
            }

            case 'heap-peek': {
                let currentHeap = JSON.parse(JSON.stringify(initialHeap));

                // Step 1: Explain peek operation
                steps.push({
                    heap: JSON.parse(JSON.stringify(currentHeap)),
                    title: 'Step 1: Heap Peek Operation',
                    description: 'Peeking at the maximum element without removing it.',
                    explanation: 'Peek operation allows us to see the maximum element (root) without modifying the heap structure.',
                    concept: 'Peek is O(1) operation - just access the root element.',
                    heapDemo: 'Like checking who the CEO is without affecting the company structure!'
                });

                // Highlight root
                currentHeap[0].isHighlighted = true;
                steps.push({
                    heap: JSON.parse(JSON.stringify(currentHeap)),
                    title: 'Step 2: Access Root Element',
                    description: `The maximum element is ${currentHeap[0].value} at the root.`,
                    explanation: 'In a max heap, the root always contains the maximum element, making peek operation very efficient.',
                    concept: 'Root element always contains the extreme value (max or min).',
                    heapDemo: 'The CEO is always at the top of the organizational chart!'
                });

                // Show the value
                currentHeap[0].isHighlighted = false;
                currentHeap[0].isActive = true;
                steps.push({
                    heap: JSON.parse(JSON.stringify(currentHeap)),
                    title: 'Step 3: Return Maximum Value',
                    description: `Peek operation returns ${currentHeap[0].value}.`,
                    explanation: 'The peek operation is complete. The heap remains unchanged.',
                    concept: 'Peek is non-destructive - heap structure remains intact.',
                    heapDemo: 'We know who the CEO is, and the company structure is unchanged!'
                });

                // Final state
                currentHeap[0].isActive = false;
                steps.push({
                    heap: JSON.parse(JSON.stringify(currentHeap)),
                    title: 'Peek Complete',
                    description: `Successfully peeked at maximum value ${currentHeap[0].value}.`,
                    explanation: 'Peek operation finished. The heap is unchanged and ready for other operations.',
                    concept: 'Peek is perfect for priority queue implementations.',
                    heapDemo: 'Quick check complete - back to normal operations!'
                });
                break;
            }

            case 'heap-heapify': {
                // Start with an unordered array
                let currentHeap: HeapNode[] = [
                    { value: 30, index: 0, x: 300, y: 50, isActive: false, isHighlighted: false, isNew: false, isDeleting: false, isComparing: false, isSwapping: false, isRoot: true, isLeaf: false },
                    { value: 90, index: 1, x: 200, y: 120, isActive: false, isHighlighted: false, isNew: false, isDeleting: false, isComparing: false, isSwapping: false, isRoot: false, isLeaf: false },
                    { value: 70, index: 2, x: 400, y: 120, isActive: false, isHighlighted: false, isNew: false, isDeleting: false, isComparing: false, isSwapping: false, isRoot: false, isLeaf: false },
                    { value: 60, index: 3, x: 150, y: 190, isActive: false, isHighlighted: false, isNew: false, isDeleting: false, isComparing: false, isSwapping: false, isRoot: false, isLeaf: true },
                    { value: 50, index: 4, x: 250, y: 190, isActive: false, isHighlighted: false, isNew: false, isDeleting: false, isComparing: false, isSwapping: false, isRoot: false, isLeaf: true }
                ];

                steps.push({
                    heap: JSON.parse(JSON.stringify(currentHeap)),
                    title: 'Step 1: Unordered Array',
                    description: 'Starting with an unordered array that violates heap property.',
                    explanation: 'Heapify transforms an arbitrary array into a valid heap. We start from the last non-leaf node and work backwards.',
                    concept: 'Heapify: Convert any array into a valid heap structure.',
                    heapDemo: 'Like reorganizing a company where people are in wrong positions!'
                });

                // Heapify process - start from last non-leaf node
                const lastNonLeaf = Math.floor((currentHeap.length - 2) / 2);
                
                for (let i = lastNonLeaf; i >= 0; i--) {
                    // Highlight current node being heapified
                    currentHeap[i].isHighlighted = true;
                    
                    steps.push({
                        heap: JSON.parse(JSON.stringify(currentHeap)),
                        title: `Step ${steps.length}: Heapify Node ${i}`,
                        description: `Heapifying subtree rooted at index ${i} with value ${currentHeap[i].value}.`,
                        explanation: 'We ensure this node and its subtree satisfy the heap property by bubbling down if necessary.',
                        concept: 'Bottom-up heapify: Start from leaves and work towards root.',
                        heapDemo: 'Checking each manager to ensure they\'re better than their team!'
                    });

                    // Bubble down for this subtree
                    let parentIndex = i;
                    
                    while (true) {
                        let leftChild = 2 * parentIndex + 1;
                        let rightChild = 2 * parentIndex + 2;
                        let largest = parentIndex;

                        if (leftChild >= currentHeap.length) break;

                        // Compare with children
                        if (leftChild < currentHeap.length && currentHeap[leftChild].value > currentHeap[largest].value) {
                            largest = leftChild;
                        }
                        if (rightChild < currentHeap.length && currentHeap[rightChild].value > currentHeap[largest].value) {
                            largest = rightChild;
                        }

                        if (largest === parentIndex) break;

                        // Swap
                        currentHeap[parentIndex].isSwapping = true;
                        currentHeap[largest].isSwapping = true;

                        const temp = currentHeap[parentIndex].value;
                        currentHeap[parentIndex].value = currentHeap[largest].value;
                        currentHeap[largest].value = temp;

                        steps.push({
                            heap: JSON.parse(JSON.stringify(currentHeap)),
                            title: `Step ${steps.length}: Swap in Subtree`,
                            description: `Swapped ${currentHeap[largest].value} with ${currentHeap[parentIndex].value}.`,
                            explanation: 'Swapping to maintain heap property in this subtree.',
                            concept: 'Local heap property restoration through swapping.',
                            heapDemo: 'Promoting the better performer to management position!'
                        });

                        currentHeap[parentIndex].isSwapping = false;
                        currentHeap[largest].isSwapping = false;
                        parentIndex = largest;
                    }

                    currentHeap[i].isHighlighted = false;
                }

                steps.push({
                    heap: JSON.parse(JSON.stringify(currentHeap)),
                    title: 'Heapify Complete',
                    description: 'Successfully converted the array into a valid max heap.',
                    explanation: 'The heapify operation is complete. All nodes now satisfy the heap property.',
                    concept: 'Heapify time complexity: O(n) - more efficient than n insertions.',
                    heapDemo: 'Company reorganization complete - everyone is in the right position!'
                });
                break;
            }
        }

        setOperationSteps(steps);
        onStepsChange(steps.length);
    };

    const currentStepData = operationSteps[currentStep] || {};

    const renderConnections = () => {
        const connections = [];
        
        for (let i = 0; i < heap.length; i++) {
            const leftChild = 2 * i + 1;
            const rightChild = 2 * i + 2;
            
            if (leftChild < heap.length) {
                connections.push(
                    <line
                        key={`line-${i}-${leftChild}`}
                        x1={heap[i].x}
                        y1={heap[i].y! + 25}
                        x2={heap[leftChild].x}
                        y2={heap[leftChild].y! + 25}
                        stroke={theme === 'dark' ? '#6B7280' : '#9CA3AF'}
                        strokeWidth="2"
                    />
                );
            }
            
            if (rightChild < heap.length) {
                connections.push(
                    <line
                        key={`line-${i}-${rightChild}`}
                        x1={heap[i].x}
                        y1={heap[i].y! + 25}
                        x2={heap[rightChild].x}
                        y2={heap[rightChild].y! + 25}
                        stroke={theme === 'dark' ? '#6B7280' : '#9CA3AF'}
                        strokeWidth="2"
                    />
                );
            }
        }
        
        return connections;
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8">
            {/* Operation Title */}
            <h3 className="text-2xl font-bold mb-4 text-center">
                {operation === 'heap-insert' && 'Heap Insertion (Add Element)'}
                {operation === 'heap-extract' && 'Heap Extract (Remove Maximum)'}
                {operation === 'heap-peek' && 'Heap Peek (View Maximum)'}
                {operation === 'heap-heapify' && 'Heapify (Build Heap from Array)'}
            </h3>

            {/* Current Step Info */}
            <div className={`
                mb-6 p-4 rounded-lg text-center max-w-4xl
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
                {currentStepData.heapDemo && (
                    <div className={`
                        mt-2 p-2 rounded text-xs font-medium
                        ${theme === 'dark' ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-800'}
                    `}>
                        🏢 Heap Analogy: {currentStepData.heapDemo}
                    </div>
                )}
            </div>

            {/* Heap Info Panel */}
            <div className={`
                mb-6 p-3 rounded-lg text-center
                ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}
            `}>
                <div className="flex justify-center space-x-6 text-sm">
                    <div>
                        <span className="font-semibold">Type: </span>
                        <span className="text-red-500 font-bold">Max Heap</span>
                    </div>
                    <div>
                        <span className="font-semibold">Size: </span>
                        <span className="text-blue-500 font-bold">{heap.length}</span>
                    </div>
                    <div>
                        <span className="font-semibold">Root: </span>
                        <span className="text-green-500 font-bold">{heap.length > 0 ? heap[0].value : 'Empty'}</span>
                    </div>
                </div>
            </div>

            {/* Heap visualization */}
            <div className="flex-1 w-full overflow-auto mb-8">
                <div 
                    className="min-w-[600px] min-h-[300px] relative"
                    style={{ transform: `scale(${size})`, transformOrigin: 'center' }}
                >
                    <svg width="600" height="300" className="w-full h-full">
                        {/* Render connections first */}
                        {renderConnections()}
                        
                        {/* Render nodes */}
                        {heap.map((node, index) => (
                            <g key={index}>
                                {/* Node circle */}
                                <circle
                                    cx={node.x}
                                    cy={node.y! + 25}
                                    r="25"
                                    fill={
                                        node.isNew ? '#3B82F6' :
                                        node.isDeleting ? '#EF4444' :
                                        node.isHighlighted ? '#F59E0B' :
                                        node.isComparing ? '#8B5CF6' :
                                        node.isSwapping ? '#EC4899' :
                                        node.isActive ? '#10B981' :
                                        node.isRoot ? '#DC2626' :
                                        theme === 'dark' ? '#374151' : '#F3F4F6'
                                    }
                                    stroke={theme === 'dark' ? '#6B7280' : '#9CA3AF'}
                                    strokeWidth="2"
                                    className="transition-all duration-500"
                                />
                                
                                {/* Node value */}
                                <text
                                    x={node.x}
                                    y={node.y! + 30}
                                    textAnchor="middle"
                                    className={`text-sm font-bold ${
                                        node.isNew || node.isDeleting || node.isHighlighted || 
                                        node.isComparing || node.isSwapping || node.isActive || node.isRoot ? 
                                        'fill-white' :
                                        theme === 'dark' ? 'fill-white' : 'fill-gray-900'
                                    }`}
                                >
                                    {node.value}
                                </text>
                                
                                {/* Index label */}
                                <text
                                    x={node.x}
                                    y={node.y! + 45}
                                    textAnchor="middle"
                                    className="text-xs fill-gray-500"
                                >
                                    [{node.index}]
                                </text>
                            </g>
                        ))}
                    </svg>
                </div>
            </div>

            {/* Heap Properties Explanation */}
            <div className={`
                mb-6 p-4 rounded-lg max-w-4xl
                ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}
            `}>
                <h4 className="text-lg font-semibold mb-3 text-center">Understanding Heap Properties</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-red-900/30' : 'bg-red-100'}`}>
                        <h5 className="font-bold mb-2">🔺 Max Heap Property</h5>
                        <ul className="space-y-1 text-xs">
                            <li>• <strong>Parent ≥ Children:</strong> Every parent is larger than its children</li>
                            <li>• <strong>Root Maximum:</strong> Largest element is always at the root</li>
                            <li>• <strong>Use Case:</strong> Priority queues, heap sort (descending)</li>
                            <li>• <strong>Extract:</strong> Always removes the maximum element</li>
                        </ul>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                        <h5 className="font-bold mb-2">🌳 Complete Binary Tree</h5>
                        <ul className="space-y-1 text-xs">
                            <li>• <strong>Structure:</strong> All levels filled except possibly the last</li>
                            <li>• <strong>Left-to-Right:</strong> Last level fills from left to right</li>
                            <li>• <strong>Array Representation:</strong> Parent at i, children at 2i+1, 2i+2</li>
                            <li>• <strong>Height:</strong> Always O(log n) for n elements</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100'}`}>
                        <h5 className="font-bold mb-2">⚡ Time Complexities</h5>
                        <ul className="space-y-1 text-xs">
                            <li>• <strong>Insert:</strong> O(log n) - bubble up</li>
                            <li>• <strong>Extract:</strong> O(log n) - bubble down</li>
                            <li>• <strong>Peek:</strong> O(1) - just access root</li>
                            <li>• <strong>Heapify:</strong> O(n) - build from array</li>
                        </ul>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
                        <h5 className="font-bold mb-2">🎯 Applications</h5>
                        <ul className="space-y-1 text-xs">
                            <li>• <strong>Priority Queues:</strong> Task scheduling, Dijkstra's algorithm</li>
                            <li>• <strong>Heap Sort:</strong> Efficient O(n log n) sorting</li>
                            <li>• <strong>Graph Algorithms:</strong> Minimum spanning tree</li>
                            <li>• <strong>Memory Management:</strong> Heap allocation</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 text-xs mb-4">
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-red-600 bg-red-600 rounded-full"></div>
                    <span>Root (Maximum)</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-purple-400 bg-purple-400 rounded-full"></div>
                    <span>Comparing</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-pink-500 bg-pink-500 rounded-full"></div>
                    <span>Swapping</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-blue-400 bg-blue-400 rounded-full"></div>
                    <span>New Element</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-green-500 bg-green-500 rounded-full"></div>
                    <span>Active/Found</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-yellow-400 bg-yellow-400 rounded-full"></div>
                    <span>Highlighted</span>
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

export default HeapVisualizer;
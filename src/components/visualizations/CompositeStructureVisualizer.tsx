import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useVisualization } from '../../contexts/VisualizationContext';

interface CompositeStructureVisualizerProps {
    operation: string;
    currentStep: number;
    onStepsChange: (totalSteps: number) => void;
    speed: number;
}

const CompositeStructureVisualizer: React.FC<CompositeStructureVisualizerProps> = ({
    operation,
    currentStep,
    onStepsChange,
    speed
}) => {
    const { theme } = useTheme();
    const { size } = useVisualization();
    const [operationSteps, setOperationSteps] = useState<any[]>([]);

    useEffect(() => {
        generateOperationSteps();
    }, [operation]);

    const generateOperationSteps = () => {
        const steps: any[] = [];

        switch (operation) {
            case 'stack-using-array': {
                steps.push({
                    title: 'Stack Using Array',
                    description: 'Building a Stack data structure using an Array',
                    array: [null, null, null, null, null],
                    top: -1,
                    operation: 'init'
                });

                // Push operations
                steps.push({
                    title: 'Push 10',
                    description: 'Add element to top of stack',
                    array: [10, null, null, null, null],
                    top: 0,
                    operation: 'push',
                    highlight: 0
                });

                steps.push({
                    title: 'Push 20',
                    description: 'Add another element',
                    array: [10, 20, null, null, null],
                    top: 1,
                    operation: 'push',
                    highlight: 1
                });

                steps.push({
                    title: 'Push 30',
                    description: 'Stack grows upward',
                    array: [10, 20, 30, null, null],
                    top: 2,
                    operation: 'push',
                    highlight: 2
                });

                // Pop operation
                steps.push({
                    title: 'Pop',
                    description: 'Remove top element (30)',
                    array: [10, 20, null, null, null],
                    top: 1,
                    operation: 'pop',
                    highlight: 2
                });
                break;
            }

            case 'queue-using-array': {
                steps.push({
                    title: 'Queue Using Array',
                    description: 'Building a Queue data structure using an Array',
                    array: [null, null, null, null, null],
                    front: 0,
                    rear: -1,
                    operation: 'init'
                });

                steps.push({
                    title: 'Enqueue 10',
                    description: 'Add to rear of queue',
                    array: [10, null, null, null, null],
                    front: 0,
                    rear: 0,
                    operation: 'enqueue',
                    highlight: 0
                });

                steps.push({
                    title: 'Enqueue 20',
                    description: 'Add another element',
                    array: [10, 20, null, null, null],
                    front: 0,
                    rear: 1,
                    operation: 'enqueue',
                    highlight: 1
                });

                steps.push({
                    title: 'Dequeue',
                    description: 'Remove from front (10)',
                    array: [null, 20, null, null, null],
                    front: 1,
                    rear: 1,
                    operation: 'dequeue',
                    highlight: 0
                });
                break;
            }

            case 'graph-using-array': {
                steps.push({
                    title: 'Graph Using Adjacency Matrix',
                    description: 'Representing a graph with a 2D array',
                    matrix: [
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    nodes: ['A', 'B', 'C', 'D'],
                    operation: 'init'
                });

                steps.push({
                    title: 'Add Edge A-B',
                    description: 'Connect node A to node B',
                    matrix: [
                        [0, 1, 0, 0],
                        [1, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    nodes: ['A', 'B', 'C', 'D'],
                    operation: 'add-edge',
                    highlight: [[0, 1], [1, 0]]
                });

                steps.push({
                    title: 'Add Edge B-C',
                    description: 'Connect node B to node C',
                    matrix: [
                        [0, 1, 0, 0],
                        [1, 0, 1, 0],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    nodes: ['A', 'B', 'C', 'D'],
                    operation: 'add-edge',
                    highlight: [[1, 2], [2, 1]]
                });
                break;
            }

            case 'hash-table-using-array': {
                steps.push({
                    title: 'Hash Table Using Array',
                    description: 'Building a hash table with array and hash function',
                    array: [null, null, null, null, null],
                    hashFunction: 'key % 5',
                    operation: 'init'
                });

                steps.push({
                    title: 'Insert "apple" (hash: 2)',
                    description: 'Hash function maps "apple" to index 2',
                    array: [null, null, 'apple', null, null],
                    hashFunction: 'key % 5',
                    operation: 'insert',
                    highlight: 2,
                    key: 'apple'
                });

                steps.push({
                    title: 'Insert "banana" (hash: 4)',
                    description: 'Hash function maps "banana" to index 4',
                    array: [null, null, 'apple', null, 'banana'],
                    hashFunction: 'key % 5',
                    operation: 'insert',
                    highlight: 4,
                    key: 'banana'
                });

                steps.push({
                    title: 'Search "apple"',
                    description: 'Hash to index 2 and find the value',
                    array: [null, null, 'apple', null, 'banana'],
                    hashFunction: 'key % 5',
                    operation: 'search',
                    highlight: 2,
                    key: 'apple'
                });
                break;
            }
        }

        setOperationSteps(steps);
        onStepsChange(steps.length);
    };

    const renderVisualization = () => {
        if (!operationSteps[currentStep]) return null;

        const step = operationSteps[currentStep];

        switch (operation) {
            case 'stack-using-array':
                return (
                    <div className="flex flex-col items-center space-y-8">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-2">Stack Implementation</h3>
                            <p className="text-gray-600 dark:text-gray-400">Using Array as underlying storage</p>
                        </div>

                        <div className="flex flex-col items-center space-y-4">
                            <div className="text-sm font-mono">
                                top = {step.top}
                            </div>
                            
                            <div className="flex flex-col-reverse space-y-reverse space-y-1">
                                {step.array.map((value: any, index: number) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <div className="text-xs w-8">{index}</div>
                                        <div
                                            className={`
                                                w-20 h-12 border-2 flex items-center justify-center font-bold
                                                ${step.highlight === index ? 'border-blue-500 bg-blue-100 dark:bg-blue-900' : ''}
                                                ${index === step.top ? 'border-green-500 bg-green-100 dark:bg-green-900' : ''}
                                                ${!step.highlight && index !== step.top ? 
                                                    (theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-white') : ''}
                                            `}
                                        >
                                            {value || ''}
                                        </div>
                                        {index === step.top && (
                                            <div className="text-sm text-green-600 dark:text-green-400">← TOP</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'queue-using-array':
                return (
                    <div className="flex flex-col items-center space-y-8">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-2">Queue Implementation</h3>
                            <p className="text-gray-600 dark:text-gray-400">Using Array with front and rear pointers</p>
                        </div>

                        <div className="flex flex-col items-center space-y-4">
                            <div className="text-sm font-mono space-x-4">
                                <span>front = {step.front}</span>
                                <span>rear = {step.rear}</span>
                            </div>
                            
                            <div className="flex space-x-1">
                                {step.array.map((value: any, index: number) => (
                                    <div key={index} className="flex flex-col items-center space-y-1">
                                        <div className="text-xs">{index}</div>
                                        <div
                                            className={`
                                                w-16 h-16 border-2 flex items-center justify-center font-bold
                                                ${step.highlight === index ? 'border-blue-500 bg-blue-100 dark:bg-blue-900' : ''}
                                                ${index === step.front && step.front <= step.rear ? 'border-purple-500 bg-purple-100 dark:bg-purple-900' : ''}
                                                ${index === step.rear && step.rear >= 0 ? 'border-orange-500 bg-orange-100 dark:bg-orange-900' : ''}
                                                ${!step.highlight && index !== step.front && index !== step.rear ? 
                                                    (theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-white') : ''}
                                            `}
                                        >
                                            {value || ''}
                                        </div>
                                        <div className="text-xs space-y-1">
                                            {index === step.front && step.front <= step.rear && (
                                                <div className="text-purple-600 dark:text-purple-400">FRONT</div>
                                            )}
                                            {index === step.rear && step.rear >= 0 && (
                                                <div className="text-orange-600 dark:text-orange-400">REAR</div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'graph-using-array':
                return (
                    <div className="flex flex-col items-center space-y-8">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-2">Graph as Adjacency Matrix</h3>
                            <p className="text-gray-600 dark:text-gray-400">Using 2D Array to represent connections</p>
                        </div>

                        <div className="flex space-x-8 items-center">
                            {/* Matrix */}
                            <div className="flex flex-col">
                                <div className="flex">
                                    <div className="w-8"></div>
                                    {step.nodes.map((node: string, i: number) => (
                                        <div key={i} className="w-12 h-8 flex items-center justify-center font-bold">
                                            {node}
                                        </div>
                                    ))}
                                </div>
                                {step.matrix.map((row: number[], i: number) => (
                                    <div key={i} className="flex">
                                        <div className="w-8 h-12 flex items-center justify-center font-bold">
                                            {step.nodes[i]}
                                        </div>
                                        {row.map((cell: number, j: number) => (
                                            <div
                                                key={j}
                                                className={`
                                                    w-12 h-12 border flex items-center justify-center font-bold
                                                    ${step.highlight?.some((pos: number[]) => pos[0] === i && pos[1] === j) ? 
                                                        'border-blue-500 bg-blue-100 dark:bg-blue-900' : ''}
                                                    ${cell === 1 ? 'bg-green-100 dark:bg-green-900' : ''}
                                                    ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}
                                                `}
                                            >
                                                {cell}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            {/* Visual Graph */}
                            <div className="relative w-48 h-48">
                                <svg width="192" height="192" className="absolute inset-0">
                                    {/* Nodes */}
                                    <circle cx="48" cy="48" r="20" fill={theme === 'dark' ? '#374151' : '#F3F4F6'} stroke="#6B7280" strokeWidth="2" />
                                    <text x="48" y="53" textAnchor="middle" className="text-sm font-bold fill-current">A</text>
                                    
                                    <circle cx="144" cy="48" r="20" fill={theme === 'dark' ? '#374151' : '#F3F4F6'} stroke="#6B7280" strokeWidth="2" />
                                    <text x="144" y="53" textAnchor="middle" className="text-sm font-bold fill-current">B</text>
                                    
                                    <circle cx="144" cy="144" r="20" fill={theme === 'dark' ? '#374151' : '#F3F4F6'} stroke="#6B7280" strokeWidth="2" />
                                    <text x="144" y="149" textAnchor="middle" className="text-sm font-bold fill-current">C</text>
                                    
                                    <circle cx="48" cy="144" r="20" fill={theme === 'dark' ? '#374151' : '#F3F4F6'} stroke="#6B7280" strokeWidth="2" />
                                    <text x="48" y="149" textAnchor="middle" className="text-sm font-bold fill-current">D</text>

                                    {/* Edges */}
                                    {step.matrix[0][1] === 1 && (
                                        <line x1="68" y1="48" x2="124" y2="48" stroke="#3B82F6" strokeWidth="3" />
                                    )}
                                    {step.matrix[1][2] === 1 && (
                                        <line x1="144" y1="68" x2="144" y2="124" stroke="#3B82F6" strokeWidth="3" />
                                    )}
                                </svg>
                            </div>
                        </div>
                    </div>
                );

            case 'hash-table-using-array':
                return (
                    <div className="flex flex-col items-center space-y-8">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-2">Hash Table Implementation</h3>
                            <p className="text-gray-600 dark:text-gray-400">Using Array + Hash Function</p>
                        </div>

                        <div className="flex flex-col items-center space-y-6">
                            <div className="text-center">
                                <div className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded">
                                    Hash Function: {step.hashFunction}
                                </div>
                                {step.key && (
                                    <div className="text-sm mt-2">
                                        "{step.key}" → hash({step.key}) = {step.highlight}
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex space-x-1">
                                {step.array.map((value: any, index: number) => (
                                    <div key={index} className="flex flex-col items-center space-y-1">
                                        <div className="text-xs">{index}</div>
                                        <div
                                            className={`
                                                w-20 h-16 border-2 flex items-center justify-center font-bold text-sm
                                                ${step.highlight === index ? 'border-blue-500 bg-blue-100 dark:bg-blue-900' : ''}
                                                ${value ? 'bg-green-100 dark:bg-green-900' : ''}
                                                ${theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-white'}
                                            `}
                                        >
                                            {value || 'null'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            default:
                return <div>Visualization not available</div>;
        }
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8" style={{ transform: `scale(${size})` }}>
            {renderVisualization()}
            
            <div className="mt-8 text-center">
                <h4 className="text-lg font-semibold mb-2">
                    {operationSteps[currentStep]?.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {operationSteps[currentStep]?.description}
                </p>
            </div>
        </div>
    );
};

export default CompositeStructureVisualizer;
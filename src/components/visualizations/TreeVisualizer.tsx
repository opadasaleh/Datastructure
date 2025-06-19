import React, { useState, useEffect } from 'react';

interface TreeNode {
    value: number;
    left?: TreeNode;
    right?: TreeNode;
}

interface TreeVisualizerProps {
    operation: string;
    values: number[];
}

const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ operation, values }) => {
    const [tree, setTree] = useState<TreeNode | null>(null);
    const [steps, setSteps] = useState<string[]>([]);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const operationSteps = generateOperationSteps(operation, values);
        setSteps(operationSteps);
        setCurrentStep(0);
    }, [operation, values]);

    const generateOperationSteps = (operation: string, values: number[]): string[] => {
        const steps: string[] = [];
        
        switch (operation) {
            case 'insert':
                values.forEach(value => {
                    steps.push(`Inserting ${value} into the tree`);
                });
                break;
            case 'delete':
                values.forEach(value => {
                    steps.push(`Deleting ${value} from the tree`);
                });
                break;
            case 'search':
                values.forEach(value => {
                    steps.push(`Searching for ${value} in the tree`);
                });
                break;
            default:
                steps.push('Unknown operation');
        }
        
        return steps;
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-4 text-center">Tree Visualizer</h2>
                
                <div className="mb-4">
                    <p className="text-lg font-semibold">Operation: {operation}</p>
                    <p className="text-md">Values: {values.join(', ')}</p>
                </div>

                <div className="border-2 border-gray-300 rounded-lg p-4 min-h-64 flex items-center justify-center">
                    <p className="text-gray-500">Tree visualization will be rendered here</p>
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Steps:</h3>
                    <div className="space-y-2">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`p-2 rounded ${
                                    index === currentStep
                                        ? 'bg-blue-100 border-blue-300'
                                        : 'bg-gray-100'
                                }`}
                            >
                                {step}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4 flex justify-center space-x-4">
                    <button
                        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                        disabled={currentStep === 0}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                        disabled={currentStep === steps.length - 1}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TreeVisualizer;
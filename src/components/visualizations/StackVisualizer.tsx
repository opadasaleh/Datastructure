import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useVisualization } from '../../contexts/VisualizationContext';

interface StackElement {
    value: number;
    isActive: boolean;
    isHighlighted: boolean;
    isNew: boolean;
    isDeleting: boolean;
    isTop: boolean;
    isPeeking: boolean;
    isSearching: boolean;
    isFound: boolean;
}

interface StackVisualizerProps {
    operation: string;
    currentStep: number;
    onStepsChange: (totalSteps: number) => void;
    speed: number;
}

const StackVisualizer: React.FC<StackVisualizerProps> = ({
    operation,
    currentStep,
    onStepsChange,
    speed
}) => {
    const { theme } = useTheme();
    const { size } = useVisualization();
    const [elements, setElements] = useState<StackElement[]>([]);
    const [operationSteps, setOperationSteps] = useState<any[]>([]);
    const [stackInfo, setStackInfo] = useState({ top: -1, size: 0, capacity: 5 });

    useEffect(() => {
        const initialSize = 3;
        const newElements: StackElement[] = Array.from({ length: initialSize }, (_, index) => ({
            value: (index + 1) * 10,
            isActive: false,
            isHighlighted: false,
            isNew: false,
            isDeleting: false,
            isTop: index === initialSize - 1,
            isPeeking: false,
            isSearching: false,
            isFound: false
        }));
        setElements(newElements);
        setStackInfo({ top: initialSize - 1, size: initialSize, capacity: 5 });
        generateOperationSteps(newElements);
    }, [operation]);

    useEffect(() => {
        if (operationSteps[currentStep]) {
            setElements(operationSteps[currentStep].elements);
            setStackInfo(operationSteps[currentStep].stackInfo);
        }
    }, [currentStep, operationSteps]);

    const generateOperationSteps = (initialStack: StackElement[]) => {
        const steps: any[] = [];
        
        // Initial state
        steps.push({
            elements: JSON.parse(JSON.stringify(initialStack)),
            stackInfo: { top: initialStack.length - 1, size: initialStack.length, capacity: 5 },
            title: 'Initial Stack State',
            description: 'Starting with our stack. Elements follow LIFO (Last In, First Out) principle.',
            explanation: 'A stack is a linear data structure that follows LIFO principle. Elements are added and removed from the same end, called the "top" of the stack.',
            concept: 'Stack follows LIFO: Last element added is the first to be removed.',
            lifoDemo: 'Think of a stack of plates - you add and remove plates from the top only!'
        });

        switch (operation) {
            case 'stack-push': {
                const newValue = 40;
                let stack = JSON.parse(JSON.stringify(initialStack));
                let info = { top: initialStack.length - 1, size: initialStack.length, capacity: 5 };

                // Step 1: Check stack capacity
                steps.push({
                    elements: JSON.parse(JSON.stringify(stack)),
                    stackInfo: { ...info },
                    title: 'Step 1: Check Stack Capacity',
                    description: 'Before pushing an element, we check if the stack has space available.',
                    explanation: 'Stack overflow occurs when we try to push onto a full stack. Always check capacity before pushing to prevent overflow.',
                    concept: 'Always verify stack capacity before push operation to prevent overflow.',
                    lifoDemo: 'Like checking if you can add another plate to a stack without it falling!'
                });

                // Step 2: Highlight current top
                if (stack.length > 0) {
                    stack[info.top].isHighlighted = true;
                }
                steps.push({
                    elements: JSON.parse(JSON.stringify(stack)),
                    stackInfo: { ...info },
                    title: 'Step 2: Identify Current Top',
                    description: `Current top element is at index ${info.top} with value ${stack[info.top]?.value || 'N/A'}.`,
                    explanation: 'The top pointer indicates where the last element was added. New elements are always added above the current top.',
                    concept: 'Top pointer tracks the most recently added element.',
                    lifoDemo: 'The top plate is the one you added most recently!'
                });

                // Step 3: Increment top pointer and add element
                if (stack.length > 0) {
                    stack[info.top].isHighlighted = false;
                    stack[info.top].isTop = false;
                }
                info.top++;
                info.size++;
                
                const newElement: StackElement = {
                    value: newValue,
                    isActive: false,
                    isHighlighted: false,
                    isNew: true,
                    isDeleting: false,
                    isTop: true,
                    isPeeking: false,
                    isSearching: false,
                    isFound: false
                };

                stack.push(newElement);
                steps.push({
                    elements: JSON.parse(JSON.stringify(stack)),
                    stackInfo: { ...info },
                    title: 'Step 3: Push New Element',
                    description: `Pushed element ${newValue} onto the stack. Top pointer updated to index ${info.top}.`,
                    explanation: 'The new element is placed on top of the stack, and the top pointer is incremented to point to this new element.',
                    concept: 'Push adds element at top and updates top pointer.',
                    lifoDemo: 'Added a new plate on top of the stack!'
                });

                // Step 4: Update stack state
                stack[info.top].isNew = false;
                steps.push({
                    elements: JSON.parse(JSON.stringify(stack)),
                    stackInfo: { ...info },
                    title: 'Step 4: Update Stack State',
                    description: 'Stack size increased. The new element is now the top of the stack.',
                    explanation: 'The push operation is complete. The stack now has one more element, and the top pointer correctly identifies the newest element.',
                    concept: 'Stack size increases by 1 after successful push.',
                    lifoDemo: 'The stack is now taller with the new plate on top!'
                });

                // Step 5: Final state
                steps.push({
                    elements: JSON.parse(JSON.stringify(stack)),
                    stackInfo: { ...info },
                    title: 'Push Complete',
                    description: `Element ${newValue} successfully pushed onto the stack.`,
                    explanation: 'Push operation finished. The stack maintains LIFO order with the new element accessible at the top.',
                    concept: 'New elements are always accessible first due to LIFO principle.',
                    lifoDemo: 'Ready to add more plates or remove the top one!'
                });
                break;
            }

            case 'stack-pop': {
                let stack = JSON.parse(JSON.stringify(initialStack));
                let info = { top: initialStack.length - 1, size: initialStack.length, capacity: 5 };

                // Step 1: Check if stack is empty
                steps.push({
                    elements: JSON.parse(JSON.stringify(stack)),
                    stackInfo: { ...info },
                    title: 'Step 1: Check Stack Status',
                    description: 'Before popping an element, check if the stack is empty.',
                    explanation: 'Stack underflow occurs when we try to pop from an empty stack. Always check if stack has elements before popping.',
                    concept: 'Always verify stack is not empty before pop operation.',
                    lifoDemo: 'Check if there are any plates to remove from the stack!'
                });

                // Step 2: Highlight top element
                stack[info.top].isHighlighted = true;
                steps.push({
                    elements: JSON.parse(JSON.stringify(stack)),
                    stackInfo: { ...info },
                    title: 'Step 2: Identify Top Element',
                    description: `Top element with value ${stack[info.top].value} will be removed.`,
                    explanation: 'The top pointer indicates which element will be removed. In LIFO, the most recently added element (last in) is removed first.',
                    concept: 'Top pointer identifies the next element to be removed.',
                    lifoDemo: 'The top plate is the one we\'ll remove first!'
                });

                // Step 3: Mark for removal
                stack[info.top].isHighlighted = false;
                stack[info.top].isDeleting = true;
                steps.push({
                    elements: JSON.parse(JSON.stringify(stack)),
                    stackInfo: { ...info },
                    title: 'Step 3: Mark Element for Removal',
                    description: 'Preparing to remove the top element from the stack.',
                    explanation: 'The element is marked for deletion. In a real implementation, we would save its value to return to the caller.',
                    concept: 'Pop returns the value of the removed element.',
                    lifoDemo: 'Carefully lifting the top plate from the stack!'
                });

                // Step 4: Remove element and update top
                const removedValue = stack[info.top].value;
                stack.pop();
                info.top--;
                info.size--;
                
                if (stack.length > 0) {
                    stack[info.top].isTop = true;
                }

                steps.push({
                    elements: JSON.parse(JSON.stringify(stack)),
                    stackInfo: { ...info },
                    title: 'Step 4: Remove Element',
                    description: `Element ${removedValue} removed. Top pointer updated to index ${info.top}.`,
                    explanation: 'The top element is removed from the stack. The top pointer now points to what was previously the second-to-top element.',
                    concept: 'After pop, the previous element becomes the new top.',
                    lifoDemo: 'Removed the top plate, revealing the one underneath!'
                });

                // Step 5: Update stack state
                steps.push({
                    elements: JSON.parse(JSON.stringify(stack)),
                    stackInfo: { ...info },
                    title: 'Step 5: Update Stack State',
                    description: 'Stack size decreased. The previous element is now the top.',
                    explanation: 'The pop operation is complete. The stack is smaller but maintains LIFO ordering for remaining elements.',
                    concept: 'Stack size decreases by 1 after successful pop.',
                    lifoDemo: 'The stack is now shorter, ready for the next operation!'
                });

                // Step 6: Final state
                steps.push({
                    elements: JSON.parse(JSON.stringify(stack)),
                    stackInfo: { ...info },
                    title: 'Pop Complete',
                    description: `Successfully removed element ${removedValue} from the top of the stack.`,
                    explanation: 'Pop operation finished. The most recently added element has been removed, maintaining LIFO principle.',
                    concept: 'Pop always removes the most recently added element.',
                    lifoDemo: 'Stack operation complete - LIFO principle maintained!'
                });
                break;
            }

            case 'stack-peek': {
                let stack = JSON.parse(JSON.stringify(initialStack));
                let info = { top: initialStack.length - 1, size: initialStack.length, capacity: 5 };

                // Step 1: Check stack status
                steps.push({
                    elements: JSON.parse(JSON.stringify(stack)),
                    stackInfo: { ...info },
                    title: 'Step 1: Check Stack Status',
                    description: 'Verify the stack is not empty before peeking.',
                    explanation: 'Peek operation requires at least one element in the stack. Empty stack peek would cause an error.',
                    concept: 'Always verify stack has elements before peek operation.',
                    lifoDemo: 'Check if there are any plates to look at!'
                });

                // Step 2: Highlight top element
                stack[info.top].isPeeking = true;
                steps.push({
                    elements: JSON.parse(JSON.stringify(stack)),
                    stackInfo: { ...info },
                    title: 'Step 2: Locate Top Element',
                    description: `Top element is at index ${info.top} with value ${stack[info.top].value}.`,
                    explanation: 'The top pointer indicates which element we can peek at. This is the element that would be removed next by a pop operation.',
                    concept: 'Peek shows the top element without removing it.',
                    lifoDemo: 'Looking at the top plate without picking it up!'
                });

                // Step 3: Access top value
                stack[info.top].isPeeking = false;
                stack[info.top].isActive = true;
                steps.push({
                    elements: JSON.parse(JSON.stringify(stack)),
                    stackInfo: { ...info },
                    title: 'Step 3: Access Top Value',
                    description: `Reading value ${stack[info.top].value} from the top element.`,
                    explanation: 'We access the value of the top element without modifying the stack structure. The element remains in the stack.',
                    concept: 'Peek is a read-only operation that doesn\'t modify the stack.',
                    lifoDemo: 'We can see the top plate\'s details without disturbing the stack!'
                });

                // Step 4: Return value
                stack[info.top].isActive = false;
                steps.push({
                    elements: JSON.parse(JSON.stringify(stack)),
                    stackInfo: { ...info },
                    title: 'Step 4: Return Value',
                    description: `Peek operation returns ${stack[info.top].value}. Stack remains unchanged.`,
                    explanation: 'The peek operation is complete. We have the top value, but the stack structure is exactly the same as before.',
                    concept: 'Peek returns top value without changing stack state.',
                    lifoDemo: 'We know what\'s on top without changing the stack!'
                });

                // Step 5: Final state
                steps.push({
                    elements: JSON.parse(JSON.stringify(stack)),
                    stackInfo: { ...info },
                    title: 'Peek Complete',
                    description: `Successfully viewed top element value ${stack[info.top].value}.`,
                    explanation: 'Peek operation finished. The stack is unchanged, but we now know the value of the top element.',
                    concept: 'Peek is useful for checking the next element without removing it.',
                    lifoDemo: 'Perfect for checking what\'s next without disturbing the order!'
                });
                break;
            }

            case 'stack-search': {
                const searchValue = 20;
                let stack = JSON.parse(JSON.stringify(initialStack));
                let info = { top: initialStack.length - 1, size: initialStack.length, capacity: 5 };

                // Step 1: Start search
                steps.push({
                    elements: JSON.parse(JSON.stringify(stack)),
                    stackInfo: { ...info },
                    title: 'Step 1: Initialize Search',
                    description: `Searching for value ${searchValue} in the stack.`,
                    explanation: 'Stack search requires checking elements from top to bottom. This maintains the LIFO access pattern.',
                    concept: 'Stack search examines elements in reverse order of insertion.',
                    lifoDemo: 'Looking through plates from top to bottom to find a specific one!'
                });

                // Step 2: Search from top to bottom
                for (let i = stack.length - 1; i >= 0; i--) {
                    // Clear previous highlighting
                    if (i < stack.length - 1) {
                        stack[i + 1].isSearching = false;
                        stack[i + 1].isActive = true;
                    }
                    
                    // Highlight current element
                    stack[i].isSearching = true;
                    
                    steps.push({
                        elements: JSON.parse(JSON.stringify(stack)),
                        stackInfo: { ...info },
                        title: `Step ${steps.length}: Check Position ${i}`,
                        description: `Examining element at position ${i} with value ${stack[i].value}.`,
                        explanation: stack[i].value === searchValue 
                            ? `Found the target value ${searchValue}! Search is successful.`
                            : `Value ${stack[i].value} doesn't match target ${searchValue}. Continue searching downward.`,
                        concept: i === stack.length - 1 ? 'Search starts from the top of the stack.' : 'Move down the stack following LIFO access pattern.',
                        lifoDemo: i === stack.length - 1 ? 'Starting with the top plate!' : 'Moving down to check the next plate!'
                    });

                    if (stack[i].value === searchValue) {
                        // Found the target
                        stack[i].isSearching = false;
                        stack[i].isFound = true;
                        steps.push({
                            elements: JSON.parse(JSON.stringify(stack)),
                            stackInfo: { ...info },
                            title: `Step ${steps.length}: Target Found!`,
                            description: `Successfully found value ${searchValue} at position ${i}.`,
                            explanation: 'Search complete! The target value has been located in the stack.',
                            concept: 'Search returns the position where the element was found.',
                            lifoDemo: 'Found the plate we were looking for!'
                        });
                        break;
                    }
                }

                // Step 3: Search result
                steps.push({
                    elements: JSON.parse(JSON.stringify(stack)),
                    stackInfo: { ...info },
                    title: 'Search Complete',
                    description: `Search operation finished. Value ${searchValue} was found in the stack.`,
                    explanation: 'The search successfully located the target value by examining stack elements from top to bottom.',
                    concept: 'Stack search has O(n) time complexity in worst case.',
                    lifoDemo: 'Search complete - we found what we were looking for!'
                });
                break;
            }

            case 'stack-clear': {
                let stack = JSON.parse(JSON.stringify(initialStack));
                let info = { top: initialStack.length - 1, size: initialStack.length, capacity: 5 };

                // Step 1: Prepare to clear
                steps.push({
                    elements: JSON.parse(JSON.stringify(stack)),
                    stackInfo: { ...info },
                    title: 'Step 1: Prepare to Clear Stack',
                    description: 'About to remove all elements from the stack.',
                    explanation: 'Clear operation removes all elements from the stack, making it empty. This resets the stack to its initial state.',
                    concept: 'Clear operation removes all elements at once.',
                    lifoDemo: 'Preparing to remove all plates from the stack!'
                });

                // Step 2: Mark all elements for deletion
                stack.forEach(el => el.isDeleting = true);
                steps.push({
                    elements: JSON.parse(JSON.stringify(stack)),
                    stackInfo: { ...info },
                    title: 'Step 2: Mark All Elements',
                    description: 'All elements marked for removal from the stack.',
                    explanation: 'Every element in the stack is prepared for deletion. This is more efficient than popping one by one.',
                    concept: 'Batch operations are more efficient than individual operations.',
                    lifoDemo: 'All plates are ready to be removed at once!'
                });

                // Step 3: Remove all elements
                stack = [];
                info = { top: -1, size: 0, capacity: 5 };
                steps.push({
                    elements: JSON.parse(JSON.stringify(stack)),
                    stackInfo: { ...info },
                    title: 'Step 3: Remove All Elements',
                    description: 'All elements removed. Stack is now empty.',
                    explanation: 'The stack is now completely empty. Top pointer is reset to -1 indicating no elements.',
                    concept: 'Empty stack has size 0 and top pointer at -1.',
                    lifoDemo: 'All plates removed - the stack is now empty!'
                });

                // Step 4: Reset stack state
                steps.push({
                    elements: JSON.parse(JSON.stringify(stack)),
                    stackInfo: { ...info },
                    title: 'Step 4: Reset Stack State',
                    description: 'Stack pointers and size reset to initial empty state.',
                    explanation: 'All stack metadata is reset. The stack is ready to accept new elements starting from the bottom.',
                    concept: 'Clear operation resets stack to initial empty state.',
                    lifoDemo: 'Stack is reset and ready for new plates!'
                });

                // Step 5: Final state
                steps.push({
                    elements: JSON.parse(JSON.stringify(stack)),
                    stackInfo: { ...info },
                    title: 'Clear Complete',
                    description: 'Stack successfully cleared. Ready for new operations.',
                    explanation: 'Clear operation finished. The stack is empty and ready to accept new elements.',
                    concept: 'Cleared stack can immediately accept new push operations.',
                    lifoDemo: 'Ready to start stacking plates again!'
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
                {operation === 'stack-push' && 'Stack Push (Add Element)'}
                {operation === 'stack-pop' && 'Stack Pop (Remove Element)'}
                {operation === 'stack-peek' && 'Stack Peek (View Top)'}
                {operation === 'stack-search' && 'Stack Search (Find Element)'}
                {operation === 'stack-clear' && 'Stack Clear (Remove All)'}
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
                {currentStepData.lifoDemo && (
                    <div className={`
                        mt-2 p-2 rounded text-xs font-medium
                        ${theme === 'dark' ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-800'}
                    `}>
                        🥞 LIFO Analogy: {currentStepData.lifoDemo}
                    </div>
                )}
            </div>

            {/* Stack Info Panel */}
            <div className={`
                mb-6 p-3 rounded-lg text-center
                ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}
            `}>
                <div className="flex justify-center space-x-6 text-sm">
                    <div>
                        <span className="font-semibold">Size: </span>
                        <span className="text-blue-500 font-bold">{stackInfo.size}</span>
                    </div>
                    <div>
                        <span className="font-semibold">Top Index: </span>
                        <span className="text-purple-500 font-bold">{stackInfo.top}</span>
                    </div>
                    <div>
                        <span className="font-semibold">Capacity: </span>
                        <span className="text-orange-500 font-bold">{stackInfo.capacity}</span>
                    </div>
                </div>
            </div>

            {/* Stack visualization */}
            <div className="flex flex-col items-center mb-8">
                {/* LIFO Direction Indicator */}
                <div className="mb-4 text-center">
                    <div className="text-sm font-bold mb-2">LIFO Direction</div>
                    <div className="flex flex-col items-center space-y-1">
                        <span className="text-purple-500 font-bold">↑ TOP ↑</span>
                        <span className="text-gray-500 text-xs">Push/Pop Here</span>
                        <span className="text-2xl">↕</span>
                        <span className="text-gray-500 text-xs">Stack Growth</span>
                        <span className="text-orange-500 font-bold">↓ BOTTOM ↓</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Last In, First Out</div>
                </div>

                <div className="flex flex-col-reverse items-center gap-1" style={{ transform: `scale(${size})` }}>
                    {elements.length === 0 ? (
                        <div className={`
                            flex items-center justify-center
                            w-32 h-16 border-2 border-dashed rounded-lg
                            ${theme === 'dark' ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-500'}
                        `}>
                            Empty Stack
                        </div>
                    ) : (
                        elements.map((element, index) => (
                            <div key={index} className="relative">
                                {/* Position indicators */}
                                <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 text-center">
                                    <div className="text-xs text-gray-500">[{index}]</div>
                                    {element.isTop && (
                                        <div className="text-xs font-bold text-purple-500">TOP</div>
                                    )}
                                </div>

                                {/* Stack element */}
                                <div
                                    className={`
                                        flex items-center justify-center
                                        w-24 h-12 border-2 font-bold text-lg rounded-lg
                                        transition-all duration-500
                                        ${element.isHighlighted ? 'border-yellow-400 bg-yellow-100 dark:bg-yellow-900 shadow-lg animate-pulse' : ''}
                                        ${element.isActive ? 'border-green-400 bg-green-100 dark:bg-green-900 shadow-lg' : ''}
                                        ${element.isNew ? 'border-blue-400 bg-blue-100 dark:bg-blue-900 shadow-lg animate-bounce' : ''}
                                        ${element.isDeleting ? 'opacity-50 scale-90 border-red-400 bg-red-100 dark:bg-red-900' : ''}
                                        ${element.isTop && !element.isHighlighted && !element.isActive && !element.isNew ? 'border-purple-400 bg-purple-100 dark:bg-purple-900' : ''}
                                        ${element.isPeeking ? 'border-cyan-400 bg-cyan-100 dark:bg-cyan-900 shadow-lg animate-pulse' : ''}
                                        ${element.isSearching ? 'border-orange-400 bg-orange-100 dark:bg-orange-900 shadow-lg animate-pulse' : ''}
                                        ${element.isFound ? 'border-green-500 bg-green-200 dark:bg-green-800 shadow-xl' : ''}
                                        ${!element.isHighlighted && !element.isActive && !element.isNew && !element.isTop && !element.isPeeking && !element.isSearching && !element.isFound ? 
                                            (theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-white') : ''}
                                    `}
                                >
                                    {element.value}
                                </div>

                                {/* Stack level indicator */}
                                <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 text-center">
                                    <div className="text-xs text-gray-500">Level {index + 1}</div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Stack base */}
                <div className={`
                    w-32 h-2 mt-2 rounded-b-lg
                    ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-400'}
                `}>
                    <div className="text-center text-xs text-gray-500 mt-1">Stack Base</div>
                </div>
            </div>

            {/* LIFO Principle Explanation */}
            <div className={`
                mb-6 p-4 rounded-lg max-w-4xl
                ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}
            `}>
                <h4 className="text-lg font-semibold mb-3 text-center">Understanding LIFO (Last In, First Out)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                        <h5 className="font-bold mb-2">🥞 Stack of Plates</h5>
                        <p className="text-xs">
                            You can only add or remove plates from the top. The last plate you put on is the first one you take off.
                        </p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100'}`}>
                        <h5 className="font-bold mb-2">📚 Stack of Books</h5>
                        <p className="text-xs">
                            When stacking books, you place new books on top and remove books from the top. Bottom books are accessed last.
                        </p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
                        <h5 className="font-bold mb-2">🔙 Browser History</h5>
                        <p className="text-xs">
                            Browser back button follows LIFO - the most recent page you visited is the first one you go back to.
                        </p>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 text-xs mb-4">
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-purple-400 bg-purple-100 dark:bg-purple-900 rounded"></div>
                    <span>Top Element</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-cyan-400 bg-cyan-100 dark:bg-cyan-900 rounded"></div>
                    <span>Peeking</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-orange-400 bg-orange-100 dark:bg-orange-900 rounded"></div>
                    <span>Searching</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-blue-400 bg-blue-100 dark:bg-blue-900 rounded"></div>
                    <span>New Element</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-green-500 bg-green-200 dark:bg-green-800 rounded"></div>
                    <span>Found/Active</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-red-400 bg-red-100 dark:bg-red-900 rounded opacity-50"></div>
                    <span>Deleting</span>
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

export default StackVisualizer;
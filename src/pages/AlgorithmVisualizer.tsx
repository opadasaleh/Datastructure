import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import {
  Play, Pause, SkipBack, SkipForward,
  Code, FileText, ChevronRight, ChevronDown,
  ChevronLeft
} from 'lucide-react';
import SortingVisualizer from '../components/visualizations/SortingVisualizer';
import ArrayVisualizer from '../components/visualizations/ArrayVisualizer';
import LinkedListVisualizer from '../components/visualizations/LinkedListVisualizer';

// Algorithm descriptions and code samples
const ALGORITHMS = {
  'array-insert': {
    title: 'Array Insertion',
    description: 'Insert a new element into an array at a specific index, shifting existing elements to make space.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    type: 'array',
    code: `function insertAt(array, index, element) {
  // Shift elements to the right
  for (let i = array.length; i > index; i--) {
    array[i] = array[i - 1];
  }
  // Insert new element
  array[index] = element;
  return array;
}`,
    steps: [
      {
        title: 'Select Insert Position',
        description: 'Identify the position where the new element will be inserted.'
      },
      {
        title: 'Insert Element',
        description: 'Create space and insert the new element at the specified position.'
      },
      {
        title: 'Complete Operation',
        description: 'The new element is now in place and the array is ready for more operations.'
      }
    ]
  },
  'array-delete': {
    title: 'Array Deletion',
    description: 'Remove an element from a specific index in the array, shifting remaining elements to fill the gap.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    type: 'array',
    code: `function deleteAt(array, index) {
  // Shift elements to the left
  for (let i = index; i < array.length - 1; i++) {
    array[i] = array[i + 1];
  }
  // Remove last element
  array.length--;
  return array;
}`,
    steps: [
      {
        title: 'Select Element',
        description: 'Identify the element to be removed from the array.'
      },
      {
        title: 'Remove Element',
        description: 'Remove the selected element and shift remaining elements.'
      },
      {
        title: 'Complete Operation',
        description: 'The element has been removed and the array is reindexed.'
      }
    ]
  },
  'array-search': {
    title: 'Array Search',
    description: 'Search for a specific value in the array using sequential search.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    type: 'array',
    code: `function search(array, target) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return i; // Found at index i
    }
  }
  return -1; // Not found
}`,
    steps: [
      {
        title: 'Start Search',
        description: 'Begin searching from the first element of the array.'
      },
      {
        title: 'Check Elements',
        description: 'Compare each element with the target value.'
      },
      {
        title: 'Complete Search',
        description: 'Element found or reached the end of the array.'
      }
    ]
  },
  'array-update': {
    title: 'Array Update',
    description: 'Update the value of an element at a specific index in the array.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    type: 'array',
    code: `function update(array, index, newValue) {
  if (index >= 0 && index < array.length) {
    array[index] = newValue;
    return true;
  }
  return false;
}`,
    steps: [
      {
        title: 'Select Element',
        description: 'Identify the element to be updated.'
      },
      {
        title: 'Update Value',
        description: 'Replace the old value with the new value.'
      },
      {
        title: 'Complete Update',
        description: 'The element has been updated successfully.'
      }
    ]
  },
  'bubble-sort': {
    title: 'Bubble Sort',
    description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    type: 'sorting',
    code: `function bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      // Compare adjacent elements
      if (array[j] > array[j + 1]) {
        // Swap them if they are in wrong order
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return array;
}`,
    steps: [
      {
        title: 'Start New Pass',
        description: 'Begin a new pass through the array to compare and swap adjacent elements.'
      },
      {
        title: 'Compare Elements',
        description: 'Compare two adjacent elements to determine if they need to be swapped.'
      },
      {
        title: 'Swap Elements',
        description: 'Swap the elements if they are in the wrong order (larger element before smaller).'
      },
      {
        title: 'Move to Next Pair',
        description: 'Move to the next pair of adjacent elements and repeat the comparison.'
      },
      {
        title: 'Complete Pass',
        description: 'Complete the current pass. The largest unsorted element is now in its correct position.'
      }
    ]
  },
  'linkedlist-insert': {
    title: 'Linked List Insertion',
    description: 'Insert a new node into a linked list at a specific position.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    type: 'linkedlist',
    code: `function insertNode(head, value, position) {
  // Create new node
  const newNode = {
    value: value,
    next: null
  };

  // Insert at beginning
  if (position === 0) {
    newNode.next = head;
    return newNode;
  }

  // Traverse to insertion point
  let current = head;
  for (let i = 0; i < position - 1 && current; i++) {
    current = current.next;
  }

  if (current) {
    // Insert node
    newNode.next = current.next;
    current.next = newNode;
  }

  return head;
}`,
    steps: [
      {
        title: 'Create New Node',
        description: 'Create a new node with the given value.'
      },
      {
        title: 'Find Insert Position',
        description: 'Traverse the list to find the insertion point.'
      },
      {
        title: 'Update Pointers',
        description: 'Update the next pointers to insert the new node.'
      },
      {
        title: 'Complete Operation',
        description: 'The new node is now part of the linked list.'
      }
    ]
  },
  'linkedlist-delete': {
    title: 'Linked List Deletion',
    description: 'Remove a node from a linked list at a specific position.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    type: 'linkedlist',
    code: `function deleteNode(head, position) {
  if (!head) return null;

  // Delete first node
  if (position === 0) {
    return head.next;
  }

  // Traverse to node before deletion point
  let current = head;
  for (let i = 0; i < position - 1 && current.next; i++) {
    current = current.next;
  }

  // Delete node
  if (current.next) {
    current.next = current.next.next;
  }

  return head;
}`,
    steps: [
      {
        title: 'Find Delete Position',
        description: 'Traverse to the node before the deletion point.'
      },
      {
        title: 'Update Pointers',
        description: 'Update the next pointer to skip the deleted node.'
      },
      {
        title: 'Complete Operation',
        description: 'The node has been removed from the linked list.'
      }
    ]
  },
  'linkedlist-search': {
    title: 'Linked List Search',
    description: 'Search for a value in a linked list.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    type: 'linkedlist',
    code: `function searchNode(head, value) {
  let current = head;
  let position = 0;

  while (current) {
    if (current.value === value) {
      return position;
    }
    current = current.next;
    position++;
  }

  return -1; // Not found
}`,
    steps: [
      {
        title: 'Start Search',
        description: 'Begin at the head of the linked list.'
      },
      {
        title: 'Traverse List',
        description: 'Move through the list one node at a time.'
      },
      {
        title: 'Check Values',
        description: 'Compare each node\'s value with the target.'
      },
      {
        title: 'Complete Search',
        description: 'Return the position if found, or -1 if not found.'
      }
    ]
  },
  'linkedlist-update': {
    title: 'Linked List Update',
    description: 'Update the value of a node at a specific position.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    type: 'linkedlist',
    code: `function updateNode(head, position, newValue) {
  let current = head;

  // Traverse to the node
  for (let i = 0; i < position && current; i++) {
    current = current.next;
  }

  // Update value if node exists
  if (current) {
    current.value = newValue;
    return true;
  }

  return false;
}`,
    steps: [
      {
        title: 'Find Node',
        description: 'Traverse to the node at the specified position.'
      },
      {
        title: 'Update Value',
        description: 'Change the node\'s value to the new value.'
      },
      {
        title: 'Complete Operation',
        description: 'The node\'s value has been updated.'
      }
    ]
  }
};

const AlgorithmVisualizer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [step, setStep] = useState(0);
  const [maxSteps, setMaxSteps] = useState(10);
  const [codeOpen, setCodeOpen] = useState(false);

  const algorithm = ALGORITHMS[id as keyof typeof ALGORITHMS];

  // Reset animation when algorithm changes
  useEffect(() => {
    setStep(0);
    setPlaying(false);
  }, [id]);

  // Auto-advance when playing
  useEffect(() => {
    if (!playing) return;

    const timer = setTimeout(() => {
      if (step < maxSteps - 1) {
        setStep(prevStep => prevStep + 1);
      } else {
        setPlaying(false);
      }
    }, 1000 / speed);

    return () => clearTimeout(timer);
  }, [playing, step, maxSteps, speed]);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleReset = () => {
    setStep(0);
    setPlaying(false);
  };

  const handleStepForward = () => {
    if (step < maxSteps - 1) {
      setStep(prevStep => prevStep + 1);
    }
  };

  const handleStepBackward = () => {
    if (step > 0) {
      setStep(prevStep => prevStep - 1);
    }
  };

  if (!algorithm) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Algorithm Not Found</h1>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          The requested algorithm visualization is not available.
        </p>
      </div>
    );
  }

  const renderVisualizer = () => {
    switch (algorithm.type) {
      case 'array':
        return (
          <ArrayVisualizer
            operation={id || ''}
            currentStep={step}
            onStepsChange={setMaxSteps}
            speed={speed}
          />
        );
      case 'sorting':
        return (
          <SortingVisualizer
            algorithm={id || ''}
            currentStep={step}
            onStepsChange={setMaxSteps}
            speed={speed}
          />
        );
      case 'linkedlist':
        return (
          <LinkedListVisualizer
            operation={id || ''}
            currentStep={step}
            onStepsChange={setMaxSteps}
            speed={speed}
          />
        );
      default:
        return (
          <div className="text-center p-4">
            <p>Visualization not available for this algorithm type.</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{algorithm.title}</h1>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {algorithm.description}
        </p>
        <div className="mt-4 flex gap-4">
          <div className={`
            inline-flex items-center px-3 py-1 rounded-full text-sm
            ${theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'}
          `}>
            Time: {algorithm.timeComplexity}
          </div>
          <div className={`
            inline-flex items-center px-3 py-1 rounded-full text-sm
            ${theme === 'dark' ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-800'}
          `}>
            Space: {algorithm.spaceComplexity}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Visualization Panel */}
        <div className="lg:col-span-2">
          <div className={`
            rounded-lg overflow-hidden border
            ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
          `}>
            {/* Visualization Header */}
            <div className={`
              p-4 border-b
              ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}
            `}>
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">Visualization</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Speed:</span>
                  <select
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className={`
                      rounded text-sm px-2 py-1
                      ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-800'}
                    `}
                  >
                    <option value={0.5}>0.5x</option>
                    <option value={1}>1x</option>
                    <option value={2}>2x</option>
                    <option value={4}>4x</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Visualization Canvas */}
            <div className={`
              h-80
              ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}
            `}>
              {renderVisualizer()}
            </div>

            {/* Controls */}
            <div className={`
              p-4 border-t 
              ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}
            `}>
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={handleReset}
                  className={`
                    p-2 rounded-full
                    ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}
                    disabled:opacity-50
                  `}
                  disabled={step === 0}
                >
                  <SkipBack size={20} />
                </button>
                <button
                  onClick={handleStepBackward}
                  className={`
                    p-2 rounded-full
                    ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}
                    disabled:opacity-50
                  `}
                  disabled={step === 0}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handlePlayPause}
                  className={`
                    p-3 rounded-full
                    ${theme === 'dark'
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-blue-500 hover:bg-blue-600'} 
                    text-white
                  `}
                >
                  {playing ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button
                  onClick={handleStepForward}
                  className={`
                    p-2 rounded-full
                    ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}
                    disabled:opacity-50
                  `}
                  disabled={step === maxSteps - 1}
                >
                  <ChevronRight size={24} />
                </button>
                <button
                  onClick={() => setStep(maxSteps - 1)}
                  className={`
                    p-2 rounded-full
                    ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}
                    disabled:opacity-50
                  `}
                  disabled={step === maxSteps - 1}
                >
                  <SkipForward size={20} />
                </button>
              </div>

              <div className="mt-4">
                <div className="relative w-full h-2 bg-gray-300 dark:bg-gray-600 rounded">
                  <div
                    className="absolute top-0 left-0 h-2 bg-blue-500 rounded"
                    style={{ width: `${(step / (maxSteps - 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Information Panel */}
        <div className="lg:col-span-1">
          <div className={`
            rounded-lg border overflow-hidden
            ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
          `}>
            {/* Step Description */}
            <div className={`
              p-4 border-b
              ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}
            `}>
              <h2 className="font-semibold flex items-center">
                <FileText size={18} className="mr-2" /> Step Explanation
              </h2>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium mb-2">
                Step {step + 1}: {algorithm.steps[step % algorithm.steps.length]?.title || 'Processing'}
              </h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {algorithm.steps[step % algorithm.steps.length]?.description || 'Algorithm is processing...'}
              </p>
            </div>

            {/* Algorithm Code */}
            <div className={`
              border-t
              ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
            `}>
              <button
                onClick={() => setCodeOpen(!codeOpen)}
                className={`
                  w-full p-4 text-left font-semibold flex items-center justify-between
                  ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}
                `}
              >
                <span className="flex items-center">
                  <Code size={18} className="mr-2" /> Algorithm Code
                </span>
                {codeOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>

              {codeOpen && (
                <div className={`
                  p-4 font-mono text-sm overflow-x-auto
                  ${theme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'}
                `}>
                  <pre>{algorithm.code}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;
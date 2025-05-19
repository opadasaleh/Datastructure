import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { PlayCircle, PauseCircle, RotateCcw, Code, BookOpen, ListChecks } from 'lucide-react';
import { motion } from '../utils/motionHelpers';

// Temporary mock data - would be replaced with actual data
const getDataStructureInfo = (id: string) => {
  // Default to Array if no match is found
  return {
    id,
    title: id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    description: 'An interactive visualization and explanation of this data structure.',
    tabs: ['Visualization', 'Explanation', 'Code', 'Practice']
  };
};

const DataStructureDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  if (!id) return <div>Structure not found</div>;
  
  const dataStructure = getDataStructureInfo(id);

  // Placeholder visualization content - would be replaced with actual visualizations
  const renderVisualization = () => {
    return (
      <div className="relative h-80 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium mb-4">Interactive Visualization</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            (Actual visualization would be implemented here)
          </p>
        </div>

        {/* Visualization Controls */}
        <div className={`
          absolute bottom-0 left-0 right-0 p-4
          ${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'}
          backdrop-blur rounded-b-lg border-t
          ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
        `}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-blue-500 hover:text-blue-600 transition-colors"
              >
                {isPlaying ? <PauseCircle size={28} /> : <PlayCircle size={28} />}
              </button>
              <button 
                className="text-gray-500 hover:text-gray-600 transition-colors"
              >
                <RotateCcw size={20} />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm">Speed:</span>
              <select 
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className={`
                  rounded-md border px-2 py-1 text-sm
                  ${theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-800'}
                `}
              >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={2}>2x</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Placeholder for other tab contents
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return renderVisualization();
      case 1:
        return (
          <div className="prose dark:prose-invert max-w-none">
            <h3>Understanding {dataStructure.title}</h3>
            <p>
              This is where a detailed explanation of the data structure would go,
              including its properties, use cases, advantages, and limitations.
            </p>
            <h4>Time Complexity</h4>
            <ul>
              <li><strong>Access:</strong> O(1)</li>
              <li><strong>Search:</strong> O(n)</li>
              <li><strong>Insertion:</strong> O(n)</li>
              <li><strong>Deletion:</strong> O(n)</li>
            </ul>
            <h4>Real-world Applications</h4>
            <p>
              Discussion of where this data structure is used in real-world applications
              and why it's particularly suitable for those cases.
            </p>
          </div>
        );
      case 2:
        return (
          <div>
            <div className="mb-4">
              <select 
                className={`
                  rounded-md border px-3 py-2 text-sm
                  ${theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-800'}
                `}
              >
                <option>JavaScript</option>
                <option>Python</option>
                <option>Java</option>
                <option>C++</option>
              </select>
            </div>
            <div className={`
              rounded-lg p-4 font-mono text-sm overflow-x-auto
              ${theme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'}
            `}>
              <pre>{`// Sample code implementation would go here
class ${dataStructure.title.replace(/\s/g, '')} {
  constructor() {
    this.items = [];
  }

  add(item) {
    this.items.push(item);
  }

  remove() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}`}</pre>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Practice Questions</h3>
            <div className="space-y-6">
              <div className={`
                p-4 rounded-lg border
                ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
              `}>
                <h4 className="font-medium mb-2">Question 1</h4>
                <p className="mb-4">What is the time complexity of accessing an element in this data structure?</p>
                <div className="space-y-2">
                  <div className={`
                    p-3 rounded-md cursor-pointer
                    ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
                  `}>
                    <label className="flex items-center cursor-pointer">
                      <input type="radio" name="q1" className="mr-3" />
                      <span>O(1)</span>
                    </label>
                  </div>
                  <div className={`
                    p-3 rounded-md cursor-pointer
                    ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
                  `}>
                    <label className="flex items-center cursor-pointer">
                      <input type="radio" name="q1" className="mr-3" />
                      <span>O(log n)</span>
                    </label>
                  </div>
                  <div className={`
                    p-3 rounded-md cursor-pointer
                    ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
                  `}>
                    <label className="flex items-center cursor-pointer">
                      <input type="radio" name="q1" className="mr-3" />
                      <span>O(n)</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className={`
                p-4 rounded-lg border
                ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
              `}>
                <h4 className="font-medium mb-2">Question 2</h4>
                <p className="mb-4">Which of the following is NOT a valid operation for this data structure?</p>
                <div className="space-y-2">
                  <div className={`
                    p-3 rounded-md cursor-pointer
                    ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
                  `}>
                    <label className="flex items-center cursor-pointer">
                      <input type="radio" name="q2" className="mr-3" />
                      <span>Insertion</span>
                    </label>
                  </div>
                  <div className={`
                    p-3 rounded-md cursor-pointer
                    ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
                  `}>
                    <label className="flex items-center cursor-pointer">
                      <input type="radio" name="q2" className="mr-3" />
                      <span>Deletion</span>
                    </label>
                  </div>
                  <div className={`
                    p-3 rounded-md cursor-pointer
                    ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
                  `}>
                    <label className="flex items-center cursor-pointer">
                      <input type="radio" name="q2" className="mr-3" />
                      <span>Quantum entanglement</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Tab content not available</div>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          {dataStructure.title}
        </motion.h1>
        <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {dataStructure.description}
        </p>
      </div>
      
      {/* Tabs */}
      <div className="mb-8">
        <div className={`
          flex space-x-2 border-b 
          ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
        `}>
          <button
            onClick={() => setActiveTab(0)}
            className={`
              flex items-center px-4 py-2 font-medium border-b-2 transition-colors
              ${activeTab === 0 
                ? `border-blue-500 text-blue-600` 
                : `border-transparent ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} 
                   hover:${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`
              }
            `}
          >
            <PlayCircle size={18} className="mr-2" /> Visualization
          </button>
          <button
            onClick={() => setActiveTab(1)}
            className={`
              flex items-center px-4 py-2 font-medium border-b-2 transition-colors
              ${activeTab === 1 
                ? `border-blue-500 text-blue-600` 
                : `border-transparent ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} 
                   hover:${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`
              }
            `}
          >
            <BookOpen size={18} className="mr-2" /> Explanation
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className={`
              flex items-center px-4 py-2 font-medium border-b-2 transition-colors
              ${activeTab === 2 
                ? `border-blue-500 text-blue-600` 
                : `border-transparent ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} 
                   hover:${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`
              }
            `}
          >
            <Code size={18} className="mr-2" /> Code
          </button>
          <button
            onClick={() => setActiveTab(3)}
            className={`
              flex items-center px-4 py-2 font-medium border-b-2 transition-colors
              ${activeTab === 3 
                ? `border-blue-500 text-blue-600` 
                : `border-transparent ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} 
                   hover:${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`
              }
            `}
          >
            <ListChecks size={18} className="mr-2" /> Practice
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="pb-16">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default DataStructureDetail;
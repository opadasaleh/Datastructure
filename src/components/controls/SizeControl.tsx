import React from 'react';
import { useVisualization } from '../../contexts/VisualizationContext';
import { useTheme } from '../../contexts/ThemeContext';

const SizeControl: React.FC = () => {
  const { size, setSize } = useVisualization();
  const { theme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="size-control" className="text-sm font-medium">
        Size:
      </label>
      <input
        id="size-control"
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={size}
        onChange={(e) => setSize(Number(e.target.value))}
        className={`
          w-20 h-2 rounded-lg appearance-none cursor-pointer
          ${theme === 'dark'
            ? 'bg-gray-700 [&::-webkit-slider-thumb]:bg-blue-500 [&::-moz-range-thumb]:bg-blue-500'
            : 'bg-gray-200 [&::-webkit-slider-thumb]:bg-blue-500 [&::-moz-range-thumb]:bg-blue-500'}
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full
          [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none
        `}
      />
      <span className="text-sm min-w-[2.5rem]">{size.toFixed(1)}x</span>
    </div>
  );
};

export default SizeControl;
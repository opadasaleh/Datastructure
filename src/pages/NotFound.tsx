import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className={`
        w-24 h-24 rounded-full mb-6 flex items-center justify-center
        ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}
      `}>
        <span className="text-4xl">🔎</span>
      </div>
      
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      
      <p className={`
        text-lg max-w-md mb-8
        ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
      `}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          to="/"
          className={`
            flex items-center px-6 py-3 rounded-lg
            ${theme === 'dark' 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-blue-500 hover:bg-blue-600'}
            text-white font-medium
          `}
        >
          <Home size={18} className="mr-2" />
          Back to Home
        </Link>
        
        <button
          onClick={() => window.history.back()}
          className={`
            flex items-center px-6 py-3 rounded-lg
            ${theme === 'dark' 
              ? 'bg-gray-700 hover:bg-gray-600' 
              : 'bg-gray-200 hover:bg-gray-300'}
            font-medium
          `}
        >
          <ArrowLeft size={18} className="mr-2" />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
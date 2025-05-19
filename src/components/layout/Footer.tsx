import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Github, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <footer className={`py-6 ${
      theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'
    } border-t ${
      theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
    } transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start space-x-6">
            <a href="#" className="hover:text-blue-500 transition-colors duration-150">
              <Github size={20} />
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors duration-150">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors duration-150">
              <Youtube size={20} />
            </a>
          </div>
          <div className="mt-4 md:mt-0 text-center md:text-right">
            <p className="text-sm">
              © {new Date().getFullYear()} DataViz. All rights reserved.
            </p>
            <p className="text-xs mt-1">
              Designed for educational purposes
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, Search } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className={`
      sticky top-0 z-10 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} 
      shadow-md transition-colors duration-300
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                DataViz
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/quiz" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-100 dark:hover:bg-gray-700 transition">
              Quizzes
            </Link>
            <button
              className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-gray-700 transition"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search size={20} />
            </button>
            <button
              className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-gray-700 transition"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              className="p-2 rounded-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/structures"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-100 dark:hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Data Structures
            </Link>
            <Link
              to="/quiz"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-100 dark:hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Quizzes
            </Link>
            <button
              className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium hover:bg-blue-100 dark:hover:bg-gray-700"
              onClick={() => {
                setSearchOpen(!searchOpen);
                setMobileMenuOpen(false);
              }}
            >
              <Search size={18} className="mr-2" />
              Search
            </button>
            <button
              className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium hover:bg-blue-100 dark:hover:bg-gray-700"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={18} className="mr-2" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon size={18} className="mr-2" />
                  Dark Mode
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Search Bar */}
      {searchOpen && (
        <div className={`border-t ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} p-4 transition-all duration-300`}>
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search data structures, algorithms..."
              className={`w-full p-2 pl-10 pr-4 rounded-md border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <Search size={20} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
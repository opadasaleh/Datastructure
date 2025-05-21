import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, BookOpen, BarChart2, ListChecks } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from '../utils/motionHelpers';

const HomePage: React.FC = () => {
  const { theme } = useTheme();
  const [currentStructure, setCurrentStructure] = useState(0);

  // Preserved for future use
  /*
  const featuredStructures = [
    { name: 'Binary Trees', path: '/structures/binary-trees', color: 'from-green-500 to-emerald-700' },
    { name: 'Graph Algorithms', path: '/structures/graph-traversal', color: 'from-blue-500 to-indigo-700' },
    { name: 'Hash Tables', path: '/structures/hash-tables', color: 'from-purple-500 to-violet-700' },
    { name: 'Linked Lists', path: '/structures/linked-lists', color: 'from-orange-500 to-amber-700' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStructure(prev => (prev + 1) % featuredStructures.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);
  */

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Visualize
          </span>{' '}
          Data Structures & Algorithms
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-gray-600 dark:text-gray-300"
        >
          Interactive visualizations, step-by-step walkthroughs, and comprehensive explanations
          to help you master the fundamentals of computer science.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link to="/structures" className={`
            px-6 py-3 rounded-lg text-white font-medium 
            bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700
            shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1
          `}>
            Explore Data Structures
          </Link>
          <Link to="/quiz" className={`
            px-6 py-3 rounded-lg font-medium 
            ${theme === 'dark' ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
            shadow-md hover:shadow-lg transform transition-all duration-200 hover:-translate-y-1
          `}>
            Test Your Knowledge
          </Link>
        </motion.div>
      </section>

      {/* Preserved for future use
      <section className="py-12 px-4">
        <div className={`
          rounded-2xl overflow-hidden shadow-2xl max-w-5xl mx-auto
          ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
        `}>
          <div className={`
            h-48 md:h-64 bg-gradient-to-r ${featuredStructures[currentStructure].color}
            flex items-center justify-center
          `}>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {featuredStructures[currentStructure].name}
            </h2>
          </div>
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="space-x-2">
                {featuredStructures.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStructure(index)}
                    className={`
                      w-3 h-3 rounded-full
                      ${currentStructure === index ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}
                      transition-colors duration-200
                    `}
                  />
                ))}
              </div>
              <Link 
                to={featuredStructures[currentStructure].path}
                className="flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-200"
              >
                View Now <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <p className={`
              text-lg mb-4
              ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
            `}>
              Explore interactive visualizations and learn the core concepts at your own pace.
            </p>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`
                p-4 rounded-lg border
                ${theme === 'dark' ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'}
              `}>
                <div className="flex items-center mb-2">
                  <BookOpen size={20} className="mr-2 text-blue-500" />
                  <h3 className="font-medium">Learn Concepts</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Understand the theory with clear explanations
                </p>
              </div>
              
              <div className={`
                p-4 rounded-lg border
                ${theme === 'dark' ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'}
              `}>
                <div className="flex items-center mb-2">
                  <Code size={20} className="mr-2 text-green-500" />
                  <h3 className="font-medium">Code Examples</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  See implementations in multiple languages
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Master Data Structures & Algorithms
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <motion.div 
            whileHover={{ y: -5 }}
            className={`
              p-6 rounded-xl shadow-lg
              ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
            `}
          >
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
              <BookOpen size={24} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Visual Learning</h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Interactive visualizations that bring concepts to life
            </p>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className={`
              p-6 rounded-xl shadow-lg
              ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
            `}
          >
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
              <Code size={24} className="text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Code Examples</h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Implementation examples in multiple programming languages
            </p>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className={`
              p-6 rounded-xl shadow-lg
              ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
            `}
          >
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
              <BarChart2 size={24} className="text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Algorithm Analysis</h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Understand time and space complexity with clear explanations
            </p>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className={`
              p-6 rounded-xl shadow-lg
              ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
            `}
          >
            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center mb-4">
              <ListChecks size={24} className="text-amber-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Practice Quizzes</h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Test your knowledge with interactive quizzes and challenges
            </p>
          </motion.div>
        </div>
      </section>
      
      <section className={`
        py-16 px-4 rounded-2xl mx-4 md:mx-8 lg:mx-16
        bg-gradient-to-r from-blue-500 to-indigo-600 text-white
      `}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to master data structures?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Start your journey with our interactive visualizations and comprehensive guides.
          </p>
          <Link to="/structures" className={`
            px-8 py-4 rounded-lg text-blue-600 font-medium bg-white
            shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-100
          `}>
            Get Started Now
          </Link>
        </div>
      </section>
      */}
    </div>
  );
};

export default HomePage;
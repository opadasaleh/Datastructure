import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Check, X, ArrowRight, BarChart2 } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QuizPage: React.FC = () => {
  const { theme } = useTheme();
  const [currentCategory, setCurrentCategory] = useState('data-structures');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  const categories = [
    { id: 'data-structures', name: 'Data Structures' },
    { id: 'algorithms', name: 'Algorithms' },
    { id: 'complexity', name: 'Complexity Analysis' },
    { id: 'advanced', name: 'Advanced Topics' },
  ];
  
  // Sample quiz data - would be replaced with actual quiz questions
  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: 'Which data structure uses LIFO (Last In First Out) principle?',
      options: ['Queue', 'Stack', 'Linked List', 'Binary Tree'],
      correctAnswer: 1,
      explanation: 'A Stack follows the Last In First Out (LIFO) principle, where the last element added is the first one to be removed.'
    },
    {
      id: 2,
      question: 'What is the time complexity of accessing an element in an array?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
      correctAnswer: 0,
      explanation: 'Arrays provide constant time O(1) access to elements because they use direct indexing to access memory locations.'
    },
    {
      id: 3,
      question: 'Which of the following is NOT a balanced tree?',
      options: ['AVL Tree', 'Red-Black Tree', 'B-Tree', 'Binary Search Tree'],
      correctAnswer: 3,
      explanation: 'A Binary Search Tree (BST) is not necessarily balanced. Without balancing operations, a BST can degenerate into a linked list in the worst case.'
    },
    {
      id: 4,
      question: 'What is the worst-case time complexity of Quick Sort?',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)'],
      correctAnswer: 2,
      explanation: 'Quick Sort has a worst-case time complexity of O(n²) when the pivot selection is poor, such as when the array is already sorted or reverse sorted.'
    },
    {
      id: 5,
      question: 'Which data structure is typically used to implement a priority queue?',
      options: ['Array', 'Stack', 'Heap', 'Linked List'],
      correctAnswer: 2,
      explanation: 'A Heap is typically used to implement a priority queue because it efficiently maintains the highest (or lowest) priority element at the root.'
    },
  ];
  
  const handleSelectAnswer = (questionId: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };
  
  const handleSubmitQuiz = () => {
    setShowResults(true);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleSubmitQuiz();
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  
  const calculateScore = () => {
    let correct = 0;
    
    quizQuestions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    
    return {
      correct,
      total: quizQuestions.length,
      percentage: Math.round((correct / quizQuestions.length) * 100)
    };
  };
  
  const renderQuizContent = () => {
    if (showResults) {
      const score = calculateScore();
      
      return (
        <div className="max-w-3xl mx-auto">
          <div className={`
            p-8 rounded-xl mb-8 text-center
            ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
            shadow-lg
          `}>
            <h2 className="text-2xl font-bold mb-4">Your Results</h2>
            <div className="w-40 h-40 mx-auto rounded-full border-8 border-blue-500 flex items-center justify-center mb-6">
              <span className="text-4xl font-bold">{score.percentage}%</span>
            </div>
            <p className="text-xl mb-2">
              You got <span className="font-bold text-blue-500">{score.correct}</span> out of <span className="font-bold">{score.total}</span> questions correct
            </p>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {score.percentage >= 80 
                ? 'Excellent work! You have a solid understanding of this topic.' 
                : score.percentage >= 60 
                  ? 'Good job! You have a decent grasp of the material, but there\'s room for improvement.' 
                  : 'Keep studying! Review the explanations to strengthen your understanding.'}
            </p>
          </div>
          
          <h3 className="text-xl font-bold mb-4">Review Your Answers</h3>
          <div className="space-y-6">
            {quizQuestions.map((question) => {
              const selectedAnswer = selectedAnswers[question.id];
              const isCorrect = selectedAnswer === question.correctAnswer;
              
              return (
                <div 
                  key={question.id}
                  className={`
                    p-6 rounded-lg
                    ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
                    shadow
                  `}
                >
                  <div className="flex items-start mb-4">
                    <div className={`
                      w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mr-3
                      ${isCorrect 
                        ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' 
                        : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'}
                    `}>
                      {isCorrect ? <Check size={18} /> : <X size={18} />}
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">{question.question}</h4>
                      <div className="space-y-2 mb-4">
                        {question.options.map((option, index) => (
                          <div 
                            key={index}
                            className={`
                              p-3 rounded-md text-sm
                              ${selectedAnswer === index 
                                ? index === question.correctAnswer 
                                  ? 'bg-green-100 dark:bg-green-900/50' 
                                  : 'bg-red-100 dark:bg-red-900/50'
                                : index === question.correctAnswer
                                  ? 'bg-green-100 dark:bg-green-900/50'
                                  : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}
                            `}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                      <div className={`
                        p-3 rounded-md text-sm
                        ${theme === 'dark' ? 'bg-blue-900/30 border border-blue-800' : 'bg-blue-50 border border-blue-100'}
                      `}>
                        <p className="font-medium mb-1">Explanation:</p>
                        <p>{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setShowResults(false);
                setSelectedAnswers({});
                setCurrentQuestion(0);
              }}
              className={`
                px-6 py-3 rounded-lg font-medium
                ${theme === 'dark' 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-blue-500 hover:bg-blue-600'}
                text-white
              `}
            >
              Take Another Quiz
            </button>
          </div>
        </div>
      );
    }
    
    const question = quizQuestions[currentQuestion];
    
    return (
      <div className="max-w-3xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500"
              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className={`
          p-8 rounded-lg shadow-lg mb-6
          ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
        `}>
          <h2 className="text-2xl font-bold mb-6">{question.question}</h2>
          
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(question.id, index)}
                className={`
                  w-full p-4 rounded-lg text-left transition-colors
                  ${selectedAnswers[question.id] === index
                    ? theme === 'dark' 
                      ? 'bg-blue-900 border-blue-700' 
                      : 'bg-blue-100 border-blue-200'
                    : theme === 'dark'
                      ? 'bg-gray-700 hover:bg-gray-600 border-gray-600' 
                      : 'bg-gray-100 hover:bg-gray-200 border-gray-200'
                  }
                  border
                `}
              >
                <div className="flex items-center">
                  <div className={`
                    w-6 h-6 rounded-full flex-shrink-0 mr-3 border
                    ${selectedAnswers[question.id] === index
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : theme === 'dark' 
                        ? 'border-gray-500' 
                        : 'border-gray-400'
                    }
                    flex items-center justify-center text-sm
                  `}>
                    {selectedAnswers[question.id] === index && <Check size={16} />}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestion === 0}
            className={`
              px-4 py-2 rounded-lg
              ${currentQuestion === 0
                ? 'opacity-50 cursor-not-allowed'
                : ''}
              ${theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-gray-200 hover:bg-gray-300'}
            `}
          >
            Previous
          </button>
          
          <button
            onClick={handleNextQuestion}
            className={`
              px-6 py-2 rounded-lg flex items-center
              ${selectedAnswers[question.id] === null || selectedAnswers[question.id] === undefined
                ? 'opacity-50 cursor-not-allowed'
                : ''}
              ${theme === 'dark' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-blue-500 hover:bg-blue-600'}
              text-white font-medium
            `}
            disabled={selectedAnswers[question.id] === null || selectedAnswers[question.id] === undefined}
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Test Your Knowledge</h1>
        <p className={`text-lg max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Challenge yourself with quizzes on data structures, algorithms, and computational concepts.
        </p>
      </div>
      
      {!showResults && (
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setCurrentCategory(category.id)}
              className={`
                px-4 py-2 rounded-lg transition-colors
                ${currentCategory === category.id
                  ? theme === 'dark' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-500 text-white'
                  : theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }
              `}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
      
      {renderQuizContent()}
    </div>
  );
};

export default QuizPage;
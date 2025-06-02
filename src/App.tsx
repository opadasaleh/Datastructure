import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { VisualizationProvider } from './contexts/VisualizationContext';
import SizeControl from './components/controls/SizeControl';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AlgorithmVisualizer from './pages/AlgorithmVisualizer';
import QuizPage from './pages/QuizPage';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <VisualizationProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <header className="p-4 bg-white dark:bg-gray-800 shadow">
            <div className="container mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Data Structures & Algorithms Visualizer
                </h1>
              </div>
              <div className="flex justify-end">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Adjust visualization size:
                  </div>
                  <SizeControl />
                </div>
              </div>
            </div>
          </header>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/algorithms/:id" element={<AlgorithmVisualizer />} />
                <Route path="/visualize/:type" element={<AlgorithmVisualizer />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </Router>
        </div>
      </VisualizationProvider>
    </ThemeProvider>
  );
};

export default App;
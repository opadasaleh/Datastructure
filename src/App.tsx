import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AlgorithmVisualizer from './pages/AlgorithmVisualizer';
import QuizPage from './pages/QuizPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

export default App;
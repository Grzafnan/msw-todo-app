import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppDispatch, useAppSelector } from './store';
import { initializeAuth, selectAuth } from './store/slices/authSlice';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TodosPage from './pages/TodosPage';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isInitialized } = useAppSelector(selectAuth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
        <p className="ml-2 text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected routes */}
        <Route path="/app/todos" element={
          <ProtectedRoute>
            <TodosPage />
          </ProtectedRoute>
        } />
        
        {/* Redirect root to todos */}
        <Route path="/" element={<Navigate to="/app/todos" replace />} />
        
        {/* Catch all - redirect to todos */}
        <Route path="*" element={<Navigate to="/app/todos" replace />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
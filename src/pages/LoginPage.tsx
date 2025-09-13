import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store';
import { selectIsAuthenticated } from '../store/slices/authSlice';
import LoginForm from '../components/auth/LoginForm';
import Layout from '../components/layout/Layout';

const LoginPage: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/app/todos" replace />;
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default LoginPage;
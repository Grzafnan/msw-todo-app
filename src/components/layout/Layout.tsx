import React from 'react';
import { useAppSelector } from '../../store';
import { selectTheme } from '../../store/slices/uiSlice';
import Header from './Header';
import ToastContainer from './ToastContainer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useAppSelector(selectTheme);

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <ToastContainer />
    </div>
  );
};

export default Layout;
import React from 'react';
import { Moon, Sun, LogOut } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { logout, selectUser } from '../../store/slices/authSlice';
import { toggleTheme, selectTheme } from '../../store/slices/uiSlice';
import { getInitials } from '../../lib/utils';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const theme = useAppSelector(selectTheme);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:border-gray-800 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              TodoApp
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <Button
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              variant="ghost"
              size="sm"
              onClick={handleToggleTheme}
              className={`${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-800'} w-8 h-8 p-0`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            {user && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center justify-center w-8 h-8 text-sm font-medium text-white bg-blue-600 rounded-full">
                    {getInitials(user.name)}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user.name}
                  </span>
                </div>

                <Button
                  title="Logout"
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className={`${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-800'} w-8 h-8 p-0`}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
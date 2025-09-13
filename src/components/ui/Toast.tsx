import React, { useEffect } from 'react';
import { X, CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Toast as ToastType } from '../../types';

interface ToastProps {
  toast: ToastType;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        onClose(toast.id);
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onClose]);

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const Icon = icons[toast.type];

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg p-4 shadow-lg',
        'border max-w-sm w-full',
        'transform transition-all duration-300 ease-in-out',
        'animate-in slide-in-from-right-full',
        {
          'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200':
            toast.type === 'success',
          'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200':
            toast.type === 'error',
          'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200':
            toast.type === 'warning',
          'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200':
            toast.type === 'info',
        }
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <p className="text-sm font-medium flex-1">{toast.message}</p>
      <button
        onClick={() => onClose(toast.id)}
        className={cn(
          'flex-shrink-0 rounded-md p-1.5 hover:bg-black/10 dark:hover:bg-white/10',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          {
            'focus:ring-green-500': toast.type === 'success',
            'focus:ring-red-500': toast.type === 'error',
            'focus:ring-yellow-500': toast.type === 'warning',
            'focus:ring-blue-500': toast.type === 'info',
          }
        )}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toast;
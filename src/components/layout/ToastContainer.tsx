import React from 'react';
import { useAppSelector, useAppDispatch } from '../../store';
import { selectToasts, removeToast } from '../../store/slices/uiSlice';
import Toast from '../ui/Toast';

const ToastContainer: React.FC = () => {
  const toasts = useAppSelector(selectToasts);
  const dispatch = useAppDispatch();

  const handleRemoveToast = (id: string) => {
    dispatch(removeToast(id));
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={handleRemoveToast} />
      ))}
    </div>
  );
};

export default ToastContainer;
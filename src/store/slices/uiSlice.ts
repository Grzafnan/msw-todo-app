import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateId } from '../../lib/utils';
import type { Theme, Toast } from '../../types';

interface UIState {
  theme: Theme;
  toasts: Toast[];
}

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  
  const saved = localStorage.getItem('theme') as Theme;
  if (saved) return saved;
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const initialState: UIState = {
  theme: getInitialTheme(),
  toasts: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
    addToast: (state, action: PayloadAction<Omit<Toast, 'id'>>) => {
      const toast: Toast = {
        ...action.payload,
        id: generateId(),
        duration: action.payload.duration || 5000,
      };
      state.toasts.push(toast);
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
  },
});

export const { setTheme, toggleTheme, addToast, removeToast, clearToasts } = uiSlice.actions;
export default uiSlice.reducer;

// Selectors
export const selectTheme = (state: { ui: UIState }) => state.ui.theme;
export const selectToasts = (state: { ui: UIState }) => state.ui.toasts;
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const run = async () => {
  if (import.meta.env.DEV || import.meta.env.VITE_USE_MSW === 'true') {
    const { startMocking } = await import('./mocks/browser');
    await startMocking();
    console.log('[MSW] Mocking enabled');
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

run();

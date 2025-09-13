import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

export const startMocking = async () => {
    await worker.start({
        serviceWorker: {
            url: '/mockServiceWorker.js',
        },
        onUnhandledRequest: 'bypass',
    });
};
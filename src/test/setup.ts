import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Clean up after each test
afterEach(() => {
  cleanup();
});

// Make sure Vitest has access to expect
import type { ExpectStatic } from 'vitest';

declare global {
  // eslint-disable-next-line no-var
  var expect: ExpectStatic;
}
globalThis.expect = expect;
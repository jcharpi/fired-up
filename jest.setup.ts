// Jest setup for React Native / Expo.

const originalConsoleError = console.error;

// Silence the warning: "An update to X inside a test was not wrapped in act(...)"
// for navigation/state updates that are expected in these tests.
jest.spyOn(console, 'error').mockImplementation((...args) => {
  const msg = String(args[0] ?? '');
  if (msg.includes('not wrapped in act')) return;
  originalConsoleError(...args);
});

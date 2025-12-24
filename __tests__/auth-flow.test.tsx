import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

// Mock expo-router hooks used by the Auth screen
const mockReplace = jest.fn();
jest.mock('expo-router', () => {
  return {
    useRouter: () => ({ replace: mockReplace, navigate: jest.fn(), push: jest.fn() }),
    useLocalSearchParams: () => ({ mode: 'login' }),
  };
});

// Mock Apple auth
const mockSignInAsync = jest.fn();
const mockIsAvailableAsync = jest.fn();

jest.mock('expo-apple-authentication', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Text } = require('react-native');
  return {
    isAvailableAsync: () => mockIsAvailableAsync(),
    signInAsync: (opts: any) => mockSignInAsync(opts),
    AppleAuthenticationScope: {
      FULL_NAME: 'FULL_NAME',
      EMAIL: 'EMAIL',
    },
    AppleAuthenticationButtonType: {
      SIGN_IN: 'SIGN_IN',
      SIGN_UP: 'SIGN_UP',
    },
    AppleAuthenticationButtonStyle: {
      BLACK: 'BLACK',
    },
    AppleAuthenticationButton: ({ onPress }: any) => {
      return React.createElement(Text, { onPress, testID: 'appleButton' }, 'Apple Button');
    },
  };
});

// Mock Auth store
const mockSignInStore = jest.fn();

jest.mock('../store/useAuthStore', () => {
  return {
    useAuthStore: (selector: any) => selector({ signIn: mockSignInStore }),
  };
});

// Load after mocks are set up
// eslint-disable-next-line @typescript-eslint/no-require-imports
const Auth = require('../app/(auth)/auth').default;

describe('Auth sign-in flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsAvailableAsync.mockResolvedValue(true);
  });

  it('signs in with Apple and navigates to /(app)/home', async () => {
    mockSignInAsync.mockResolvedValue({
      user: 'apple-user-id',
      email: 'test@example.com',
      fullName: { givenName: 'Test', familyName: 'User' },
      identityToken: 'token123',
    });

    const { getByTestId } = render(<Auth />);

    await waitFor(() => expect(mockIsAvailableAsync).toHaveBeenCalled());

    fireEvent.press(getByTestId('appleButton'));

    await waitFor(() => {
      expect(mockSignInAsync).toHaveBeenCalled();
      expect(mockSignInStore).toHaveBeenCalledWith(
        {
          id: 'apple-user-id',
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
        },
        'token123'
      );
      expect(mockReplace).toHaveBeenCalledWith('/(app)/home');
    });
  });

  it('does nothing if user cancels', async () => {
    mockSignInAsync.mockRejectedValue({ code: 'ERR_REQUEST_CANCELED' });

    const { getByTestId } = render(<Auth />);
    await waitFor(() => expect(mockIsAvailableAsync).toHaveBeenCalled());

    fireEvent.press(getByTestId('appleButton'));

    await waitFor(() => {
      expect(mockSignInStore).not.toHaveBeenCalled();
      expect(mockReplace).not.toHaveBeenCalled();
    });
  });
});

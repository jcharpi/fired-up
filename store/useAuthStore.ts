/**
 * Authentication state management using Zustand with secure storage persistence.
 * @module store/useAuthStore
 */

import * as SecureStore from "expo-secure-store"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

/** Authenticated user profile */
export interface User {
	id: string
	email: string | null
	firstName: string | null
	lastName: string | null
}

interface AuthState {
	user: User | null
	token: string | null
	isGettingStarted: boolean
	/** Sign in with user profile and auth token */
	signIn: (user: User, token: string) => void
	/** Clear authentication state */
	signOut: () => void
	/** Reset to initial onboarding state */
	reset: () => void
	init: boolean
}

/** Secure storage adapter for sensitive auth data */
const secureStorage = {
	getItem: async (name: string) => {
		return await SecureStore.getItemAsync(name)
	},
	setItem: async (name: string, value: string) => {
		await SecureStore.setItemAsync(name, value)
	},
	removeItem: async (name: string) => {
		await SecureStore.deleteItemAsync(name)
	},
}

/**
 * Global authentication store.
 * Persists user credentials securely using expo-secure-store.
 */
export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			token: null,
			isGettingStarted: true,
			signIn: (user, token) => set({ user, token, isGettingStarted: false }),
			signOut: () => set({ user: null, token: null }),
			reset: () => set({ user: null, token: null, isGettingStarted: true }),
			init: true,
		}),
		{
			name: "auth-storage",
			storage: createJSONStorage(() => secureStorage),
		}
	)
)

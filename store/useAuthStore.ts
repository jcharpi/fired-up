import * as SecureStore from "expo-secure-store"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

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
	signIn: (user: User, token: string) => void
	signOut: () => void
	reset: () => void
	init: boolean
}

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

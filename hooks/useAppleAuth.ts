/**
 * Apple Sign In authentication hook.
 * Handles the native Apple authentication flow and stores credentials.
 * @module hooks/useAppleAuth
 */

import { useAuthStore } from "@/store/useAuthStore"
import * as AppleAuthentication from "expo-apple-authentication"

/**
 * Provides Apple Sign In functionality.
 * @returns Object containing the authenticate function
 */
export function useAppleAuth() {
	const signIn = useAuthStore((s) => s.signIn)

	/**
	 * Initiates the Apple Sign In flow.
	 * On success, stores user credentials in the auth store.
	 * Silently handles user cancellation.
	 */
	const authenticate = async () => {
		try {
			const credential = await AppleAuthentication.signInAsync({
				requestedScopes: [
					AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
					AppleAuthentication.AppleAuthenticationScope.EMAIL,
				],
			})

			signIn(
				{
					id: credential.user,
					email: credential.email ?? null,
					firstName: credential.fullName?.givenName ?? null,
					lastName: credential.fullName?.familyName ?? null,
				},
				credential.identityToken ?? ""
			)
		} catch (error: unknown) {
			if (
				error instanceof Error &&
				"code" in error &&
				error.code === "ERR_REQUEST_CANCELED"
			) {
				// User cancelled - do nothing
				return
			}
			console.error("Apple auth error:", error)
		}
	}

	return { authenticate }
}

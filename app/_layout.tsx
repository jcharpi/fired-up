/**
 * Root navigation layout with authentication routing.
 * Handles splash screen, font loading, and auth-based navigation guards.
 */

import { useAuthStore } from "@/store/useAuthStore"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Stack, useRouter, useSegments } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import "react-native-reanimated"

export { ErrorBoundary } from "expo-router"

export const unstable_settings = {
	initialRouteName: "landing",
}

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [loaded, error] = useFonts({
		...FontAwesome.font,
	})

	useEffect(() => {
		if (error) throw error
	}, [error])

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return null
	}

	return <RootLayoutNav />
}

/**
 * Navigation stack with auth-based routing.
 * Redirects unauthenticated users to landing, authenticated users to home.
 */
function RootLayoutNav() {
	const token = useAuthStore((s) => s.token)
	const segments = useSegments()
	const router = useRouter()

	useEffect(() => {
		const isOnLanding = segments[0] === "landing"

		if (!token && !isOnLanding) {
			router.replace("/landing")
		} else if (token && isOnLanding) {
			router.replace("/home")
		}
	}, [token, segments, router])

	return (
		<ThemeProvider value={DefaultTheme}>
			<Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
				<Stack.Screen name="landing" />
				<Stack.Screen name="home" />
				<Stack.Screen
					name="modals/donateModal"
					options={{ presentation: "transparentModal", animation: "fade" }}
				/>
				<Stack.Screen
					name="modals/nodeModal"
					options={{ presentation: "modal" }}
				/>
			</Stack>
		</ThemeProvider>
	)
}

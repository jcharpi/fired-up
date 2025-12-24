import { Stack } from "expo-router"
import React from "react"

export default function AuthLayout() {
	return (
		<Stack>
			<Stack.Screen name="landing" options={{ headerShown: false }} />
			<Stack.Screen
				name="auth"
				options={{
					title: "Welcome",
					headerBackVisible: false,
					animation: "slide_from_bottom",
				}}
			/>
		</Stack>
	)
}

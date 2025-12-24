import { useAuthStore } from "@/store/useAuthStore"
import { FontAwesome } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import { Alert, TouchableOpacity } from "react-native"

export default function AppLayout() {
	const signOut = useAuthStore((s) => s.signOut)
	const reset = useAuthStore((s) => s.reset)

	const handleLogout = () => {
		Alert.alert("Sign Out", "Are you sure you want to sign out?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Sign Out",
				style: "destructive",
				onPress: () => {
					signOut()
				},
			},
		])
	}

	const handleReset = () => {
		Alert.alert(
			"Reset App",
			"This will sign you out and reset to the 'Getting Started' state. Continue?",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Reset",
					style: "destructive",
					onPress: () => reset(),
				},
			]
		)
	}

	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: "#000" }}>
			<Tabs.Screen
				name="home"
				options={{
					headerShown: true,
					title: "Home",
					tabBarIcon: ({ color }) => (
						<FontAwesome name="home" size={28} color={color} />
					),
					headerLeft: () => (
						<TouchableOpacity onPress={handleReset} style={{ marginLeft: 16 }}>
							<FontAwesome name="refresh" size={22} color="#FF3B30" />
						</TouchableOpacity>
					),
					headerRight: () => (
						<TouchableOpacity
							onPress={handleLogout}
							style={{ marginRight: 16 }}
						>
							<FontAwesome name="sign-out" size={24} color="#000" />
						</TouchableOpacity>
					),
				}}
			/>
			<Tabs.Screen
				name="donate"
				options={{
					headerShown: true,
					title: "Donate",
					tabBarIcon: ({ color }) => (
						<FontAwesome name="money" size={24} color={color} />
					),
					headerRight: () => (
						<TouchableOpacity
							onPress={handleLogout}
							style={{ marginRight: 16 }}
						>
							<FontAwesome name="sign-out" size={24} color="#000" />
						</TouchableOpacity>
					),
				}}
			/>
		</Tabs>
	)
}

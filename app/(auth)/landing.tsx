import { useRouter } from "expo-router"
import { Button, StyleSheet, View } from "react-native"

export default function Landing() {
	const router = useRouter()

	return (
		<View style={styles.container}>
			<Button
				title="Start donating!"
				onPress={() => router.navigate("/(auth)/auth")}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
})

import * as AppleAuthentication from "expo-apple-authentication"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { Alert, Pressable, StyleSheet, Text, View } from "react-native"
import { useAuthStore } from "../../store/useAuthStore"

type AuthMode = "login" | "signup"

export default function Auth() {
	const router = useRouter()
	const params = useLocalSearchParams<{ mode?: AuthMode }>()
	const signIn = useAuthStore((state) => state.signIn)

	const [mode, setMode] = useState<AuthMode>(params.mode || "signup")
	const [isAppleAuthAvailable, setIsAppleAuthAvailable] = useState(false)

	const isLogin = mode === "login"

	useEffect(() => {
		AppleAuthentication.isAvailableAsync().then(setIsAppleAuthAvailable)
	}, [])

	const handleAppleAuth = async () => {
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
					email: credential.email,
					firstName: credential.fullName?.givenName ?? null,
					lastName: credential.fullName?.familyName ?? null,
				},
				credential.identityToken || ""
			)

			router.replace("/(app)/home")
		} catch (e: any) {
			if (e.code === "ERR_REQUEST_CANCELED") {
				// User canceled - do nothing
			} else if (e.code === "ERR_INVALID_OPERATION") {
				Alert.alert(
					"Sign In Required",
					"Please sign in with Apple again to continue."
				)
			} else {
				Alert.alert(
					"Authentication Failed",
					"Please try again. If the problem persists, try restarting the app."
				)
				console.error("Apple Auth Error:", e)
			}
		}
	}

	const toggleMode = () => {
		setMode(isLogin ? "signup" : "login")
	}

	if (!isAppleAuthAvailable) {
		return (
			<View style={styles.container}>
				<View style={styles.content}>
					<Text style={styles.footerText}>
						Apple Sign In is not available on this device.
					</Text>
				</View>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<AppleAuthentication.AppleAuthenticationButton
					buttonType={
						isLogin
							? AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
							: AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP
					}
					buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
					cornerRadius={10}
					style={styles.appleButton}
					onPress={handleAppleAuth}
				/>
			</View>

			<View style={styles.footer}>
				<Text style={styles.footerText}>
					{isLogin ? "Don't have an account yet?" : "Already have an account?"}
				</Text>
				<Pressable onPress={toggleMode}>
					<Text style={styles.footerLink}>
						{isLogin ? "Sign Up" : "Sign In"}
					</Text>
				</Pressable>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingHorizontal: 24,
		paddingTop: 80,
		paddingBottom: 40,
	},
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
	appleButton: {
		width: "100%",
		maxWidth: 340,
		height: 50,
	},
	footer: {
		alignItems: "center",
		gap: 8,
	},
	footerText: {
		fontSize: 15,
		color: "#666",
	},
	footerLink: {
		fontSize: 15,
		fontWeight: "600",
		color: "#000",
		textDecorationLine: "underline",
	},
})

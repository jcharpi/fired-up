/**
 * Landing/onboarding screen with Apple Sign In.
 * First screen users see before authentication.
 */

import { colors, fontWeights, spacing } from "@/constants/colors"
import { useAuthStore } from "@/store/useAuthStore"
import * as AppleAuthentication from "expo-apple-authentication"
import { StyleSheet, View } from "react-native"
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function Landing() {
	const insets = useSafeAreaInsets()
	const signIn = useAuthStore((s) => s.signIn)

	/** Initiates Apple Sign In and stores credentials on success */
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
			if (error instanceof Error && "code" in error && error.code === "ERR_REQUEST_CANCELED") {
				return
			}
			console.error("Apple auth error:", error)
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Animated.Text
					entering={FadeIn.delay(300).duration(800)}
					style={styles.title}
				>
					Fired Up
				</Animated.Text>
				<Animated.Text
					entering={FadeIn.delay(500).duration(800)}
					style={styles.tagline}
				>
					Visualize your generosity.{"\n"}Track your impact.
				</Animated.Text>
			</View>

			<View style={[styles.buttonContainer, { paddingBottom: insets.bottom + spacing.xl }]}>
				<Animated.View entering={FadeInDown.delay(700).springify()}>
					<AppleAuthentication.AppleAuthenticationButton
						buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
						buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
						cornerRadius={12}
						style={styles.appleButton}
						onPress={authenticate}
					/>
				</Animated.View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.brown,
	},
	content: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: spacing.xxl,
	},
	title: {
		fontSize: 48,
		fontWeight: fontWeights.bold,
		color: colors.white,
		marginBottom: spacing.md,
		letterSpacing: -1,
	},
	tagline: {
		fontSize: 20,
		fontWeight: fontWeights.normal,
		color: colors.white + "99",
		lineHeight: 28,
	},
	buttonContainer: {
		paddingHorizontal: spacing.xl,
		alignItems: "flex-end",
	},
	appleButton: {
		width: 200,
		height: 50,
	},
})

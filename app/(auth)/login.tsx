import * as AppleAuthentication from "expo-apple-authentication"
import { useRouter } from "expo-router"
import { Alert, Pressable, StyleSheet, Text, View } from "react-native"
import { useAuthStore } from "../../store/useAuthStore"

export default function Login() {
  const router = useRouter()
  const signIn = useAuthStore((state) => state.signIn)

  const handleAppleSignIn = async () => {
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
        // User canceled
      } else {
        Alert.alert("Error", "Apple Sign-In failed")
        console.error(e)
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={10}
          style={styles.appleButton}
          onPress={handleAppleSignIn}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don&apos;t have an account yet?</Text>
        <Pressable onPress={() => router.replace("/(auth)/signup")}>
          <Text style={styles.footerLink}>Sign Up</Text>
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

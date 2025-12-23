import { useAuthStore } from "@/store/useAuthStore"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Stack, useRouter, useSegments } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import "react-native-reanimated"

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router"

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(auth)",
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
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

function RootLayoutNav() {
  const token = useAuthStore((s) => s.token)
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    const inAuth = segments[0] === "(auth)"

    if (!token && !inAuth) {
      router.replace("/(auth)/landing")
    } else if (token && inAuth) {
      router.replace("/(app)/home")
    }
  }, [token, segments, router])

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(app)"
          options={{
            headerShown: true,
            title: "",
            headerBackTitle: "Logout",
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="(app)/modals/causeModal"
          options={{
            presentation: "fullScreenModal",
            headerShown: true,
            title: "Details",
          }}
        />
        <Stack.Screen
          name="(app)/modals/donationHistoryModal"
          options={{
            presentation: "fullScreenModal",
            headerShown: true,
            title: "Donation History",
          }}
        />
      </Stack>
    </ThemeProvider>
  )
}

import { Stack } from "expo-router"
import React from "react"

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="landing" options={{ headerShown: false }} />
      <Stack.Screen
        name="signup"
        options={{ title: "Create Account", headerBackVisible: false }}
      />
      <Stack.Screen
        name="login"
        options={{ title: "Login", headerBackVisible: false }}
      />
    </Stack>
  )
}

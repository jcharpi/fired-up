/**
 * Main home screen with skill tree canvas and bottom navigation.
 * Shows cause selector and donate button in a tab-bar style layout.
 */

import { CausePickerModal } from "@/components/CausePickerModal"
import { borderRadius, colors, spacing } from "@/constants/colors"
import { causes } from "@/constants/trees"
import { useAuthStore } from "@/store/useAuthStore"
import { useTreeStore } from "@/store/useTreeStore"
import { Feather } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function Home() {
	const insets = useSafeAreaInsets()
	const router = useRouter()
	const signOut = useAuthStore((s) => s.signOut)
	const activeCauseId = useTreeStore((s) => s.activeCauseId)
	const setActiveCause = useTreeStore((s) => s.setActiveCause)
	const [showCausePicker, setShowCausePicker] = useState(false)

	const activeCause = causes.find((c) => c.id === activeCauseId)

	return (
		<View style={[styles.container, { paddingTop: insets.top }]}>
			{/* Sign Out */}
			<Pressable style={styles.signOutButton} onPress={signOut} hitSlop={12}>
				<Feather name="log-out" size={20} color={colors.brown} />
			</Pressable>

			{/* Tree Canvas */}
			<View style={styles.canvas}>
				<Feather name="git-branch" size={64} color={colors.brown + "33"} />
				<Text style={styles.placeholderText}>
					{activeCause ? `${activeCause.name} Tree` : "Select a cause to begin"}
				</Text>
			</View>

			{/* Bottom Bar */}
			<View
				style={[
					styles.bottomBar,
					{ paddingBottom: insets.bottom + spacing.sm },
				]}
			>
				<Pressable
					style={styles.causeSelector}
					onPress={() => setShowCausePicker(true)}
				>
					{activeCause ? (
						<>
							<Feather name={activeCause.icon} size={18} color={colors.white} />
							<Text style={styles.causeSelectorText}>{activeCause.name}</Text>
						</>
					) : (
						<Text style={styles.causeSelectorText}>Choose a Cause</Text>
					)}
					<Feather name="chevron-up" size={18} color={colors.white + "80"} />
				</Pressable>

				<Pressable
					style={styles.donateButton}
					onPress={() => router.push("/modals/donateModal")}
				>
					<Feather name="gift" size={22} color={colors.white} />
				</Pressable>
			</View>

			<CausePickerModal
				visible={showCausePicker}
				onClose={() => setShowCausePicker(false)}
				causes={causes}
				selectedCauseId={activeCauseId}
				onSelectCause={setActiveCause}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
	signOutButton: {
		position: "absolute",
		top: 60,
		right: spacing.lg,
		zIndex: 10,
		padding: spacing.sm,
	},
	canvas: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: spacing.md,
	},
	placeholderText: {
		fontSize: 16,
		color: colors.brown + "66",
	},
	bottomBar: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: spacing.md,
		paddingTop: spacing.sm,
		gap: spacing.sm,
		backgroundColor: colors.white,
	},
	causeSelector: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.sm,
		backgroundColor: colors.brown,
		paddingVertical: spacing.lg,
		paddingHorizontal: spacing.lg,
		borderRadius: borderRadius.lg,
	},
	causeSelectorText: {
		flex: 1,
		color: colors.white,
		fontSize: 15,
		fontWeight: "600",
	},
	donateButton: {
		width: 56,
		height: 56,
		borderRadius: borderRadius.lg,
		backgroundColor: colors.red,
		justifyContent: "center",
		alignItems: "center",
	},
})

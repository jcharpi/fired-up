/**
 * Full-screen cause selector modal.
 * Alternative to CausePickerModal for dedicated cause selection flow.
 */

import { borderRadius, colors, fontWeights, spacing } from "@/constants/colors"
import { causes } from "@/constants/trees"
import { useTreeStore } from "@/store/useTreeStore"
import { Feather } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { Modal, Pressable, StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function CauseSelectorModal() {
	const insets = useSafeAreaInsets()
	const router = useRouter()
	const activeCauseId = useTreeStore((s) => s.activeCauseId)
	const setActiveCause = useTreeStore((s) => s.setActiveCause)

	/** Selects a cause and navigates back */
	const handleSelect = (causeId: string) => {
		setActiveCause(causeId)
		router.back()
	}

	return (
		<Modal visible animationType="slide" presentationStyle="pageSheet">
			<View style={[styles.container, { paddingBottom: insets.bottom }]}>
				<View style={styles.header}>
					<Text style={styles.title}>Select a Cause</Text>
					<Pressable onPress={() => router.back()} hitSlop={8}>
						<Feather name="x" size={24} color={colors.brown} />
					</Pressable>
				</View>

				<View style={styles.list}>
					{causes.map((cause) => {
						const isActive = cause.id === activeCauseId
						return (
							<Pressable
								key={cause.id}
								style={[styles.causeItem, isActive && styles.causeItemActive]}
								onPress={() => handleSelect(cause.id)}
							>
								<View style={[styles.iconContainer, isActive && styles.iconContainerActive]}>
									<Feather
										name={cause.icon}
										size={24}
										color={isActive ? colors.white : colors.brown}
									/>
								</View>
								<View style={styles.causeInfo}>
									<Text style={[styles.causeName, isActive && styles.causeNameActive]}>
										{cause.name}
									</Text>
									<Text style={styles.causeDescription}>{cause.description}</Text>
								</View>
								{isActive && (
									<Feather name="check" size={20} color={colors.green} />
								)}
							</Pressable>
						)
					})}
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: spacing.xl,
		paddingVertical: spacing.lg,
		borderBottomWidth: 1,
		borderBottomColor: colors.brown + "10",
	},
	title: {
		fontSize: 20,
		fontWeight: fontWeights.bold,
		color: colors.brown,
	},
	list: {
		padding: spacing.lg,
		gap: spacing.md,
	},
	causeItem: {
		flexDirection: "row",
		alignItems: "center",
		padding: spacing.lg,
		backgroundColor: colors.white,
		borderRadius: borderRadius.lg,
		gap: spacing.md,
	},
	causeItemActive: {
		backgroundColor: colors.green + "15",
		borderWidth: 2,
		borderColor: colors.green,
	},
	iconContainer: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: colors.white,
		justifyContent: "center",
		alignItems: "center",
	},
	iconContainerActive: {
		backgroundColor: colors.green,
	},
	causeInfo: {
		flex: 1,
	},
	causeName: {
		fontSize: 16,
		fontWeight: fontWeights.semibold,
		color: colors.brown,
		marginBottom: 2,
	},
	causeNameActive: {
		color: colors.green,
	},
	causeDescription: {
		fontSize: 13,
		color: colors.brown + "80",
	},
})

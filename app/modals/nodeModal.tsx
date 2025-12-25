/**
 * Skill tree node detail modal.
 * Shows node progress, goal info, and donate action.
 */

import { Button } from "@/components/Button"
import { borderRadius, colors, fontWeights, spacing } from "@/constants/colors"
import { treesData } from "@/constants/trees"
import { useTreeStore } from "@/store/useTreeStore"
import { Feather } from "@expo/vector-icons"
import { useLocalSearchParams, useRouter } from "expo-router"
import {
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function NodeModal() {
	const insets = useSafeAreaInsets()
	const router = useRouter()
	const { nodeId, causeId } = useLocalSearchParams<{
		nodeId: string
		causeId: string
	}>()

	const nodeProgress = useTreeStore((s) => s.nodeProgress)

	const tree = treesData[causeId || ""]
	const node = tree?.find((n) => n.id === nodeId)
	const progress = nodeProgress[causeId || ""]?.[nodeId || ""]

	if (!node) {
		return (
			<View style={styles.container}>
				<Text>Node not found</Text>
			</View>
		)
	}

	const isMonthly = node.goalType === "monthly_commitment"
	const currentAmount = progress?.amountDonatedUSD || 0
	const targetAmount = node.targetAmountUSD || 0
	const monthsCompleted = progress?.monthlyCommitmentMonthsCompleted || 0
	const requiredMonths = node.requiredMonths || 0

	const progressPercent = isMonthly
		? (monthsCompleted / requiredMonths) * 100
		: (currentAmount / targetAmount) * 100

	return (
		<Modal visible animationType="slide" presentationStyle="pageSheet">
			<View style={[styles.container, { paddingBottom: insets.bottom }]}>
				<View style={styles.header}>
					<View style={styles.headerLeft}>
						<View style={styles.iconContainer}>
							<Feather name="target" size={24} color={colors.green} />
						</View>
						<Text style={styles.title}>{node.title}</Text>
					</View>
					<Pressable onPress={() => router.back()} hitSlop={8}>
						<Feather name="x" size={24} color={colors.brown} />
					</Pressable>
				</View>

				<ScrollView
					style={styles.content}
					contentContainerStyle={styles.contentInner}
				>
					<Text style={styles.description}>{node.description}</Text>

					<View style={styles.progressSection}>
						<View style={styles.progressHeader}>
							<Text style={styles.progressLabel}>Progress</Text>
							<Text style={styles.progressValue}>
								{isMonthly
									? `${monthsCompleted} / ${requiredMonths} months`
									: `$${currentAmount} / $${targetAmount}`}
							</Text>
						</View>
						<View style={styles.progressBar}>
							<View
								style={[
									styles.progressFill,
									{ width: `${Math.min(progressPercent, 100)}%` },
								]}
							/>
						</View>
					</View>

					<View style={styles.goalInfo}>
						{isMonthly ? (
							<Text style={styles.goalText}>
								Donate at least ${node.minimumMonthlyAmountUSD}/month for{" "}
								{node.requiredMonths} months
							</Text>
						) : (
							<Text style={styles.goalText}>
								Donate a total of ${node.targetAmountUSD} to complete this goal
							</Text>
						)}
					</View>

					<Button
						label="Donate Now"
						onPress={() => router.push("/modals/donateModal")}
					/>
				</ScrollView>
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
	headerLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.md,
		flex: 1,
	},
	iconContainer: {
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: colors.green + "20",
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 18,
		fontWeight: fontWeights.bold,
		color: colors.brown,
		flex: 1,
	},
	content: {
		flex: 1,
	},
	contentInner: {
		padding: spacing.xl,
		gap: spacing.xl,
	},
	description: {
		fontSize: 16,
		color: colors.brown + "CC",
		lineHeight: 24,
	},
	progressSection: {
		gap: spacing.sm,
	},
	progressHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	progressLabel: {
		fontSize: 14,
		fontWeight: fontWeights.semibold,
		color: colors.brown + "80",
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},
	progressValue: {
		fontSize: 16,
		fontWeight: fontWeights.bold,
		color: colors.brown,
	},
	progressBar: {
		height: 8,
		backgroundColor: colors.brown + "15",
		borderRadius: borderRadius.sm,
		overflow: "hidden",
	},
	progressFill: {
		height: "100%",
		backgroundColor: colors.green,
		borderRadius: borderRadius.sm,
	},
	goalInfo: {
		backgroundColor: colors.brown + "08",
		padding: spacing.lg,
		borderRadius: borderRadius.lg,
	},
	goalText: {
		fontSize: 14,
		color: colors.brown + "99",
		lineHeight: 20,
	},
})

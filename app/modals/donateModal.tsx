/**
 * Donation modal with amount input and cause selection.
 * Presented as a centered card over a dimmed backdrop.
 */

import { AmountChip } from "@/components/AmountChip"
import { Button } from "@/components/Button"
import { Chip } from "@/components/Chip"
import { borderRadius, colors, fontWeights, shadows, spacing } from "@/constants/colors"
import { causes } from "@/constants/trees"
import { useTreeStore } from "@/store/useTreeStore"
import { Feather } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Alert, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native"

const SUGGESTED_AMOUNTS = [10, 25, 50, 100]

export default function DonateModal() {
	const router = useRouter()
	const activeCauseId = useTreeStore((s) => s.activeCauseId)
	const addDonation = useTreeStore((s) => s.addDonation)

	const [selectedCauseId, setSelectedCauseId] = useState(activeCauseId || "environmental")
	const [amount, setAmount] = useState("")

	const selectedCause = causes.find((c) => c.id === selectedCauseId)

	/** Validates and records the donation */
	const handleDonate = () => {
		const amountNum = parseFloat(amount)
		if (isNaN(amountNum) || amountNum <= 0) {
			Alert.alert("Invalid Amount", "Please enter a valid donation amount.")
			return
		}

		addDonation({
			causeId: selectedCauseId,
			nonprofitId: "placeholder",
			amountUSD: amountNum,
			dateISO: new Date().toISOString(),
		})

		Alert.alert(
			"Thank you!",
			`Your $${amountNum} donation to ${selectedCause?.name} has been recorded.`,
			[{ text: "Done", onPress: () => router.back() }]
		)
	}

	return (
		<Modal visible transparent animationType="fade">
			<View style={styles.overlay}>
				<Pressable style={styles.backdrop} onPress={() => router.back()} />

				<View style={styles.card}>
					<View style={styles.header}>
						<Text style={styles.title}>Make a Donation</Text>
						<Pressable onPress={() => router.back()} hitSlop={8}>
							<Feather name="x" size={24} color={colors.brown} />
						</Pressable>
					</View>

					<View style={styles.section}>
						<Text style={styles.label}>Cause</Text>
						<View style={styles.chips}>
							{causes.map((cause) => (
								<Chip
									key={cause.id}
									label={cause.name}
									isSelected={selectedCauseId === cause.id}
									onPress={() => setSelectedCauseId(cause.id)}
								/>
							))}
						</View>
					</View>

					<View style={styles.section}>
						<Text style={styles.label}>Amount</Text>
						<View style={styles.amountRow}>
							<Text style={styles.dollarSign}>$</Text>
							<TextInput
								style={styles.amountInput}
								value={amount}
								onChangeText={setAmount}
								placeholder="0"
								placeholderTextColor={colors.brown + "40"}
								keyboardType="decimal-pad"
							/>
						</View>
						<View style={styles.chips}>
							{SUGGESTED_AMOUNTS.map((amt) => (
								<AmountChip
									key={amt}
									amount={amt}
									onPress={() => setAmount(amt.toString())}
								/>
							))}
						</View>
					</View>

					<Button
						label="Donate"
						onPress={handleDonate}
						style={styles.donateButton}
					/>

					<Text style={styles.disclaimer}>
						Donations are processed through Every.org
					</Text>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	card: {
		width: "90%",
		maxWidth: 400,
		backgroundColor: colors.white,
		borderRadius: 20,
		padding: spacing.xl,
		gap: spacing.lg,
		...shadows.lg,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: fontWeights.bold,
		color: colors.brown,
	},
	section: {
		gap: spacing.sm,
	},
	label: {
		fontSize: 12,
		fontWeight: fontWeights.semibold,
		color: colors.brown + "80",
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},
	chips: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: spacing.xs,
	},
	amountRow: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.white,
		borderRadius: borderRadius.lg,
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm,
	},
	dollarSign: {
		fontSize: 28,
		fontWeight: fontWeights.bold,
		color: colors.brown,
		marginRight: spacing.xs,
	},
	amountInput: {
		flex: 1,
		fontSize: 28,
		fontWeight: fontWeights.bold,
		color: colors.brown,
	},
	donateButton: {
		marginTop: spacing.sm,
	},
	disclaimer: {
		fontSize: 11,
		color: colors.brown + "60",
		textAlign: "center",
	},
})

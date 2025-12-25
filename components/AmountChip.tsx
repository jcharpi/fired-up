/**
 * Quick-select donation amount chip.
 * @module components/AmountChip
 */

import { borderRadius, colors, fontWeights, spacing } from "@/constants/colors"
import { Pressable, StyleSheet, Text } from "react-native"

interface AmountChipProps {
	amount: number
	onPress: () => void
}

/**
 * Displays a preset donation amount as a tappable chip.
 * Used for quick amount selection in donation flows.
 */
export function AmountChip({ amount, onPress }: AmountChipProps) {
	return (
		<Pressable style={styles.chip} onPress={onPress}>
			<Text style={styles.chipText}>${amount}</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	chip: {
		paddingVertical: spacing.xs,
		paddingHorizontal: spacing.sm,
		borderRadius: borderRadius.full,
		backgroundColor: colors.brown + "10",
	},
	chipText: {
		fontSize: 13,
		color: colors.brown,
		fontWeight: fontWeights.medium,
	},
})

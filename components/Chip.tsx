/**
 * Selectable chip/tag component for filter options.
 * @module components/Chip
 */

import { borderRadius, colors, fontWeights, spacing } from "@/constants/colors"
import { Pressable, StyleSheet, Text } from "react-native"

interface ChipProps {
	label: string
	isSelected: boolean
	onPress: () => void
}

/**
 * Pill-shaped selectable chip with active/inactive states.
 */
export function Chip({ label, isSelected, onPress }: ChipProps) {
	return (
		<Pressable
			style={[styles.chip, isSelected && styles.chipActive]}
			onPress={onPress}
		>
			<Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
				{label}
			</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	chip: {
		paddingVertical: spacing.xs,
		paddingHorizontal: spacing.md,
		borderRadius: borderRadius.full,
		backgroundColor: colors.white,
		borderWidth: 1,
		borderColor: colors.brown + "20",
	},
	chipActive: {
		backgroundColor: colors.green,
		borderColor: colors.green,
	},
	chipText: {
		fontSize: 13,
		color: colors.brown,
	},
	chipTextActive: {
		color: colors.white,
		fontWeight: fontWeights.semibold,
	},
})

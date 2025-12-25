/**
 * Selectable cause list item with icon and description.
 * @module components/CauseItem
 */

import { colors, spacing } from "@/constants/colors"
import type { FeatherIconName } from "@/constants/types"
import { Feather } from "@expo/vector-icons"
import { Pressable, StyleSheet, Text, View } from "react-native"

export interface CauseItemProps {
	icon: FeatherIconName
	title: string
	description: string
	isSelected: boolean
	onPress: () => void
}

/**
 * Renders a cause option with icon, title, and description.
 * Shows a checkmark when selected with highlighted styling.
 */
export function CauseItem({
	icon,
	title,
	description,
	isSelected,
	onPress,
}: CauseItemProps) {
	return (
		<Pressable
			style={[styles.container, isSelected && styles.containerActive]}
			onPress={onPress}
		>
			<Feather
				name={icon}
				size={20}
				color={isSelected ? colors.white : colors.brown}
			/>
			<View style={styles.textContainer}>
				<Text style={[styles.title, isSelected && styles.titleActive]}>
					{title}
				</Text>
				<Text
					style={[styles.description, isSelected && styles.descriptionActive]}
				>
					{description}
				</Text>
			</View>
			{isSelected && <Feather name="check" size={20} color={colors.white} />}
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.md,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.md,
		borderRadius: 12,
		marginBottom: spacing.xs,
	},
	containerActive: {
		backgroundColor: colors.green,
	},
	textContainer: {
		flex: 1,
	},
	title: {
		fontSize: 16,
		fontWeight: "600",
		color: colors.brown,
	},
	titleActive: {
		color: colors.white,
	},
	description: {
		fontSize: 13,
		color: colors.brown + "80",
		marginTop: 2,
	},
	descriptionActive: {
		color: colors.white + "CC",
	},
})

/**
 * Primary and secondary button component with loading state.
 * @module components/Button
 */

import { colors, fontWeights, spacing } from "@/constants/colors"
import { Feather } from "@expo/vector-icons"
import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	Text,
	ViewStyle,
} from "react-native"

type ButtonVariant = "primary" | "secondary"

interface ButtonProps {
	label: string
	onPress: () => void
	variant?: ButtonVariant
	icon?: keyof typeof Feather.glyphMap
	disabled?: boolean
	loading?: boolean
	style?: ViewStyle
}

/**
 * Styled button with primary (green) and secondary (red) variants.
 * Supports optional leading icon and loading spinner state.
 */
export function Button({
	label,
	onPress,
	variant = "primary",
	icon,
	disabled = false,
	loading = false,
	style,
}: ButtonProps) {
	const isDisabled = disabled || loading

	return (
		<Pressable
			style={[
				styles.button,
				variantStyles[variant],
				isDisabled && styles.buttonDisabled,
				style,
			]}
			onPress={onPress}
			disabled={isDisabled}
		>
			{loading ? (
				<ActivityIndicator size="small" color={colors.white} />
			) : (
				<>
					{icon && (
						<Feather
							name={icon}
							size={18}
							color={colors.white}
							style={styles.icon}
						/>
					)}
					<Text style={[styles.buttonText, textStyles[variant]]}>{label}</Text>
				</>
			)}
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.xl,
		borderRadius: 12,
	},
	buttonDisabled: {
		opacity: 0.5,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: fontWeights.bold,
	},
	icon: {
		marginRight: spacing.sm,
	},
})

const variantStyles = StyleSheet.create({
	primary: {
		backgroundColor: colors.green,
	},
	secondary: {
		backgroundColor: colors.red,
	},
})

const textStyles = StyleSheet.create({
	primary: {
		color: colors.white,
	},
	secondary: {
		color: colors.brown,
	},
})

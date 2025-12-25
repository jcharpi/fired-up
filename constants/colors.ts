/**
 * Design system constants for the Fired Up app.
 * Contains colors, spacing, typography, and shadow styles.
 * @module constants/colors
 */

import type { TextStyle } from "react-native"

/**
 * Core color palette
 */
export const colors = {
	/** Dark brown - primary text and UI elements */
	brown: "#1A130E",
	/** Sage green - positive actions and accents */
	green: "#60712F",
	/** Rose red - donation/CTA actions */
	red: "#DB5461",
	/** Off-white - backgrounds and light text */
	white: "#EBF5EE",
} as const

/**
 * Spacing scale in pixels
 */
export const spacing = {
	xs: 4,
	sm: 8,
	md: 12,
	lg: 16,
	xl: 24,
	xxl: 32,
	xxxl: 48,
} as const

/**
 * Font size scale in pixels
 */
export const fontSizes = {
	xs: 12,
	sm: 14,
	base: 16,
	lg: 18,
	xl: 20,
	"2xl": 24,
	"3xl": 32,
} as const

type FontWeight = TextStyle["fontWeight"]

/**
 * Font weight scale for consistent typography
 */
export const fontWeights: Record<string, FontWeight> = {
	light: "300",
	normal: "400",
	medium: "500",
	semibold: "600",
	bold: "700",
}

/**
 * Border radius scale
 */
export const borderRadius = {
	none: 0,
	sm: 4,
	md: 8,
	lg: 12,
	full: 9999,
} as const

/**
 * Shadow presets for elevation effects
 */
export const shadows = {
	sm: {
		shadowColor: colors.brown,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.18,
		shadowRadius: 1.0,
		elevation: 1,
	},
	md: {
		shadowColor: colors.brown,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.23,
		shadowRadius: 2.62,
		elevation: 4,
	},
	lg: {
		shadowColor: colors.brown,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		elevation: 8,
	},
} as const

/**
 * Shared type definitions for the Fired Up app
 * @module constants/types
 */

import { Feather } from "@expo/vector-icons"

/**
 * Valid icon names from the Feather icon set.
 * Used for type-safe icon rendering throughout the app.
 */
export type FeatherIconName = keyof typeof Feather.glyphMap

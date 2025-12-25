/**
 * Color palette constants for the Fire-Up app
 */

export const colors = {
  // Primary green - used for main backgrounds
  primary: '#558B6E',
  
  // Dark brown - used for primary text
  trunk: '#1A130E',
  
  // Sage green - used for accents and secondary elements
  leaf: '#60712F',
  
  // Rose red - used for destructive/warning actions
  love: '#DB5461',
  
  // Off-white - used for light backgrounds and accent text
  accent: '#EBF5EE',
} as const;

/**
 * Spacing constants (in pixels)
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

/**
 * Font sizes constants (in pixels)
 */
export const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
} as const;

/**
 * Font weights
 */
export const fontWeights = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

/**
 * Border radius constants
 */
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  full: 9999,
} as const;

/**
 * Shadow styles (iOS style elevations)
 */
export const shadows = {
  sm: {
    shadowColor: colors.trunk,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: colors.trunk,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.trunk,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 8,
  },
} as const;

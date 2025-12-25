/**
 * Bottom sheet modal for selecting a charitable cause.
 * @module components/CausePickerModal
 */

import { colors, spacing } from "@/constants/colors"
import { FeatherIconName } from "@/constants/types"
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { CauseItem } from "./CauseItem"

interface Cause {
	id: string
	name: string
	description: string
	icon: FeatherIconName
}

interface CausePickerModalProps {
	visible: boolean
	onClose: () => void
	causes: Cause[]
	selectedCauseId: string | null
	onSelectCause: (causeId: string) => void
}

/**
 * Animated bottom sheet for cause selection.
 * Slides up from the bottom with a semi-transparent backdrop.
 */
export function CausePickerModal({
	visible,
	onClose,
	causes,
	selectedCauseId,
	onSelectCause,
}: CausePickerModalProps) {
	const insets = useSafeAreaInsets()

	const handleSelect = (causeId: string) => {
		onSelectCause(causeId)
		onClose()
	}

	return (
		<Modal
			visible={visible}
			transparent
			animationType="none"
			onRequestClose={onClose}
		>
			<View style={styles.container}>
				<Pressable style={StyleSheet.absoluteFill} onPress={onClose}>
					<Animated.View
						entering={FadeIn.duration(200)}
						exiting={FadeOut.duration(200)}
						style={styles.overlay}
					/>
				</Pressable>

				<Animated.View
					entering={SlideInDown.duration(200)}
					exiting={SlideOutDown.duration(200)}
					style={[styles.picker, { paddingBottom: insets.bottom + spacing.lg }]}
				>
					<Pressable onPress={onClose}>
						<View style={styles.handle} />
					</Pressable>
					<Text style={styles.title}>Select a Cause</Text>
					<ScrollView
						style={styles.scroll}
						showsVerticalScrollIndicator={false}
					>
						{causes.map((cause) => (
							<CauseItem
								key={cause.id}
								icon={cause.icon}
								title={cause.name}
								description={cause.description}
								isSelected={selectedCauseId === cause.id}
								onPress={() => handleSelect(cause.id)}
							/>
						))}
					</ScrollView>
				</Animated.View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.4)",
	},
	picker: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: colors.white,
		borderTopLeftRadius: spacing.xl,
		borderTopRightRadius: spacing.xl,
		paddingTop: spacing.sm,
		maxHeight: "60%",
	},
	handle: {
		width: 36,
		height: 4,
		backgroundColor: colors.brown + "20",
		borderRadius: 2,
		alignSelf: "center",
		marginBottom: spacing.md,
	},
	title: {
		fontSize: 18,
		fontWeight: "700",
		color: colors.brown,
		paddingHorizontal: spacing.xl,
		marginBottom: spacing.md,
	},
	scroll: {
		paddingHorizontal: spacing.lg,
	},
})

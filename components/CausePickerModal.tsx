/**
 * Bottom sheet modal for selecting a charitable cause.
 * @module components/CausePickerModal
 */

import { colors, spacing } from "@/constants/colors"
import { FeatherIconName } from "@/constants/types"
import { Modal, ScrollView, StyleSheet, Text, View } from "react-native"
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
 * Native bottom sheet for cause selection.
 * Uses iOS pageSheet presentation with swipe-to-dismiss.
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
			animationType="slide"
			presentationStyle="pageSheet"
			onRequestClose={onClose}
		>
			<View style={[styles.container, { paddingBottom: insets.bottom }]}>
				<View style={styles.header}>
					<Text style={styles.title}>Select a Cause</Text>
				</View>
				<ScrollView
					style={styles.scroll}
					contentContainerStyle={styles.scrollContent}
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
		paddingHorizontal: spacing.xl,
		paddingTop: spacing.lg,
		paddingBottom: spacing.md,
		borderBottomWidth: 1,
		borderBottomColor: colors.brown + "10",
	},
	title: {
		fontSize: 18,
		fontWeight: "700",
		color: colors.brown,
	},
	scroll: {
		flex: 1,
	},
	scrollContent: {
		padding: spacing.lg,
	},
})

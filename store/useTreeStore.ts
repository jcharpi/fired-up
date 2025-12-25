/**
 * Skill tree state management using Zustand with AsyncStorage persistence.
 * Tracks donation progress, active causes, and tree node completion.
 * @module store/useTreeStore
 */

import type { FeatherIconName } from "@/constants/types"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

/** How a tree node's goal is measured */
export type NodeGoalType = "total_donation" | "monthly_commitment"

/** A single node in the skill tree */
export interface TreeNode {
	id: string
	title: string
	description: string
	goalType: NodeGoalType
	/** Required total amount (for total_donation goals) */
	targetAmountUSD?: number
	/** Required months of commitment (for monthly goals) */
	requiredMonths?: number
	/** Minimum monthly amount (for monthly goals) */
	minimumMonthlyAmountUSD?: number
	/** Prerequisite node IDs that must be completed first */
	parentIds: string[]
	/** Valid nonprofit IDs for donations to this node */
	nonprofitIds: string[]
	defaultNonprofitId: string
}

/** User's progress toward completing a tree node */
export interface NodeProgress {
	amountDonatedUSD: number
	monthlyCommitmentMonthsCompleted: number
	selectedNonprofitId: string | null
	completed: boolean
}

/** A charitable cause category with its own skill tree */
export interface Cause {
	id: string
	name: string
	description: string
	icon: FeatherIconName
}

/** Record of a single donation */
export interface DonationRecord {
	id: string
	causeId: string
	nonprofitId: string
	amountUSD: number
	dateISO: string
}

interface TreeState {
	activeCauseId: string | null
	/** Set the currently active cause */
	setActiveCause: (causeId: string) => void
	/** Progress map: causeId -> nodeId -> progress */
	nodeProgress: Record<string, Record<string, NodeProgress>>
	donationHistory: DonationRecord[]
	/** Record a new donation */
	addDonation: (donation: Omit<DonationRecord, "id">) => void
	/** Update progress for a specific node */
	updateNodeProgress: (causeId: string, nodeId: string, progress: Partial<NodeProgress>) => void
	/** Mark a node as completed */
	completeNode: (causeId: string, nodeId: string) => void
}

/**
 * Global tree progress store.
 * Persists donation history and node completion state using AsyncStorage.
 */
export const useTreeStore = create<TreeState>()(
	persist(
		(set, get) => ({
			activeCauseId: null,

			setActiveCause: (causeId) => set({ activeCauseId: causeId }),

			nodeProgress: {},

			donationHistory: [],

			addDonation: (donation) => {
				const id = `donation-${Date.now()}`
				set((state) => ({
					donationHistory: [...state.donationHistory, { ...donation, id }],
				}))
			},

			updateNodeProgress: (causeId, nodeId, progress) => {
				set((state) => ({
					nodeProgress: {
						...state.nodeProgress,
						[causeId]: {
							...state.nodeProgress[causeId],
							[nodeId]: {
								...state.nodeProgress[causeId]?.[nodeId],
								...progress,
							},
						},
					},
				}))
			},

			completeNode: (causeId, nodeId) => {
				get().updateNodeProgress(causeId, nodeId, { completed: true })
			},
		}),
		{
			name: "tree-storage",
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
)

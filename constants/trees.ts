/**
 * Cause definitions and skill tree data.
 * Each cause has an associated tree of donation goals.
 * @module constants/trees
 */

import type { Cause, TreeNode } from "@/store/useTreeStore"

/** Available charitable causes */
export const causes: Cause[] = [
	{
		id: "environmental",
		name: "Environmental Protection",
		description: "Support conservation, reforestation, and climate action",
		icon: "globe",
	},
	{
		id: "education",
		name: "Education",
		description: "Fund learning opportunities worldwide",
		icon: "book-open",
	},
	{
		id: "mental-health",
		name: "Mental Health",
		description: "Support mental wellness initiatives",
		icon: "heart",
	},
	{
		id: "animal-welfare",
		name: "Animal Welfare",
		description: "Protect and care for animals",
		icon: "github",
	},
]

/** Environmental Protection skill tree */
export const environmentalTree: TreeNode[] = [
	// Tier 0: Root
	{
		id: "root",
		title: "Protect the Planet",
		description: "Your journey to environmental stewardship begins here.",
		goalType: "total_donation",
		targetAmountUSD: 0,
		parentIds: [],
		nonprofitIds: [],
		defaultNonprofitId: "",
	},

	// Tier 1: Entry Actions
	{
		id: "plant-trees",
		title: "Plant Native Trees",
		description: "Fund native tree planting initiatives in your region.",
		goalType: "total_donation",
		targetAmountUSD: 300,
		parentIds: ["root"],
		nonprofitIds: ["one-tree-planted", "arbor-day"],
		defaultNonprofitId: "one-tree-planted",
	},
	{
		id: "reduce-plastic",
		title: "Reduce Plastic Waste",
		description: "Support organizations fighting plastic pollution.",
		goalType: "total_donation",
		targetAmountUSD: 200,
		parentIds: ["root"],
		nonprofitIds: ["ocean-conservancy", "plastic-pollution"],
		defaultNonprofitId: "ocean-conservancy",
	},
	{
		id: "wildlife-rescue",
		title: "Support Wildlife Rescue",
		description: "Help rescue and rehabilitate wildlife in need.",
		goalType: "total_donation",
		targetAmountUSD: 250,
		parentIds: ["root"],
		nonprofitIds: ["wildlife-rescue", "wwf"],
		defaultNonprofitId: "wildlife-rescue",
	},

	// Tier 2: Projects & Commitments
	{
		id: "urban-reforestation",
		title: "Urban Reforestation Project",
		description: "Fund large-scale tree planting in urban areas.",
		goalType: "total_donation",
		targetAmountUSD: 600,
		parentIds: ["plant-trees"],
		nonprofitIds: ["one-tree-planted", "arbor-day"],
		defaultNonprofitId: "one-tree-planted",
	},
	{
		id: "monthly-reforestation-3",
		title: "Monthly Reforestation Support",
		description: "Commit to 3 months of ongoing reforestation support.",
		goalType: "monthly_commitment",
		requiredMonths: 3,
		minimumMonthlyAmountUSD: 10,
		parentIds: ["plant-trees"],
		nonprofitIds: ["one-tree-planted"],
		defaultNonprofitId: "one-tree-planted",
	},
	{
		id: "community-cleanup",
		title: "Community Cleanup Funding",
		description: "Support community-led cleanup initiatives.",
		goalType: "total_donation",
		targetAmountUSD: 400,
		parentIds: ["reduce-plastic"],
		nonprofitIds: ["ocean-conservancy"],
		defaultNonprofitId: "ocean-conservancy",
	},
	{
		id: "monthly-waste-6",
		title: "Monthly Waste Reduction Support",
		description: "Commit to 6 months of waste reduction advocacy.",
		goalType: "monthly_commitment",
		requiredMonths: 6,
		minimumMonthlyAmountUSD: 10,
		parentIds: ["reduce-plastic"],
		nonprofitIds: ["plastic-pollution"],
		defaultNonprofitId: "plastic-pollution",
	},

	// Tier 3: Long-Term Impact
	{
		id: "monthly-reforestation-6",
		title: "Reforestation Commitment (6 months)",
		description: "Deepen your commitment with 6 months of support.",
		goalType: "monthly_commitment",
		requiredMonths: 6,
		minimumMonthlyAmountUSD: 15,
		parentIds: ["monthly-reforestation-3"],
		nonprofitIds: ["one-tree-planted"],
		defaultNonprofitId: "one-tree-planted",
	},
	{
		id: "monthly-reforestation-12",
		title: "Reforestation Commitment (12 months)",
		description: "A full year of sustained reforestation support.",
		goalType: "monthly_commitment",
		requiredMonths: 12,
		minimumMonthlyAmountUSD: 20,
		parentIds: ["monthly-reforestation-3"],
		nonprofitIds: ["one-tree-planted"],
		defaultNonprofitId: "one-tree-planted",
	},
	{
		id: "habitat-restoration",
		title: "Regional Habitat Restoration",
		description: "Major funding for regional ecosystem restoration.",
		goalType: "total_donation",
		targetAmountUSD: 1500,
		parentIds: ["urban-reforestation"],
		nonprofitIds: ["one-tree-planted", "wwf"],
		defaultNonprofitId: "wwf",
	},

	// Tier 4: Capstone
	{
		id: "capstone",
		title: "Sustained Environmental Stewardship",
		description:
			"You've made a lasting impact. $3,000 lifetime or 12-month commitment.",
		goalType: "total_donation",
		targetAmountUSD: 3000,
		parentIds: ["habitat-restoration", "monthly-reforestation-12"],
		nonprofitIds: ["one-tree-planted", "wwf", "ocean-conservancy"],
		defaultNonprofitId: "wwf",
	},
]

/** Map of cause ID to its skill tree */
export const treesData: Record<string, TreeNode[]> = {
	environmental: environmentalTree,
}

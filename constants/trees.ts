/**
 * Cause definitions and skill tree data.
 * Each cause has an associated tree of donation goals.
 * @module constants/trees
 */

import type { Cause, TreeNode } from "@/store/useTreeStore"

// =============================================================================
// CAUSES
// =============================================================================

/** Available charitable causes */
export const causes: Cause[] = [
	{
		id: "people-community",
		name: "People & Community",
		description: "Support youth, seniors, and diverse communities",
		icon: "users",
	},
	{
		id: "housing-poverty",
		name: "Housing & Poverty",
		description: "Fight homelessness and food insecurity",
		icon: "home",
	},
	{
		id: "animals-wildlife",
		name: "Animals & Wildlife",
		description: "Protect animals and preserve wildlife",
		icon: "heart",
	},
	{
		id: "environment",
		name: "Environment",
		description: "Combat climate change and protect nature",
		icon: "globe",
	},
	{
		id: "health-medicine",
		name: "Health & Medicine",
		description: "Support medical research and mental health",
		icon: "activity",
	},
	{
		id: "arts-culture",
		name: "Arts & Culture",
		description: "Fund creativity and cultural preservation",
		icon: "music",
	},
	{
		id: "education",
		name: "Education",
		description: "Expand access to learning and knowledge",
		icon: "book-open",
	},
	{
		id: "humanitarian",
		name: "Humanitarian Relief",
		description: "Provide crisis and disaster relief",
		icon: "shield",
	},
]

// =============================================================================
// HELPER: Generate standard donation nodes for a subcategory
// =============================================================================

/**
 * Generates a standard set of donation nodes for a subcategory.
 * Creates one-time ($15, $50, $100) and monthly (3, 6, 12 months) options.
 */
function createSubcategoryNodes(
	subcategoryId: string,
	subcategoryTitle: string,
	description: string,
	parentId: string
): TreeNode[] {
	return [
		// One-time donations
		{
			id: `${subcategoryId}-15`,
			title: `${subcategoryTitle} - $15`,
			description: `Make a $15 one-time donation to support ${description}.`,
			goalType: "total_donation",
			targetAmountUSD: 15,
			parentIds: [parentId],
			nonprofitIds: [],
			defaultNonprofitId: "",
		},
		{
			id: `${subcategoryId}-50`,
			title: `${subcategoryTitle} - $50`,
			description: `Make a $50 one-time donation to support ${description}.`,
			goalType: "total_donation",
			targetAmountUSD: 50,
			parentIds: [`${subcategoryId}-15`],
			nonprofitIds: [],
			defaultNonprofitId: "",
		},
		{
			id: `${subcategoryId}-100`,
			title: `${subcategoryTitle} - $100`,
			description: `Make a $100 one-time donation to support ${description}.`,
			goalType: "total_donation",
			targetAmountUSD: 100,
			parentIds: [`${subcategoryId}-50`],
			nonprofitIds: [],
			defaultNonprofitId: "",
		},
		// Monthly commitments
		{
			id: `${subcategoryId}-monthly-3`,
			title: `${subcategoryTitle} - 3 Month Supporter`,
			description: `Commit to 3 months of $10/month donations for ${description}.`,
			goalType: "monthly_commitment",
			requiredMonths: 3,
			minimumMonthlyAmountUSD: 10,
			parentIds: [parentId],
			nonprofitIds: [],
			defaultNonprofitId: "",
		},
		{
			id: `${subcategoryId}-monthly-6`,
			title: `${subcategoryTitle} - 6 Month Supporter`,
			description: `Commit to 6 months of $10/month donations for ${description}.`,
			goalType: "monthly_commitment",
			requiredMonths: 6,
			minimumMonthlyAmountUSD: 10,
			parentIds: [`${subcategoryId}-monthly-3`],
			nonprofitIds: [],
			defaultNonprofitId: "",
		},
		{
			id: `${subcategoryId}-monthly-12`,
			title: `${subcategoryTitle} - 12 Month Champion`,
			description: `Commit to a full year of $10/month donations for ${description}.`,
			goalType: "monthly_commitment",
			requiredMonths: 12,
			minimumMonthlyAmountUSD: 10,
			parentIds: [`${subcategoryId}-monthly-6`],
			nonprofitIds: [],
			defaultNonprofitId: "",
		},
	]
}

// =============================================================================
// PEOPLE, IDENTITY & COMMUNITY
// =============================================================================

export const peopleCommunityTree: TreeNode[] = [
	// Root
	{
		id: "root",
		title: "People & Community",
		description: "Support diverse communities and champion equality.",
		goalType: "total_donation",
		targetAmountUSD: 0,
		parentIds: [],
		nonprofitIds: [],
		defaultNonprofitId: "",
	},

	// Branch roots
	{
		id: "youth-root",
		title: "Youth Programs",
		description: "Empower the next generation.",
		goalType: "total_donation",
		targetAmountUSD: 0,
		parentIds: ["root"],
		nonprofitIds: [],
		defaultNonprofitId: "",
	},
	{
		id: "seniors-root",
		title: "Senior Support",
		description: "Care for our elders.",
		goalType: "total_donation",
		targetAmountUSD: 0,
		parentIds: ["root"],
		nonprofitIds: [],
		defaultNonprofitId: "",
	},
	{
		id: "lgbt-root",
		title: "LGBTQ+ Rights",
		description: "Support LGBTQ+ equality and acceptance.",
		goalType: "total_donation",
		targetAmountUSD: 0,
		parentIds: ["root"],
		nonprofitIds: [],
		defaultNonprofitId: "",
	},
	{
		id: "transgender-root",
		title: "Transgender Support",
		description: "Support transgender individuals and advocacy.",
		goalType: "total_donation",
		targetAmountUSD: 0,
		parentIds: ["root"],
		nonprofitIds: [],
		defaultNonprofitId: "",
	},
	{
		id: "gender-equality-root",
		title: "Gender Equality",
		description: "Champion gender equality worldwide.",
		goalType: "total_donation",
		targetAmountUSD: 0,
		parentIds: ["root"],
		nonprofitIds: [],
		defaultNonprofitId: "",
	},
	{
		id: "religion-root",
		title: "Religious Communities",
		description: "Support faith-based initiatives.",
		goalType: "total_donation",
		targetAmountUSD: 0,
		parentIds: ["root"],
		nonprofitIds: [],
		defaultNonprofitId: "",
	},
	{
		id: "justice-root",
		title: "Justice & Rights",
		description: "Fight for justice and civil rights.",
		goalType: "total_donation",
		targetAmountUSD: 0,
		parentIds: ["root"],
		nonprofitIds: [],
		defaultNonprofitId: "",
	},
	{
		id: "immigration-root",
		title: "Immigrants & Refugees",
		description: "Support immigrants and refugees.",
		goalType: "total_donation",
		targetAmountUSD: 0,
		parentIds: ["root"],
		nonprofitIds: [],
		defaultNonprofitId: "",
	},

	// Youth subcategory nodes
	...createSubcategoryNodes("youth", "Youth", "youth programs and education", "youth-root"),

	// Seniors subcategory nodes
	...createSubcategoryNodes("seniors", "Seniors", "senior care and services", "seniors-root"),

	// LGBT subcategory nodes
	...createSubcategoryNodes("lgbt", "LGBTQ+", "LGBTQ+ rights and services", "lgbt-root"),

	// Transgender subcategory nodes
	...createSubcategoryNodes("transgender", "Transgender", "transgender support services", "transgender-root"),

	// Gender Equality subcategory nodes
	...createSubcategoryNodes("gender-equality", "Gender Equality", "gender equality initiatives", "gender-equality-root"),

	// Religion subcategories
	...createSubcategoryNodes("buddhism", "Buddhism", "Buddhist communities", "religion-root"),
	...createSubcategoryNodes("christianity", "Christianity", "Christian communities", "religion-root"),
	...createSubcategoryNodes("hinduism", "Hinduism", "Hindu communities", "religion-root"),
	...createSubcategoryNodes("islam", "Islam", "Islamic communities", "religion-root"),
	...createSubcategoryNodes("judaism", "Judaism", "Jewish communities", "religion-root"),
	...createSubcategoryNodes("religion-general", "Interfaith", "interfaith initiatives", "religion-root"),

	// Justice subcategories
	...createSubcategoryNodes("racial-justice", "Racial Justice", "racial justice and equity", "justice-root"),
	...createSubcategoryNodes("justice-general", "Justice Reform", "justice system reform", "justice-root"),
	...createSubcategoryNodes("legal-aid", "Legal Aid", "legal aid services", "justice-root"),
	...createSubcategoryNodes("voting-rights", "Voting Rights", "voting rights protection", "justice-root"),

	// Immigration subcategories
	...createSubcategoryNodes("immigrants", "Immigrants", "immigrant support services", "immigration-root"),
	...createSubcategoryNodes("refugees", "Refugees", "refugee assistance", "immigration-root"),
]

// =============================================================================
// HOUSING, POVERTY & BASIC NEEDS
// =============================================================================

export const housingPovertyTree: TreeNode[] = [
	{
		id: "root",
		title: "Housing & Basic Needs",
		description: "Fight poverty and ensure everyone has a home.",
		goalType: "total_donation",
		targetAmountUSD: 0,
		parentIds: [],
		nonprofitIds: [],
		defaultNonprofitId: "",
	},
	...createSubcategoryNodes("adoption", "Adoption Services", "adoption and foster care", "root"),
	...createSubcategoryNodes("housing", "Housing", "housing and shelter programs", "root"),
	...createSubcategoryNodes("poverty", "Poverty Relief", "poverty alleviation", "root"),
	...createSubcategoryNodes("food-security", "Food Security", "food banks and nutrition programs", "root"),
]

// =============================================================================
// ANIMALS & WILDLIFE
// =============================================================================

export const animalsWildlifeTree: TreeNode[] = [
	{
		id: "root",
		title: "Animals & Wildlife",
		description: "Protect and care for animals everywhere.",
		goalType: "total_donation",
		targetAmountUSD: 0,
		parentIds: [],
		nonprofitIds: [],
		defaultNonprofitId: "",
	},
	...createSubcategoryNodes("animals-general", "Animal Welfare", "general animal welfare", "root"),
	...createSubcategoryNodes("cats", "Cat Rescue", "cat rescue and adoption", "root"),
	...createSubcategoryNodes("dogs", "Dog Rescue", "dog rescue and adoption", "root"),
	...createSubcategoryNodes("wildlife", "Wildlife Conservation", "wildlife protection", "root"),
]

// =============================================================================
// ENVIRONMENT & CONSERVATION
// =============================================================================

export const environmentTree: TreeNode[] = [
	{
		id: "root",
		title: "Environment & Conservation",
		description: "Protect our planet for future generations.",
		goalType: "total_donation",
		targetAmountUSD: 0,
		parentIds: [],
		nonprofitIds: [],
		defaultNonprofitId: "",
	},
	...createSubcategoryNodes("climate", "Climate Action", "climate change initiatives", "root"),
	...createSubcategoryNodes("conservation", "Conservation", "land and habitat conservation", "root"),
	...createSubcategoryNodes("oceans", "Ocean Protection", "ocean conservation", "root"),
	...createSubcategoryNodes("parks", "Parks & Recreation", "parks preservation", "root"),
	...createSubcategoryNodes("water", "Clean Water", "clean water access", "root"),
	...createSubcategoryNodes("wildfires", "Wildfire Relief", "wildfire prevention and recovery", "root"),
]

// =============================================================================
// HEALTH & MEDICINE
// =============================================================================

export const healthMedicineTree: TreeNode[] = [
	{
		id: "root",
		title: "Health & Medicine",
		description: "Support medical research and healthcare access.",
		goalType: "total_donation",
		targetAmountUSD: 0,
		parentIds: [],
		nonprofitIds: [],
		defaultNonprofitId: "",
	},
	...createSubcategoryNodes("autism", "Autism Support", "autism research and support", "root"),
	...createSubcategoryNodes("cancer", "Cancer Research", "cancer research and patient support", "root"),
	...createSubcategoryNodes("disease", "Disease Research", "disease research and prevention", "root"),
	...createSubcategoryNodes("health-general", "General Health", "healthcare access", "root"),
	...createSubcategoryNodes("mental-health", "Mental Health", "mental health services", "root"),
	...createSubcategoryNodes("womens-health", "Women's Health", "women's health initiatives", "root"),
]

// =============================================================================
// ARTS & CULTURE
// =============================================================================

export const artsCultureTree: TreeNode[] = [
	{
		id: "root",
		title: "Arts & Culture",
		description: "Celebrate creativity and preserve culture.",
		goalType: "total_donation",
		targetAmountUSD: 0,
		parentIds: [],
		nonprofitIds: [],
		defaultNonprofitId: "",
	},
	...createSubcategoryNodes("art", "Visual Arts", "visual arts programs", "root"),
	...createSubcategoryNodes("dance", "Dance", "dance education and performance", "root"),
	...createSubcategoryNodes("film-tv", "Film & TV", "film and television arts", "root"),
	...createSubcategoryNodes("music", "Music", "music education and performance", "root"),
	...createSubcategoryNodes("museums", "Museums", "museum preservation and access", "root"),
	...createSubcategoryNodes("theater", "Theater", "theater arts", "root"),
	...createSubcategoryNodes("radio", "Public Radio", "public radio and media", "root"),
]

// =============================================================================
// EDUCATION & KNOWLEDGE
// =============================================================================

export const educationTree: TreeNode[] = [
	{
		id: "root",
		title: "Education & Knowledge",
		description: "Expand access to learning for all.",
		goalType: "total_donation",
		targetAmountUSD: 0,
		parentIds: [],
		nonprofitIds: [],
		defaultNonprofitId: "",
	},
	...createSubcategoryNodes("education-general", "Education", "educational programs", "root"),
	...createSubcategoryNodes("libraries", "Libraries", "library access and literacy", "root"),
	...createSubcategoryNodes("research", "Research", "academic research", "root"),
	...createSubcategoryNodes("science", "Science", "science education and outreach", "root"),
]

// =============================================================================
// HUMANITARIAN & CRISIS RELIEF
// =============================================================================

export const humanitarianTree: TreeNode[] = [
	{
		id: "root",
		title: "Humanitarian Relief",
		description: "Provide aid in times of crisis.",
		goalType: "total_donation",
		targetAmountUSD: 0,
		parentIds: [],
		nonprofitIds: [],
		defaultNonprofitId: "",
	},
	...createSubcategoryNodes("afghanistan", "Afghanistan Relief", "Afghanistan humanitarian aid", "root"),
	...createSubcategoryNodes("disaster-relief", "Disaster Relief", "disaster response and recovery", "root"),
	...createSubcategoryNodes("humanitarian-general", "Global Humanitarian", "global humanitarian efforts", "root"),
]

// =============================================================================
// TREE DATA MAP
// =============================================================================

/** Map of cause ID to its skill tree */
export const treesData: Record<string, TreeNode[]> = {
	"people-community": peopleCommunityTree,
	"housing-poverty": housingPovertyTree,
	"animals-wildlife": animalsWildlifeTree,
	environment: environmentTree,
	"health-medicine": healthMedicineTree,
	"arts-culture": artsCultureTree,
	education: educationTree,
	humanitarian: humanitarianTree,
}

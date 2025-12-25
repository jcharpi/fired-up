# Fired Up

**Fired Up** is a personal React Native app that turns charitable giving into a clear, navigable **skill tree of impact**.
Each **cause** (e.g. Environmental Protection) is its own skill tree.
Each **node** is a concrete funding or commitment goal.
Progress is tracked **only by money and commitment duration** — no XP, no badges, no prestige systems.

The UI is intentionally minimal, calm, and non-manipulative: it visualizes where your money has gone and what kinds of impact you’ve chosen to support.

---

## Core Product Principles

* **Money is the only progression metric**
* **Each cause has its own independent skill tree**
* **Nodes represent real, meaningful goals**
* **Users may complete a tree — completion is allowed**
* **No gamification fluff (XP, streaks, leaderboards, badges)**
* **Nonprofits are selectable but constrained by cause**
* **Some nodes require time-based commitment (monthly giving)**

---

## Screens & UI Flow

### 1. Landing Screen (Unauthenticated)

**Purpose:** immediate clarity + zero friction

**Layout**

* Full screen
* Calm background (dark, organic)
* App name + short tagline
* **Continue with Apple** button:

  * Positioned **bottom-right**
  * Elevated, modern (not flat)

**Behavior**

* Apple Sign In only
* After first login, this screen is never shown again

---

### 2. Home Screen — Skill Tree View (Authenticated)

This is the **primary and only main screen**.

**Layout**

* Full-screen, freely pannable + zoomable canvas
* Dark background
* Elevated nodes connected by curved paths
* Tree is always visible and navigable

**Persistent UI Elements**

* **Top-right:** Sign out button
* **Bottom-right:** Global “Donate” floating action button
* **Bottom-center:** Cause selector dropdown (reach-friendly)

There is **no horizontal carousel** of causes.
Cause switching is explicit via the bottom selector only.

---

### 3. Cause Selector (Bottom Dropdown)

**Purpose:** switch skill trees without gesture conflicts

**UI**

* Pill-shaped dropdown centered at bottom
* Shows current cause name (e.g. “Environmental Protection”)
* Tap opens modal list of causes
* Selecting a cause:

  * Instantly swaps the tree
  * Smooth fade / cross-transition

---

### 4. Skill Tree Interaction

**Tree behavior**

* Freely pannable and pinch-zoomable
* Nodes are always visible (locked nodes are dimmed)
* No hidden nodes or surprise unlocks

**Node visual states**

* **Locked:** dimmed, low contrast
* **In progress:** visible progress ring ($)
* **Completed:** fully lit with subtle halo

Nodes never disappear after completion.

---

### 5. Node Modal (Core Interaction)

Tapping a node opens a modal card.

**Modal contents**

1. **Node title + icon**
2. **Goal description**
3. **Progress display**

   * `$120 / $300 funded`
   * or commitment progress (`2 / 6 months`)
4. **Primary Donate Button**

   * Default suggested amount
5. **Nonprofit selector**

   * Dropdown showing nonprofits relevant to the cause
   * User may switch nonprofit at any time
6. **More info (expandable)**

   * Nonprofit description
   * Link to Every.org page

**Key rule**

> Any donation to a valid nonprofit for that cause contributes to the node’s progress.

---

### 6. Global Donate Button (Bottom-Right)

**Purpose:** allow giving without navigating the tree

**Behavior**

* Opens donation modal:

  * Select cause
  * Select nonprofit
  * Choose amount
* After donation:

  * App determines which nodes advance based on cause + goal rules
  * Tree updates immediately

---

## Causes & Trees

* Each **cause = one independent skill tree**
* Trees do not interact with each other
* Examples:

  * Environmental Protection
  * Education
  * Mental Health
  * Animal Welfare

---

## Node Types (Fully Defined)

There are **three node goal types**, all tracked in Zustand.

### 1. One-Time Funding Goal

```ts
type: "total_donation"
targetAmountUSD: number
```

Example:

> Fund $500 for native tree planting

Progress = cumulative dollars donated to the cause

---

### 2. Monthly Commitment (Time-Based)

```ts
type: "monthly_commitment"
requiredMonths: number // 3, 6, 12
minimumMonthlyAmountUSD: number
```

Example:

> Donate at least $10/month for 6 months to clean water orgs

Progress = count of distinct months meeting criteria

---

### 3. Forking Commitment Nodes

These **branch the tree** based on duration.

Example fork:

* Donate monthly for **3 months**
* Donate monthly for **6 months**
* Donate monthly for **12 months**

Each is a separate node with increasing requirements and deeper impact.

---

## Example: Environmental Protection Skill Tree (Start → End)

### Tier 0 (Root)

* **Protect the Planet**
  Overview node (informational, always unlocked)

---

### Tier 1 (Entry Actions)

* **Plant Native Trees** — $300 total
* **Reduce Plastic Waste** — $200 total
* **Support Wildlife Rescue** — $250 total

---

### Tier 2 (Projects & Commitments)

From *Plant Native Trees*:

* **Urban Reforestation Project** — $600 total
* **Monthly Reforestation Support (3 months)** — $10/mo × 3

From *Reduce Plastic Waste*:

* **Community Cleanup Funding** — $400 total
* **Monthly Waste Reduction Support (6 months)** — $10/mo × 6

---

### Tier 3 (Long-Term Impact Forks)

From *Monthly Reforestation Support (3 months)*:

* **Reforestation Commitment (6 months)** — $15/mo × 6
* **Reforestation Commitment (12 months)** — $20/mo × 12

From *Urban Reforestation Project*:

* **Regional Habitat Restoration** — $1,500 total

---

### Tier 4 (Capstone)

* **Sustained Environmental Stewardship**

  * Either:

    * $3,000 total lifetime donations to this cause
      **OR**
    * 12-month continuous monthly commitment

This node represents meaningful, long-term engagement — not infinite progression.

---

## State Management (Zustand)

Zustand is the **source of truth** for all user progress.

Tracked state includes:

```ts
{
  user: {
    id,
    name,
    signedInWithApple
  },

  activeCauseId,

  trees: {
    [causeId]: {
      nodes: {
        [nodeId]: {
          amountDonatedUSD,
          monthlyCommitmentMonthsCompleted,
          selectedNonprofitId,
          completed: boolean
        }
      }
    }
  },

  donationHistory: [
    {
      causeId,
      nonprofitId,
      amountUSD,
      dateISO
    }
  ]
}
```

State is:

* Persisted locally (AsyncStorage)
* Optionally synced to backend

---

## Backend (Optional, Fully Defined)

If backend is used:

**Stack**

* Node.js
* Express
* PostgreSQL or SQLite
* Hosted anywhere (Railway / Fly / Render)

**Responsibilities**

* Store user trees & donation history
* Proxy Every.org API requests (API key safety)
* Handle webhook callbacks (if available)
* Auth session validation

**Frontend API Access**

* All API calls handled with **React Query**
* No direct mutation of server state without query invalidation

---

## Every.org Integration

* Each node has:

  * Default nonprofit
  * List of alternative nonprofits (same cause)
* Donation flow:

  * App opens Every.org donation page (webview or browser)
* On return:

  * Donation is recorded locally
  * Node progress updated based on rules

---

## Rendering & Interaction (React Native)

**Rendering**

* **react-native-skia** (preferred) OR **react-native-svg**
* Nodes + edges rendered in a large virtual canvas

**Gestures**

* **react-native-gesture-handler**
* **react-native-reanimated**
* Supports:

  * Pan
  * Pinch zoom
  * Smooth inertial movement

**Modals**

* Native modal overlay (not inside canvas)
* Keeps forms and buttons responsive

---

## What This App Is NOT

* ❌ No XP
* ❌ No badges
* ❌ No streaks
* ❌ No leaderboards
* ❌ No prestige resets
* ❌ No infinite progression

Completion is valid. Reflection is encouraged.

---

## MVP Build Order (Concrete)

1. Landing screen + Apple Sign In
2. Single Environmental Protection tree (static JSON)
3. Tree rendering with pan + zoom
4. Node modal with donate CTA
5. Zustand persistence
6. Cause selector dropdown
7. Every.org integration
8. Optional backend sync

---

## One-Sentence Philosophy (for the repo)

> **Fired Up visualizes generosity as a map of real commitments — not a game to win, but a record of what you chose to support.**
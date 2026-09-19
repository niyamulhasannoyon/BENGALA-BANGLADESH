# BENGALA-BANGLADESH

> Ultra-luxury, high-converting, visually immersive travel showcase application inspired by modern cinematic showcase web interfaces, tailored exclusively for **Bangladesh**.

---

## 🌟 Overview

**BENGALA** presents Bangladesh's premier destinations in an ultra-luxury editorial showcase:
- **The Sundarbans Wilderness** (*UNESCO Biosphere* | Khulna Delta)
- **Sajek Valley & Clouds** (*Misty Highlands* | Chittagong Hill Tracts)
- **Sreemangal Tea Terraces** (*Tea Estates & Biome* | Sylhet Plateau)
- **Cox’s Bazar Marine Shore** (*Endless Shoreline* | Bay of Bengal)
- **Saint Martin’s Coral Atoll** (*Pristine Coral Atoll* | Bay of Bengal)

---

## ⚡ Core Tech Stack

- **Framework**: Next.js 15 (App Router, Server Actions, React 19)
- **Language**: TypeScript (strict mode enabled, zero `any` types)
- **Database**: MongoDB with Mongoose ORM (cached global connection pool with auto-seeding & offline fallback)
- **Styling**: Tailwind CSS with custom Glassmorphism utilities & gradients
- **Motion**: Framer Motion synchronized layout & cross-fade physics
- **Icons**: Lucide React
- **Typography**: Syne (sculptural headlines) + Plus Jakarta Sans (body)

---

## 🚀 Features

- **Cinematic Hero Synchronized Showcase**:
  - `HeroBackground`: Ken Burns slow zoom (1.0 to 1.05 over 6s) with AnimatePresence cross-fade and multi-layer vignette.
  - `HeroContent`: Text stagger animation with category badges, star ratings, and glowing CTA.
  - `CarouselDeck`: 3D perspective card carousel with cyan neon glow, CSS containment (`contain: layout paint`), hover preloading, and mobile touch-swipe slider.
  - `DockControls`: Floating glass dock with dynamic 6s filling progress bar pill, index counter, and pause-on-hover logic.
- **Ambient Web Audio Soundscape**: Built-in harmonic synthesizer pad (zero external audio dependencies).
- **VIP Concierge Modal**: Deep itinerary overview, package pricing, and charter inquiry form.
- **Saved Expeditions Drawer**: Optimistic bookmarking with toast notifications and direct jump navigation.

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
*(If omitted, BENGALA seamlessly runs with the curated in-memory dataset.)*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Build for Production
```bash
npm run build
npm start
```

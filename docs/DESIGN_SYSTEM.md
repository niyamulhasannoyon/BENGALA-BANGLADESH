# BENGALA Design System Reference

An ultra-luxury, editorial design system crafted for **BENGALA • BANGLADESH Expeditions**, embodying the aesthetic principles of Aman Resorts, Six Senses, and Cereal Magazine.

---

## 1. Color Palette

### Neutrals (Deep Obsidian Forest)
- **`bengal-base` (`#080D0A`)**: Ground canvas tone. A charcoal black infused with the deep green chlorophyll undertones of the ancient Sundarbans mangrove.
- **`bengal-surface` (`#0E1612`)**: Primary card and section surface tone for editorial matte containers.
- **`bengal-elevated` (`#141E18`)**: Elevated surface for modals, floating drawers, and popovers.
- **`bengal-border` (`rgba(255, 255, 255, 0.08)`)**: Hairline border for understated structural boundaries.

### Accents (Antique Brass & Warm Champagne)
- **`brass` (`#C5A880`)**: Warm antique brass for primary CTAs, active indicators, and signature badges.
- **`brass-light` (`#DFCCA9`)**: Hover state highlight and subtle brass illumination.
- **`brass-dark` (`#9A7E56`)**: Muted brass borders and deep gold structural accents.
- **`brass-subtle` (`rgba(197, 168, 128, 0.08)`)**: Tinted backgrounds for badges and interactive chips.

### Typography Colors
- **`alabaster` (`#F4F6F4`)**: Soft chalk white for primary headlines and display text (WCAG AAA compliant).
- **`mist` (`#9EABA2`)**: Muted sage mist for editorial paragraphs and subheadings.
- **`stone` (`#637067`)**: Ancient delta stone for micro-labels, timestamps, and coordinates.

---

## 2. Typography Hierarchy

Fonts loaded via `next/font/google`:
- **Display & Headings**: `Syne` (`subsets: ['latin']`, `display: 'swap'`)
- **Body & Captions**: `Plus Jakarta Sans` (`subsets: ['latin']`, `display: 'swap'`)

| Level | Size | Weight | Tracking | Line-Height | Role |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | 44px–72px | 700 / 800 | `-0.025em` | `1.08` | Hero titles & signature destination titles |
| **H1** | 36px–52px | 700 | `-0.02em` | `1.15` | Section main headers |
| **H2** | 28px–40px | 600 | `-0.015em`| `1.2` | Sub-sections, card titles |
| **H3** | 20px–26px | 600 | `0` | `1.3` | Modular highlights, modal subtitles |
| **Body-Lg** | 18px | 400 / 500 | `0` | `1.7` | Editorial lead paragraphs |
| **Body** | 15px–16px | 400 | `0` | `1.75` | Narrative body copy & specs |
| **Caption** | 11px | 600 | `+0.25em` | `1.4` | Category overlines, status badges, geo tags |

---

## 3. Spacing Scale & 12-Column Grid

Built on an 8px base rhythm:
- **8px (`p-2`, `gap-2`)**: Micro component spacing, icon padding.
- **16px (`p-4`, `gap-4`)**: Small cards, badge gaps, inner form fields.
- **24px (`p-6`, `gap-6`)**: Container padding on mobile, standard grid gaps.
- **32px (`p-8`, `gap-8`)**: Card padding, modular spacing.
- **48px–64px (`py-12`–`py-16`)**: Moderate section gaps.
- **96px–144px (`py-24`–`py-36`)**: Standard editorial section spacing on desktop.

Container constraint:
```tsx
<div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
```

---

## 4. Glassmorphism Guardrails

Glassmorphism is **strictly restricted** to four functional surfaces:
1. **Sticky Header**: `glass-header` (`bg-[#080D0A]/78 backdrop-blur-md border-b border-white/[0.07]`).
2. **Bottom Hero Dock**: `glass-dock` (`bg-[#0A100C]/85 backdrop-blur-xl border border-white/[0.1]`).
3. **VIP Concierge Modal**: `glass-panel` (`bg-[#0A100C]/95 backdrop-blur-2xl border border-brass/25`).
4. **Saved Expeditions Drawer**: `glass-panel` (`bg-[#0A100C]/95 backdrop-blur-2xl border-l border-white/[0.1]`).

All other cards use solid matte finishes to ensure 60fps scrolling and crisp photography rendering.

---

## 5. Motion Tokens

Imported from `@/lib/motion`:
- **`LUXURY_EASE`**: `[0.22, 1, 0.36, 1]` — 0.7s duration for page reveals, modal transitions, and slide shifts.
- **`SNAPPY_EASE`**: `[0.16, 1, 0.3, 1]` — 0.3s duration for buttons, drawer triggers, and micro-hover states.
- **`TRANSITION_KEN_BURNS`**: `12s` linear zoom on full-bleed photography.
- Zero forced blocking animations; audio playback is strictly user opt-in.

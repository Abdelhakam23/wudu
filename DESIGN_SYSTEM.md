# DESIGN_SYSTEM.md — Brand Identity & Design Tokens

## 1. Visual Philosophy
- **Spirituality, Dignity, Peace, Simplicity, Trust, Clarity**.
- Editorial, modern educational aesthetic inspired by minimal Islamic geometry and serene natural tones.
- Avoid outdated clunky designs, excessive heavy green backgrounds, or distracting ornaments.

## 2. Color Palette & Tokens

### Primary Brand Colors
- **Deep Forest Green**: `#174D3B` (hsl: 161, 54%, 20%) — Main headings, primary branding, dark buttons.
- **Emerald Green**: `#26745A` (hsl: 160, 51%, 31%) — Primary interactive highlights, active states.
- **Soft Sage**: `#E7F0E9` (hsl: 133, 24%, 92%) — Subtle card accents, badges, step badges.

### Background & Surface Tones
- **Warm Ivory**: `#FAF9F5` (hsl: 48, 29%, 97%) — Main body background.
- **Pure White**: `#FFFFFF` (hsl: 0, 0%, 100%) — Primary surface cards, dialogs, inputs.
- **Soft Sand**: `#F1EEE6` (hsl: 43, 27%, 93%) — Secondary containers, muted borders.

### Accent & Metallic
- **Muted Gold**: `#B99A5B` (hsl: 40, 41%, 54%) — Elegant accents, ornamental dividers, badges.
- **Light Gold**: `#E9D9B7` (hsl: 41, 54%, 82%) — Subtle highlights, decorative glow.

### Typography Colors
- **Primary Text**: `#25342D` — High contrast, easy on eyes for long reading.
- **Secondary Text**: `#738078` — Supportive descriptions, meta tags.
- **Muted Text**: `#929A94` — Inactive controls, placeholder text.

### Semantic Tones
- **Success**: `#1B8354` — Correct steps, Sunnah, valid actions.
- **Warning / Note**: `#C87D1F` — Cautions, common mistakes, prerequisites.
- **Error**: `#C93B2B` — Prohibited actions, invalid submissions.
- **Info**: `#2B6CB0` — References, scholarly notes.

## 3. Typography Scale
- Primary Font: **IBM Plex Sans Arabic** (UI, instructional text, headings).
- Religious Font: **Noto Naskh Arabic** (Hadith texts, Quranic quotations, Dhikr).
- Line Height: Generous (`1.75` to `2.0` for Arabic prose) to allow diacritics (Harakat) to breathe without overlap.

## 4. Spacing, Radius & Shadows
- **Base Grid**: 4px / 8px incremental scale.
- **Border Radius**:
  - Small: `8px` (`rounded-sm`) — tags, badges, buttons.
  - Medium: `12px` (`rounded-md`) — inputs, cards, dropdowns.
  - Large: `20px` (`rounded-lg`) — modal containers, hero cards.
  - Extra Large: `28px` (`rounded-xl`) — banner sections.
- **Shadows**:
  - `subtle`: `0 2px 8px -2px rgba(23, 77, 59, 0.05)`
  - `card`: `0 4px 20px -4px rgba(23, 77, 59, 0.08)`
  - `elevation`: `0 12px 32px -6px rgba(23, 77, 59, 0.12)`

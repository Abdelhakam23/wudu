# TASKS.md — Master Development Progress Tracker

## Phase Status Summary
- [x] Phase 01 — Project Initialization & Configuration (COMPLETED)
- [x] Phase 02 — Design System & Global UI Foundation (COMPLETED)
- [x] Phase 03 — Database & Backend Architecture (COMPLETED)
- [x] Phase 04 — Islamic Educational Content & Seed Data (COMPLETED)
- [x] Phase 05 — Educational Illustrations & Media (COMPLETED)
- [x] Phase 06 — Homepage & Global Navigation (COMPLETED)
- [x] Phase 07 — Wudu Learning Experience (COMPLETED)
- [x] Phase 08 — Salah Learning Experience (COMPLETED)
- [ ] Phase 09 — Hadiths & External API Integration (library complete; external access pending)
- [x] Phase 10 — Global Arabic Search (COMPLETED)
- [ ] Phase 11 — Security, Accessibility, SEO & Testing (implementation complete; dependency remediation pending)
- [ ] Phase 12 — Performance & Production Deployment

---

## Detailed Task Breakdown

### PHASE 01 — PROJECT INITIALIZATION & CONFIGURATION
- [x] Next.js App Router, TypeScript strict, Tailwind, Lucide, Framer Motion, Mongoose, Zod, Vitest.
- [x] Strict architecture, directories, and documentation.

### PHASE 02 — DESIGN SYSTEM & GLOBAL UI FOUNDATION
- [x] Arabic typography, brand colors, RTL layouts, 18+ reusable components, Navbar, and Footer.

### PHASE 03 — DATABASE & BACKEND ARCHITECTURE
- [x] Mongoose models, Repository Pattern, Service Layer, and validated REST API route handlers.

### PHASE 04 — ISLAMIC EDUCATIONAL CONTENT & SEED DATA
- [x] Authentic Wudu, Salah, and Hadiths datasets with verified references and idempotent seed runner.

### PHASE 05 — EDUCATIONAL ILLUSTRATIONS & MEDIA
- [x] Custom minimal 2D vector educational SVG illustrations for all 10 Wudu steps, 11 Salah positions, and Hero section.

### PHASE 06 — HOMEPAGE & GLOBAL NAVIGATION
- [x] 6.1 Hero section with Arabic typography, welcoming description, dual CTAs, and custom hero illustration.
- [x] 6.2 Learning Paths section with rich Wudu and Salah learning cards.
- [x] 6.3 Featured Hadith section with Noto Naskh Arabic font and verified grading badge.
- [x] 6.4 Learning steps methodology section with 4 core pillars.
- [x] 6.5 Platform benefits & why us section.
- [x] 6.6 Full responsive mobile and desktop navigation.

### PHASE 07 — WUDU LEARNING EXPERIENCE
- [x] 7.1 Dedicated Wudu page with introduction, conditions, sequence, Hadiths, notes, mistakes, and summary.
- [x] 7.2 Reusable step image, details, classification, references, navigation, and progress components.
- [x] 7.3 Interactive step selection and previous/next navigation with first/last guards and empty-state handling.
- [x] 7.4 Verified step order, illustrations, classifications, references, responsive layout, and navigation tests.

### PHASE 08 — SALAH LEARNING EXPERIENCE
- [x] 8.1 Dedicated Salah page with introduction, conditions, preparation, Hadiths, mistakes, and summary.
- [x] 8.2 Reusable position image, details, recitation, dhikr, references, navigation, and progress components.
- [x] 8.3 Interactive prayer-position sequence with first/last guards, recitations, and the five obligatory prayer rak'ah summary.
- [x] 8.4 Verified sequence, illustrations, references, responsive layout, and navigation tests.

### PHASE 09 — HADITHS & EXTERNAL API INTEGRATION
- [x] 9.1 Hadith library route, cards, details, Arabic text, attribution, grading, references, explanations, and source links.
- [x] 9.2 Arabic search, topic/collection/grading filters, pagination, empty state, loading route support, and error-safe service fallback.
- [ ] 9.3 Sunnah.com server integration pending official credentials, API access approval, and confirmed Arabic-content terms.
- [ ] 9.4 Dorar integration pending official service access and licensing confirmation.
- [x] 9.5 Verified-only publication, preserved source attribution, MongoDB repository support, and local verified fallback.

### PHASE 10 — GLOBAL ARABIC SEARCH
- [x] 10.1 Global search page with accessible input, suggestions, clear action, keyboard-submit support, debounce, loading, error, and empty states.
- [x] 10.2 Arabic normalization for tashkeel, alif forms, alif maqsura, taa marbuta, tatweel, partial matches, and safe query construction.
- [x] 10.3 Search across Wudu lessons/steps, Salah lessons/positions/recitations, and verified Hadiths.
- [x] 10.4 Grouped result metadata, safe highlighting, result pagination, valid navigation anchors, and normalization tests.

### PHASE 11 — SECURITY, ACCESSIBILITY, SEO & TESTING
- [x] 11.1 Validated query inputs, safe slugs/ObjectIds, escaped search patterns, XSS-safe rendering, security headers, CSP, public API rate limiting, and production-secret validation.
- [x] 11.2 RTL semantic structure, accessible labels/statuses, visible focus styles, meaningful image alternatives, touch-sized controls, and reduced-motion support.
- [x] 11.3 Arabic metadata, canonical URLs, Open Graph/Twitter metadata, sitemap.xml, and robots.txt.
- [x] 11.4 Regression coverage for validation, normalization, rate limiting, reusable components, and existing backend/content behavior.
- [ ] 11.5 Upgrade vulnerable direct dependencies after compatibility review: `npm audit --omit=dev` reports critical/high advisories requiring breaking upgrades to Next 16 and Zod 4.

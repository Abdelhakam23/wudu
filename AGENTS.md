# AGENTS.md — Working Rules for AI Agents

## Mission
Build a production-ready, highly authentic Arabic Islamic educational platform dedicated to teaching Wudu (ablution) and Salah (prayer) step by step with verified Prophetic Hadiths and educational illustrations.

## Non-Negotiable Core Principles
1. **Religious Accuracy First**: Never fabricate, alter, or guess Quranic verses, Hadith texts, narrators, or gradings. Everything must come from verified sources.
2. **Strict Phase-by-Phase Execution**: Never advance to the next phase until all tasks and tests of the current phase are verified and passing.
3. **Arabic RTL UI/UX**: Designed from the ground up for Arabic RTL readability, supporting all age groups with warm, dignified Islamic aesthetics.
4. **Clean Layered Architecture**: Strictly adhere to the Service Layer + Repository Pattern. No MongoDB calls in UI components.
5. **Type Safety & Strict Validation**: TypeScript strict mode enabled throughout. Zod schemas for all API inputs and mutations.
6. **No Broken Links or Placeholders**: Never render dead links, non-functional buttons, or misleading placeholders.

## Technical Rules
- **Stack**: Next.js (App Router), React, TypeScript (strict), Tailwind CSS, Mongoose / MongoDB, Framer Motion, Lucide React, Vitest.
- **MongoDB Only**: Do NOT introduce PostgreSQL, Prisma, Firebase, or Supabase.
- **Components**: Prefer Server Components by default; use `"use client"` only when interactivity, hooks, or browser events require it.
- **State Management & UI**: Handle loading, empty, error, not-found, and offline states gracefully on every view.
- **Testing**: Unit tests for utilities and logic, integration tests for repositories and APIs, E2E tests for core flows.

## Update Workflow
After completing any phase or major task:
1. Run `npm run type-check`.
2. Run `npm run lint`.
3. Run `npm run test`.
4. Update `TASKS.md` with accurate checkmarks.
5. Record architectural decisions in `DECISIONS.md`.

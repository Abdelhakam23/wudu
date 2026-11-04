# DECISIONS.md — Architecture & Technology Decision Log

## ADR-001: Next.js App Router with Server Components by Default
- **Status**: Accepted
- **Context**: The platform requires fast initial render, excellent Arabic SEO, minimal client JavaScript bundle, and clean data fetching.
- **Decision**: Use Next.js 14 App Router. By default, pages and layout are Server Components (RSC). Client interactivity (audio, step toggles, search input debouncing, mobile menu) is isolated in designated `"use client"` leaf components.
- **Consequence**: High performance, zero hydration lag for editorial Arabic content.

## ADR-002: MongoDB and Mongoose Exclusively
- **Status**: Accepted
- **Context**: Master Prompt strictly forbids Prisma, PostgreSQL, Firebase, or Supabase.
- **Decision**: Use MongoDB with Mongoose ODM. Connection pooling is cached across Next.js API route invocations. Repository Pattern abstracts database queries.
- **Consequence**: Flexible schema for varied lesson step details while maintaining strict Mongoose schema validation.

## ADR-003: Strict Layered Service + Repository Pattern
- **Status**: Accepted
- **Context**: UI code must not contain SQL/NoSQL queries, and business logic must not be duplicated across route handlers.
- **Decision**: 
  1. Repositories handle database querying, projections, and pagination.
  2. Services orchestrate business logic, text normalization, and DTO transformation.
  3. API handlers only parse requests, validate with Zod, call services, and format standardized responses.
- **Consequence**: Maintainable, testable code with zero leaks of raw database documents to client components.

## ADR-004: Arabic-First RTL Design System
- **Status**: Accepted
- **Context**: The entire interface is in Arabic for Arabic-speaking users across all ages.
- **Decision**: HTML dir="rtl", lang="ar". Use IBM Plex Sans Arabic as primary UI font and Noto Naskh Arabic for sacred texts (Hadith, Dhikr). Use logical CSS properties (`padding-inline`, `margin-inline`, `start`, `end`).
- **Consequence**: Flawless RTL rendering without broken icons or awkward desktop-to-mobile shifts.

## ADR-005: Verified Sacred Texts and Structured References
- **Status**: Accepted
- **Context**: Religious accuracy is paramount.
- **Decision**: Every Hadith and step reference is stored with verified attributes (narrator, collection, book, chapter, hadith number, grading, and external link). Seed data contains only verified and referenced texts.
- **Consequence**: Full integrity and trust for learners.

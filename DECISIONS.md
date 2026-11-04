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

## ADR-006: Server-Fetched Wudu Lesson with Isolated Client Navigation
- **Status**: Accepted
- **Context**: The Wudu learning route needs database/seed fallback data while step navigation requires browser state.
- **Decision**: Fetch the lesson and verified Hadiths in the Server Component through existing services, and isolate only step selection, progress, and previous/next controls in a client component.
- **Consequence**: The route preserves the layered architecture and keeps interactive JavaScript limited to the learning controls.

## ADR-007: Salah Sequence and Prayer Count Presentation
- **Status**: Accepted
- **Context**: Prayer positions are shared across the obligatory prayers, while rak'ah counts and the location of the first/final tashahhud vary.
- **Decision**: Present the verified 11-position instructional sequence as a reusable interactive lesson, and expose the five prayer rak'ah counts and tashahhud placement in a dedicated summary table.
- **Consequence**: Learners get one consistent visual sequence plus an explicit comparison of prayer-specific differences without duplicating sacred content.

## ADR-008: External Hadith Sources Require Approval Before Runtime Integration
- **Status**: Accepted
- **Context**: External Hadith services may require credentials, impose access restrictions, differ in Arabic availability, and carry licensing or attribution requirements.
- **Decision**: The application publishes only reviewed records from MongoDB or the verified local seed fallback. Sunnah.com and Dorar runtime clients remain disabled until official access, terms, and Arabic-response validation are provided.
- **Consequence**: External outages cannot break the library, and unreviewed or unverifiable text cannot be published accidentally.

## ADR-009: Normalized Arabic Search with Client Debounce
- **Status**: Accepted
- **Context**: Arabic users may search with or without tashkeel and with common letter variants, while search requests should not be sent for every keystroke.
- **Decision**: Normalize Arabic text in the shared utility and service fallback, validate and escape API queries, debounce client searches by 350ms, and paginate the standardized API response.
- **Consequence**: Search is tolerant of common Arabic spelling differences, safe from regex injection, and less chatty while typing.

## ADR-010: Fail Production Builds Without a Real Admin Secret
- **Status**: Accepted
- **Context**: The repository previously supplied a development JWT fallback that must never be used by a production deployment.
- **Decision**: Configuration validation rejects the known development secret when `NODE_ENV` is production. Local production builds must provide a temporary or real `ADMIN_JWT_SECRET` through the environment.
- **Consequence**: Misconfigured deployments fail early instead of exposing predictable authentication material.

## ADR-011: Dependency Audit Remediation Requires a Separate Compatibility Change
- **Status**: Accepted
- **Context**: The current direct dependencies include Next 14 and Zod 3; `npm audit --omit=dev` reports critical/high advisories whose automatic fixes require major upgrades.
- **Decision**: Do not run `npm audit fix --force` during Phase 11 because it would silently introduce breaking framework/schema changes. Track the upgrade as a separate compatibility task and keep the audit output explicit.
- **Consequence**: The application changes remain surgical and verifiable, while dependency remediation is not hidden or falsely marked complete.

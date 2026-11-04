# ARCHITECTURE.md — System Architecture & Patterns

## 1. Architectural Layers

The application strictly separates responsibilities into well-defined layers:

```
┌────────────────────────────────────────────────────────┐
│             Presentation Layer (Next.js App)           │
│  - Server Components (RSC) by default                  │
│  - Interactive Client Components where necessary       │
│  - Shadcn UI & Atomic Components                       │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                    API / Route Handlers                │
│  - HTTP Request Parsing & Zod Schema Validation        │
│  - Standardized JSON responses & Error mapping         │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                      Service Layer                     │
│  - Business logic, Arabic normalization, verification  │
│  - DTO transformations (lean models -> clean DTOs)     │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                    Repository Layer                    │
│  - Direct database queries, Mongoose projection, leans │
│  - Pagination, sorting, indexing                       │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                Database / Infrastructure               │
│  - MongoDB (Mongoose connection pool & schemas)        │
└────────────────────────────────────────────────────────┘
```

## 2. Directory Layout
- `src/app`: App Router pages and Route Handlers.
- `src/components`: UI components (`ui/`, `layout/`, `shared/`).
- `src/features`: Domain-specific components (`wudu/`, `salah/`, `hadiths/`, `search/`).
- `src/models`: Mongoose schemas and model definitions.
- `src/repositories`: Repository classes encapsulating DB queries.
- `src/services`: Business logic and external API integrations.
- `src/validations`: Zod validation schemas.
- `src/types`: TypeScript interfaces, DTOs, and domain types.
- `src/lib`: MongoDB connection, security utilities, Arabic normalizer, logger.
- `src/constants`: Fixed configuration, navigation links, educational classifications.

## 3. Core Architectural Rules
1. **No Direct Model Access in UI**: UI components MUST NOT import Mongoose models or query the database directly.
2. **Lean & Projected Queries**: Read operations must use `.lean()` and project only required fields to minimize memory footprint.
3. **Fail-Safe Connection**: Database connection is cached across serverless lambdas with graceful reconnects.
4. **Resilient Public API**: Public views handle empty database states, connection delays, and missing assets without white-screens or runtime crashes.

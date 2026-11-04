# Architecture

## Runtime flow

```text
Next.js Server Components and Client Components
              |
       Route Handlers
              |
           Services
              |
     Verified TypeScript content
```

## Principles

- Server Components are the default.
- Client Components are limited to browser interactions such as navigation and search.
- Services own content selection, filtering, normalization, and pagination.
- UI components never access infrastructure directly.
- API handlers validate input with Zod and return standardized responses.
- Religious content remains local, reviewed, and source-attributed.
- No database, authentication, admin area, or external API credentials are part of the current release.

## Main directories

- `src/app`: pages, metadata, sitemap, robots, and route handlers.
- `src/components`: shared layout and UI primitives.
- `src/features`: Wudu, Salah, Hadith, and search experiences.
- `src/lib/seed`: verified educational content.
- `src/services`: content and search business logic.
- `src/types`: domain DTOs and API types.

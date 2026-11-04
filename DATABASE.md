# Content Storage

The platform is intentionally database-free for the current release.

## Source of truth

Verified educational content is stored in TypeScript seed modules:

- `src/lib/seed/wudu-data.ts`
- `src/lib/seed/salah-data.ts`
- `src/lib/seed/hadith-data.ts`
- `src/lib/seed/category-data.ts`

Services import these modules and expose stable DTOs to pages and API route handlers. No runtime database connection, migration, seed command, credentials, or persistence layer is required.

## Content updates

1. Update the relevant verified seed module.
2. Keep every Hadith and religious reference attributed to its source.
3. Run `npm run type-check`, `npm run lint`, and `npm run test`.
4. Run `npm run build` before deployment.

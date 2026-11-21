<div align="center">

# 🕌 WUDU & SALAH
**Learn the steps. Understand the practice.**

**منصة تعليم الوضوء والصلاة**

An Arabic-first learning experience for Wudu, Salah and related Hadith content, built with structured lessons, step illustrations and searchable local content.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-149ECA?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)


</div>

---

## 📖 Table of contents

- [Learning experience](#learning-experience)
- [Stack](#stack)
- [Content architecture](#content-architecture)
- [Getting started](#getting-started)
- [API map](#api-map)
- [Working with educational content](#working-with-educational-content)
- [Quality checks](#quality-checks)
- [Next improvements](#next-improvements)

---

> **Local-content architecture.** Educational content lives in typed TypeScript modules. No database service is required to explore lessons, Hadith pages or search.

---

<a id="learning-experience"></a>

## ✨ Learning experience

### Wudu, step by step

An ordered learning experience presents Wudu steps with explanations, illustrations and reference fields. The UI includes progress presentation and step-based navigation.

### Salah, with context

The Salah lesson combines ordered steps, explanations and Arabic recitation content where relevant. Separate feature components keep the learning interface organized around the lesson rather than a single large page.

### Hadith browsing

Browse the Hadith collection and individual detail pages. Records carry Arabic text, narrator/collection information and topic-related metadata in the local content modules.

### Arabic-aware search

A service normalizes Arabic text before matching across lesson content and Hadith records. Results can point directly to a lesson step, keeping search connected to the learning journey.

The interface is Arabic-first and RTL. Responsive classes, reusable feedback components and dedicated loading/error/not-found views are present in source. A formal accessibility audit is not claimed.

---

<a id="stack"></a>

## 🧰 Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js App Router, React, TypeScript |
| Presentation | Tailwind CSS, Radix primitives, Framer Motion |
| Forms and validation | React Hook Form, Zod |
| Content | Local typed seed modules |
| Service layer | Lesson, Hadith and search services |
| Tests | Vitest, Testing Library, jsdom |
| Formatting | Prettier |

---

<a id="content-architecture"></a>

## 🏗️ Content architecture

```text
Arabic learning pages
          |
Feature components + shared UI
          |
Lesson / Hadith / search services
          |
Local typed content modules
```

API route handlers expose the same local-content service layer. There is no database setup or separate API server required for this version.

```text
src/
  app/
    wudu/             Wudu learning page
    salah/            Salah learning page
    hadiths/          Collection and detail pages
    search/           Search page
    api/              Read-only content endpoints
  features/           Learning and browsing experiences
  components/         Shared UI, layout and feedback states
  services/           Content access and search logic
  lib/
    seed/             Lessons, Hadiths and category data
    validations/      Input schemas
    security/         Public-request protection helpers
  types/              Shared content and response types
public/images/        Lesson and hero illustrations
tests/                Content, helpers, components and validation tests
```

Consult the actual source paths when making changes; architecture documents describe intent and can lag the current implementation.

---

<a id="getting-started"></a>

## 🚀 Getting started

You will need Node.js/npm compatible with the locked Next.js dependencies. No database credentials are required by the current environment configuration.

```bash
git clone https://github.com/Abdelhakam23/wudu.git
cd wudu
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

### Environment

The supplied example defines:

```dotenv
NODE_ENV=development
PORT=3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="منصة تعليم الوضوء والصلاة"
```

`NEXT_PUBLIC_APP_URL` supplies the site's base URL, and `NEXT_PUBLIC_SITE_NAME` supplies its name. Public-prefixed values are browser-visible. Do not add secrets to them. Let the Next.js commands manage `NODE_ENV` for normal development and production use.

Keep the application URL aligned with the environment where you run the site.

---

<a id="api-map"></a>

## 📡 API map

These read-only routes live inside the Next.js application:

| Route | Responsibility |
| --- | --- |
| `/api/lessons` | Lesson collection |
| `/api/lessons/[slug]` | Lesson detail |
| `/api/lessons/[slug]/steps` | Steps for a lesson |
| `/api/steps/[id]` | Individual step |
| `/api/categories` | Learning categories |
| `/api/hadiths` | Hadith collection |
| `/api/hadiths/[id]` | Hadith detail |
| `/api/search?q=...` | Search local educational content |

Responses use shared success/error helpers. Input schemas validate supported identifiers, slugs and filters. Public-request rate limiting is implemented with local process state; it should not be presented as shared multi-server protection.

Search supports category filtering in the service. Do not assume every service pagination option is wired through every route; review the route handler before relying on an API parameter.

---

<a id="working-with-educational-content"></a>

## 📚 Working with educational content

1. Edit the relevant typed module under `src/lib/seed/`.
2. Preserve step order, identifiers, classifications and the fields the UI consumes.
3. Keep source references alongside the explanation they support.
4. Add or update the corresponding illustration under `public/images/` when needed.
5. Review the lesson in context and run the relevant checks.

Content tests check structure, ordering, required attribution fields and asset existence. They do **not** independently establish religious accuracy, the authenticity of a source or the correctness of a ruling. Changes to educational explanations should receive qualified content review. The platform is a learning aid, not a substitute for a qualified scholar on individual questions.

---

<a id="quality-checks"></a>

## ✅ Quality checks

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start local development |
| `npm run build` | Build the application |
| `npm start` | Serve a completed build |
| `npm run lint` | Run the configured Next.js lint command |
| `npm run type-check` | Run TypeScript without emitting files |
| `npm test` | Run Vitest once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run format:check` | Check formatting |
| `npm run format` | Rewrite matching files with Prettier |

The test files cover validation and API response helpers, public rate-limit behavior, content ordering/fields, illustration presence, utilities and selected components. Their presence is not a claim that the current suite passes. Review changes before running the formatting command because it rewrites files.

---

<a id="next-improvements"></a>

## 🗺️ Next improvements

- [ ] Run and document a reproducible clean-install/build/test check.
- [ ] Add end-to-end tests for lesson navigation and Arabic search.
- [ ] Audit keyboard interaction, focus states and screen-reader labels.
- [ ] Review educational content and reference quality independently of code tests.
- [ ] Document a deployment strategy and shared rate limiting if scaled beyond one process.

---

<div align="center">

**Clear steps. Meaningful context. Learning in Arabic.**

[`Abdelhakam23 / wudu`](https://github.com/Abdelhakam23/wudu)

</div>

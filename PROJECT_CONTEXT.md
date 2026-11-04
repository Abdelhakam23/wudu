# PROJECT_CONTEXT.md — Platform Overview & Context

## 1. Project Identity
- **Project Name**: منصة تعليم الوضوء والصلاة (Islamic Learning Platform – Wudu & Salah)
- **Domain**: Islamic Education / E-Learning
- **Language**: Arabic (RTL primary and default)
- **Target Audience**: All age groups (children, young adults, elders, new Muslims)

## 2. Core Modules
1. **Wudu Module (تعلم الوضوء)**:
   - Meaning, conditions, and prerequisites.
   - Sequential educational steps with high-resolution visual illustrations.
   - Classification: Fard (Obligatory) vs. Sunnah (Recommended).
   - Common mistakes (أخطاء شائعة) and how to avoid them.
   - Authentic Hadiths on the virtues and method of ablution.

2. **Salah Module (تعلم الصلاة)**:
   - Meaning, conditions, and preparation before prayer.
   - Step-by-step positions (Takbir, Recitation, Ruku, Sujud, Tashahhud, Taslim) with educational visuals.
   - Accurate Dhikr and recitations with vocalization (Tashkeel).
   - Variations across the five daily obligatory prayers (Fajr, Dhuhr, Asr, Maghrib, Isha).
   - Common errors and remedies (Sujud al-Sahw overview).

3. **Hadith Library (الأحاديث النبوية)**:
   - Verified prophetic Hadiths on purification and prayer.
   - Attributed to recognized collections (Sahih al-Bukhari, Sahih Muslim, Sunan).
   - Full narrator chain context, book, chapter, and Hadith number.
   - Searchable, filterable by topic and source collection.

4. **Global Arabic Search (البحث الشامل)**:
   - Intelligent search across lessons, steps, positions, and Hadiths.
   - Arabic text normalization (handling alif forms, taa marbuta/ha, removing tashkeel for indexing).
   - Categorized search results with safe highlighted snippets.

## 3. Technology Architecture
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS + shadcn/ui design tokens
- **Database**: MongoDB with Mongoose ODM
- **Patterns**: Repository Pattern + Service Layer + DTOs
- **Validation**: Zod + React Hook Form
- **Testing**: Vitest + React Testing Library

# DATABASE.md — MongoDB Schema Design & Indexes

## 1. Collections & Relationships

### 1.1 Lessons (`lessons`)
Educational units grouping sequences of steps (e.g., "صفة الوضوء الكاملة", "صفة الصلاة المفروضة").
- `_id`: ObjectId
- `title`: String (indexed)
- `slug`: String (unique index)
- `description`: String
- `category`: String (enum: `wudu` | `salah`, indexed)
- `introduction`: String
- `coverImage`: String
- `status`: String (enum: `draft` | `published`, indexed)
- `order`: Number (indexed)
- `createdAt`: Date
- `updatedAt`: Date

### 1.2 LessonSteps (`lesson_steps`)
Detailed sequential steps within a lesson.
- `_id`: ObjectId
- `lessonId`: ObjectId (ref: `Lesson`, indexed)
- `title`: String
- `slug`: String
- `description`: String
- `detailedExplanation`: String
- `image`: String (relative asset path)
- `imageAlt`: String
- `order`: Number (compound index with `lessonId`)
- `classification`: String (enum: `obligatory` (فرض/واجب) | `sunnah` (سنة) | `recommended` (مستحب) | `educational` (تعليمي))
- `notes`: Array<String>
- `references`: Array<{ title: String, source: String, url?: String }>
- `createdAt`: Date
- `updatedAt`: Date

### 1.3 Hadiths (`hadiths`)
Prophetic Hadiths with authentic chain and text.
- `_id`: ObjectId
- `arabicText`: String (indexed for text search)
- `narrator`: String (الراوي)
- `collection`: String (المصدر e.g. "صحيح البخاري", "صحيح مسلم")
- `book`: String (كتاب الطهارة / كتاب الصلاة)
- `chapter`: String (باب ...)
- `hadithNumber`: String
- `grading`: String (e.g. "صحيح", "حسن")
- `topic`: String (enum: `wudu` | `salah` | `general_purification`)
- `explanation`: String
- `sourceUrl`: String
- `verificationStatus`: String (enum: `verified` | `pending_review`)
- `createdAt`: Date
- `updatedAt`: Date

### 1.4 Categories (`categories`)
- `_id`: ObjectId
- `name`: String
- `slug`: String (unique)
- `description`: String
- `order`: Number

### 1.5 Admins (`admins`)
- `_id`: ObjectId
- `name`: String
- `email`: String (unique index, lowercase)
- `passwordHash`: String (Argon2 / Scrypt / Bcrypt)
- `role`: String (enum: `super_admin` | `editor`)
- `isActive`: Boolean
- `lastLoginAt`: Date
- `createdAt`: Date
- `updatedAt`: Date

## 2. Index Strategy
- Compound Index: `{ lessonId: 1, order: 1 }`
- Compound Index: `{ category: 1, status: 1, order: 1 }`
- Text / Normalized Index: `arabicText`, `title`, `detailedExplanation`
- Slugs: `{ slug: 1 }` unique

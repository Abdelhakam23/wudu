# API.md — RESTful Endpoints Specification

## 1. Response Standard Format
All responses adhere to the standard envelope:
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 42
  }
}
```
Errors return:
```json
{
  "success": false,
  "error": {
    "code": "BAD_REQUEST",
    "message": "وصف الخطأ باللغة العربية",
    "details": [ ... ]
  }
}
```

## 2. Public Endpoints
- `GET /api/lessons` — Retrieve published lessons (filter by `category=wudu|salah`)
- `GET /api/lessons/[slug]` — Retrieve lesson overview and metadata
- `GET /api/lessons/[slug]/steps` — Retrieve ordered steps for a specific lesson
- `GET /api/steps/[id]` — Retrieve full details of a specific step
- `GET /api/hadiths` — List verified Hadiths with filtering (`topic`, `collection`, `page`, `limit`)
- `GET /api/hadiths/[id]` — Retrieve specific Hadith record
- `GET /api/search?q={query}&category={category}` — Full-text Arabic search across lessons, steps, and Hadiths
- `GET /api/categories` — List active categories

## 3. Admin Protected Endpoints
Require valid session bearer token / HTTP-only cookie.
- `POST /api/admin/lessons` — Create lesson
- `PATCH /api/admin/lessons/[id]` — Update lesson
- `DELETE /api/admin/lessons/[id]` — Delete lesson
- `POST /api/admin/steps` — Create step
- `PATCH /api/admin/steps/[id]` — Update step
- `DELETE /api/admin/steps/[id]` — Delete step
- `POST /api/admin/hadiths` — Add verified Hadith
- `PATCH /api/admin/hadiths/[id]` — Update Hadith
- `DELETE /api/admin/hadiths/[id]` — Delete Hadith

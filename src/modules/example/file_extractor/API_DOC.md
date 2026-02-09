# File Extractor API Faker — How It Works

This doc explains how the fake File Extractor API is built so you can work with it, extend it, or swap it for a real backend later.

---

## Overview

The “API” is **not** a separate server. It’s **Next.js API routes** that talk to an **in-memory store**. No database, no Supabase, no network calls. Everything runs inside your app when you use `next dev` or `next start`.

- **Purpose:** Build and test the full document-extraction flow (list, upload, view, edit, delete) offline.
- **Persistence:** Data lives only in a `Map` in Node. Restart the dev server → store resets; seed data is re-created on first request.

---

## Architecture

```
Browser (React)
    ↓  fetch()
fileExtractorApi (fileExtractorApi.ts)
    ↓  GET /api/file-extractor, POST /api/file-extractor, etc.
Next.js API routes (pages/api/file-extractor/index.ts, [id].ts)
    ↓  store.list(), store.get(id), store.create(...), etc.
In-memory store (pages/api/file-extractor/store.ts)
    ↓  Map<id, FileExtractorDetail>
```

- **Client** calls `fileExtractorApi.list()`, `.upload()`, etc., which hit relative URLs like `/api/file-extractor`.
- **Routes** read `req.method` and `req.body` / `req.query`, call the store, then `res.status(...).json(...)`.
- **Store** is a single `Map` keyed by `id`. It’s created once when the module loads and shared across all requests.

---

## Where Things Live

| What | Path |
|------|------|
| Types (shared by client + API) | `FileExtractor.types.ts` |
| Client API (fetch wrappers) | `fileExtractorApi.ts` |
| In-memory store | `pages/api/file-extractor/store.ts` |
| List + Upload | `pages/api/file-extractor/index.ts` |
| Get one, Update, Delete | `pages/api/file-extractor/[id].ts` |

Types are in the **module** folder so both the UI and the API routes can import them (e.g. `@/modules/example/file_extractor/FileExtractor.types`). The store lives under **pages/api** so it’s only used on the server.

---

## The Store (In-Memory Backend)

**File:** `pages/api/file-extractor/store.ts`

- **Data structure:** `Map<string, FileExtractorDetail>`. Key = `id`, value = full record (including `structuredData` and optional `pdfDataUrl`).
- **IDs:** Generated with `f_` + `Date.now().toString(36)` + random suffix (e.g. `f_m5k2x9a_abc12def`). No UUID dependency.
- **Seed data:** On first load (when `store.size === 0`), three records are inserted: an invoice, a resume, and a contract. So the list is never empty after the first request.
- **List order:** `list()` returns all values sorted by `editDate` descending (newest first).

**Exported functions:**

| Function | What it does |
|----------|----------------|
| `list()` | Returns all records, sorted by `editDate` desc. |
| `get(id)` | Returns one record or `undefined`. |
| `create({ fileName, schemaType?, fileBase64?, actor? })` | Creates a new record, generates id and timestamps, sets `lastAction` to “created”. If `fileBase64` is provided, sets `pdfDataUrl` to a data URL so the PDF can be shown in an iframe. |
| `update(id, { structuredData, actor? })` | Replaces `structuredData`, updates `lastAction` to “edited” and `editDate` to now. Returns `undefined` if id not found. |
| `remove(id)` | Deletes the record. Returns `true` if it existed, `false` otherwise. |

**Details worth knowing:**

- New records are created with `status: "ready"`. The faker does not simulate “processing”; you could add a delay and flip status if you want to test that.
- `structuredData` on create is a minimal object: `{ title, extractedAt, fields: [] }`. You can replace it entirely on update with any `Record<string, unknown>`.
- `pdfDataUrl` is only set when you upload with `fileBase64`. It’s stored as `data:application/pdf;base64,<base64>`. Large PDFs will make the in-memory store big; fine for dev, not for production.

---

## API Endpoints

Base path: **`/api/file-extractor`**

### 1. List files

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/file-extractor` | Returns all files (for the table). |

**Response (200):**  
`{ files: FileExtractorRecord[] }`

- Each item is a **record** (no `structuredData`, no `pdfDataUrl`). The route strips those from the store’s full detail so the list payload stays small.

**Errors:** None for this route (empty list is `{ files: [] }`).

---

### 2. Upload (create) a file

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/file-extractor` | Creates a new file record. |

**Request body (JSON):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `fileName` | string | Yes | Display name (e.g. `"report.pdf"`). |
| `schemaType` | string | No | Defaults to `"document"`. |
| `fileBase64` | string | No | Raw base64 (no `data:...` prefix). If present, stored and returned as `pdfDataUrl` for viewing. |

**Response (201):**  
`{ file: FileExtractorRecord }`  
Same as list items: no `structuredData` or `pdfDataUrl` in the response (you can GET by id to see them).

**Errors:**

- **400** — Missing or non-string `fileName`. Body: `{ error: "fileName is required" }`.
- **405** — Wrong method. Body: `{ error: "Method not allowed" }`.

**Details:**

- No file type or size checks. Any string is accepted as `fileName`; any string as `fileBase64`.
- The store creates the record synchronously. No async job or “processing” state.

---

### 3. Get one file (for View / Edit)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/file-extractor/[id]` | Returns full detail for one file. |

**Response (200):**  
`{ file: FileExtractorDetail }`  
Includes `structuredData` and, if stored, `pdfDataUrl`.

**Errors:**

- **400** — Missing `id` in query. Body: `{ error: "id is required" }`.
- **404** — No record with that id. Body: `{ error: "File not found" }`.
- **405** — Wrong method.

---

### 4. Update structured data

| Method | Path | Description |
|--------|------|-------------|
| `PATCH` | `/api/file-extractor/[id]` | Updates `structuredData` (and lastAction / editDate). |

**Request body (JSON):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `structuredData` | object | Yes | Any JSON object. Fully replaces the previous value. |
| `actor` | string | No | Used for `lastAction.actor`; defaults to `"You"`. |

**Response (200):**  
`{ file: FileExtractorDetail }`  
Full updated record.

**Errors:**

- **400** — Missing or non-object `structuredData`. Body: `{ error: "structuredData is required" }`.
- **404** — No record with that id.
- **405** — Wrong method.

**Details:**

- The store does a shallow merge: it keeps `fileName`, `schemaType`, `pdfDataUrl`, etc., and only replaces `structuredData`, `lastAction`, and `editDate`.
- You can send nested objects or arrays in `structuredData`; the faker doesn’t validate schema.

---

### 5. Delete a file

| Method | Path | Description |
|--------|------|-------------|
| `DELETE` | `/api/file-extractor/[id]` | Removes the record. |

**Response (200):**  
`{ deleted: true }`  
(No body field for the deleted id; you already have it from the URL.)

**Errors:**

- **400** — Missing `id`.
- **404** — No record with that id.
- **405** — Wrong method.

---

## Client API (Front-End)

**File:** `fileExtractorApi.ts`

All methods use `fetch` with the relative base `/api/file-extractor`, so they work offline with `next dev` as long as the app is served from the same origin.

| Method | Returns | Throws |
|--------|--------|--------|
| `fileExtractorApi.list()` | `Promise<{ files: FileExtractorRecord[] }>` | On non-2xx: `Error` with message from `{ error }` or status text. |
| `fileExtractorApi.upload(body)` | `Promise<{ file: FileExtractorRecord }>` | Same. |
| `fileExtractorApi.get(id)` | `Promise<{ file: FileExtractorDetail }>` | Same. |
| `fileExtractorApi.update(id, body)` | `Promise<{ file: FileExtractorDetail }>` | Same. |
| `fileExtractorApi.delete(id)` | `Promise<void>` | Same. |

**Error handling:** Every method parses JSON and, when `!res.ok`, throws `new Error(response.error ?? res.statusText)`. So you can `try/catch` and show `e.message` in the UI.

**Helper:**  
`fileToBase64(file: File): Promise<string>`  
Reads a `File` (e.g. from an input) and returns the **raw base64 string** (no `data:application/pdf;base64,` prefix). You pass that as `fileBase64` in `upload()` if you want the PDF to be viewable later via `pdfDataUrl`.

---

## Data Shapes (Types)

- **FileExtractorRecord** — What you get in **list** and **upload** responses: `id`, `fileName`, `schemaType`, `status`, `lastAction`, `editDate`, `createdAt`. No `structuredData` or `pdfDataUrl`.
- **FileExtractorDetail** — What you get from **get** and **update**: same as record, plus `structuredData` (required) and `pdfDataUrl` (optional).
- **FileExtractorStatus** — `"ready" | "processing" | "archived" | "error"`. Seed data and create use `"ready"` or `"processing"`; the faker never sets `"archived"` or `"error"` automatically.
- **LastAction** — `{ actor: string, action: "created" | "edited", at: string }`. `at` is ISO date string.
- **StructuredData** — `Record<string, unknown>`. Intentionally flexible so different document types (invoice, resume, contract) can have different shapes.

---

## Details You Might Care About

1. **List responses don’t include `pdfDataUrl` or `structuredData`**  
   Keeps list payloads small. Use GET by id when you need to show the PDF or edit form.

2. **No authentication**  
   Any client can call any endpoint. Fine for local dev; a real backend would add auth.

3. **Request body parsing**  
   Next.js API routes parse JSON bodies by default. No need to add a body parser for these endpoints.

4. **IDs in the URL**  
   The `[id].ts` route uses `req.query.id`. IDs are URL-safe (alphanumeric + underscore). The client uses `encodeURIComponent(id)` when calling GET/PATCH/DELETE.

5. **Concurrent requests**  
   The store is a single in-memory Map. No locking; if you ever needed to simulate heavy concurrency, you’d add something. For normal dev use it’s fine.

6. **Swapping to a real API**  
   Keep the same types and the same `fileExtractorApi` method names. Change the implementation inside `fileExtractorApi.ts` to call your real base URL and map their response shape to `FileExtractorRecord` / `FileExtractorDetail` if needed. The rest of the UI can stay as is.

---

## Quick Reference: From UI to Store

| User action | Client call | Route | Store |
|------------|-------------|-------|--------|
| Load table | `fileExtractorApi.list()` | GET `/api/file-extractor` | `list()` |
| Upload file | `fileExtractorApi.upload({ fileName, schemaType?, fileBase64? })` | POST `/api/file-extractor` | `create(...)` |
| Open View/Edit | `fileExtractorApi.get(id)` | GET `/api/file-extractor/[id]` | `get(id)` |
| Save edits | `fileExtractorApi.update(id, { structuredData, actor? })` | PATCH `/api/file-extractor/[id]` | `update(id, ...)` |
| Delete | `fileExtractorApi.delete(id)` | DELETE `/api/file-extractor/[id]` | `remove(id)` |

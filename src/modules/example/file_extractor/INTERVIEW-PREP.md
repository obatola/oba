# Hypha interview prep – File Extractor

Quick reference for the onsite and for working offline.

---

## Offline checklist (do before you’re offline)

- [ ] Run `npm install` so `node_modules` is complete (no network needed after that).
- [ ] Run `npm run dev` once to confirm the app and fake APIs work.
- [ ] This repo works fully offline: fake APIs are in-memory, no Supabase/OpenAI calls.

---

## Your stack vs interview starter

| Interview starter      | This repo (your prep)        |
|------------------------|------------------------------|
| Next.js **App Router** | Next.js **Pages Router**     |
| Tailwind + shadcn/ui   | Mantine (no Tailwind/shadcn) |
| Supabase + real APIs   | Fake in-memory APIs          |
| Provided API endpoints | `fileExtractorApi` → `/api/file-extractor/*` |

**Interview says:** “This stack is a starting point, not a constraint.” Using Mantine instead of shadcn is fine.

**If you get a new starter repo on the day:** Treat it as a new codebase. Your types (`FileExtractor.types.ts`) and the *pattern* of a thin API layer (`fileExtractorApi`) transfer; you’ll point that layer at their endpoints instead of your fake ones.

---

## When you get the real starter

1. **Swap the API layer**  
   Keep the same function names if you can (`list`, `upload`, `get`, `update`, `delete`). Change the implementation to call their endpoints (and optionally Supabase client). Your types can stay as-is if their API shape is similar.

2. **Supabase (if they use it)**  
   You’ll use it for: storing file metadata and/or files, and maybe auth. No need to know Supabase in depth—comfort with “HTTP + SQL/database” is enough. Ask your partner for the env vars and where to plug in.

3. **PDF display**  
   You already have an iframe for PDFs (`/files/...` or `pdfDataUrl`). On the real app, the PDF URL might come from Supabase storage or their API; same iframe pattern applies.

---

## Talking points for the demo

- **Why fake APIs first:** So you can build and test the full flow (list, upload, view, edit, delete) without the real backend. Lets you focus on UX and structure; swapping to real endpoints is a small change in the API module.
- **What would break first under pressure:** With the current fake setup—in-memory store (resets on restart), no auth, no real file storage. With a real system—rate limits, large uploads, and schema differences per document type.
- **Scope / prioritization:** You’d ship: upload → list with status → view PDF + structured data → edit and save structured data → delete. You’d cut or defer: sort, advanced schema editor, offline sync.

---

## File Extractor feature checklist (your README goals)

| Goal                               | Status in this repo                          |
|------------------------------------|----------------------------------------------|
| 1. Upload PDF                      | API + test button; UI can add modal + file input |
| 2. Get structured data as return   | API returns `structuredData`; seed data has examples |
| 3. Edit and save structured data   | API `update(id, { structuredData })`; UI can add form/modal |
| 4. View PDF with structured data   | iframe for PDF; Get returns `pdfDataUrl` + `structuredData` |
| 5. Allow deletion of PDF           | API `delete(id)` + test button               |

Use the 5 hours to wire the existing APIs into a clear UI: table of files, View (iframe + structured data), Edit (form or JSON edit), Delete with refresh.

Good luck Monday.

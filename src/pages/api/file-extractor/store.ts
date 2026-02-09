/**
 * In-memory fake store for File Extractor APIs.
 * Persists only for the lifetime of the dev server (resets on restart).
 */

import type { FileExtractorDetail, LastAction } from "@/modules/example/file_extractor/FileExtractor.types";

function now(): string {
  return new Date().toISOString();
}

function id(): string {
  return "f_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 9);
}

const store = new Map<string, FileExtractorDetail>();

/** Seed a few rows so the table isn't empty on first load. */
function seed() {
  if (store.size > 0) return;
  const seedRecords: FileExtractorDetail[] = [
    {
      id: id(),
      fileName: "invoice-q1-2024.pdf",
      schemaType: "invoice",
      status: "ready",
      createdBy: "Timmothy",
      lastEditedAt: "2024-02-04T14:00:00.000Z",
      lastEditedBy: "John",
      createdAt: "2024-02-04T14:00:00.000Z",
      structuredData: {
        invoiceNumber: "INV-2024-001",
        date: "2024-01-15",
        total: 1250.0,
        lineItems: [
          { description: "Consulting", amount: 1000 },
          { description: "Expenses", amount: 250 },
        ],
      },
    },
    {
      id: id(),
      fileName: "resume-draft.pdf",
      schemaType: "resume",
      status: "ready",
      createdBy: "Timmothy",
      lastEditedAt: "2024-02-04T14:00:00.000Z",
      lastEditedBy: "John",
      createdAt: "2024-02-04T14:00:00.000Z",
      structuredData: {
        name: "Jane Doe",
        email: "jane@example.com",
        skills: ["React", "TypeScript", "Node"],
        experience: [
          { title: "Senior Engineer", company: "Acme", years: 3 },
        ],
      },
    },
    {
      id: id(),
      fileName: "contract-nda.pdf",
      schemaType: "contract",
      status: "processing",
      createdBy: "Timmothy",
      lastEditedAt: undefined,
      lastEditedBy: undefined,
      createdAt: now(),
      structuredData: {},
    },
  ];
  seedRecords.forEach((r) => store.set(r.id, r));
}

seed();

export function list(): FileExtractorDetail[] {
  return Array.from(store.values()).sort(
    (a, b) => new Date(b.lastEditedAt || b.createdAt).getTime() - new Date(a.lastEditedAt || a.createdAt).getTime()
  );
}

export function get(id: string): FileExtractorDetail | undefined {
  return store.get(id);
}

export function create(params: {
  fileName: string;
  schemaType?: string;
  fileBase64?: string;
  actor?: string;
}): FileExtractorDetail {
  const actor = params.actor ?? "You";
  const nowStr = now();
  const record: FileExtractorDetail = {
    id: id(),
    fileName: params.fileName,
    schemaType: params.schemaType ?? "document",
    status: "ready",
    createdAt: nowStr,
    createdBy: actor,
    structuredData: {
      title: params.fileName.replace(/\.pdf$/i, ""),
      extractedAt: nowStr,
      fields: [],
    },
    pdfDataUrl: params.fileBase64
      ? `data:application/pdf;base64,${params.fileBase64}`
      : undefined,
  };
  store.set(record.id, record);
  return record;
}

export function update(
  id: string,
  params: { structuredData: Record<string, unknown>; actor?: string }
): FileExtractorDetail | undefined {
  const existing = store.get(id);
  if (!existing) return undefined;
  const actor = params.actor ?? "You";
  const nowStr = now();
  const updated: FileExtractorDetail = {
    ...existing,
    structuredData: params.structuredData,
    lastEditedBy: actor,
    lastEditedAt: nowStr,
  };
  store.set(id, updated);
  return updated;
}

export function remove(id: string): boolean {
  return store.delete(id);
}

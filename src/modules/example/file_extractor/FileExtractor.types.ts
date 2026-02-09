/**
 * File Extractor shared types (frontend + fake API).
 * Schema for structured data is flexible (user/AI-defined).
 */

import { FileSchema } from "./types";

export type FileExtractorStatus = "ready" | "processing" | "archived" | "error";

export type LastActionKind = "created" | "edited";

export interface LastAction {
  actor: string;
  action: LastActionKind;
  at: string; // ISO date
}

/** One row in the file list table. */
export interface FileExtractorRecord {
  id: string;
  fileName: string;
  schemaType: FileSchema;
  status: FileExtractorStatus;
  lastEditedBy?: string;
  lastEditedAt?: string; // ISO date
  createdAt: string; // ISO date
  createdBy: string;
}

/** Structured data extracted from PDF (schema can vary). */
export type StructuredData = Record<string, unknown>;

/** Full record as returned by GET /api/file-extractor/[id] (includes structured data and optional PDF for view). */
export interface FileExtractorDetail extends FileExtractorRecord {
  structuredData: StructuredData;
  /** Data URL for viewing PDF in browser (e.g. data:application/pdf;base64,...). Omitted if not stored. */
  pdfDataUrl?: string;
}

// --- API request/response types ---

export interface FileExtractorListResponse {
  files: FileExtractorRecord[];
}

export interface FileExtractorUploadRequestBody {
  fileName: string;
  schemaType?: string;
  /** Optional: base64-encoded file content for fake storage (so View can show something). */
  fileBase64?: string;
}

export interface FileExtractorUploadResponse {
  file: FileExtractorRecord;
}

export interface FileExtractorUpdateRequestBody {
  structuredData: StructuredData;
  /** Optional: who is editing (for lastAction). */
  actor?: string;
}

export interface FileExtractorDetailResponse {
  file: FileExtractorDetail;
}

export interface FileExtractorErrorResponse {
  error: string;
}

/**
 * Client-side API for File Extractor.
 * Uses relative /api/file-extractor so it works offline with next dev.
 */

import type {
  FileExtractorRecord,
  FileExtractorDetail,
  FileExtractorUploadRequestBody,
  FileExtractorUpdateRequestBody,
  StructuredData,
} from "./FileExtractor.types";

const BASE = "/api/file-extractor";

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { error?: string }).error ?? res.statusText);
  }
  return data as T;
}

export const fileExtractorApi = {
  /** List all files (for the table). */
  async list(): Promise<{ files: FileExtractorRecord[] }> {
    const res = await fetch(BASE);
    return handleResponse(res);
  },

  /** Upload a new file. Pass fileName and optionally schemaType and fileBase64. */
  async upload(body: FileExtractorUploadRequestBody): Promise<{ file: FileExtractorRecord }> {
    const res = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },

  /** Get one file with structured data and optional pdfDataUrl (for View/Edit). */
  async get(id: string): Promise<{ file: FileExtractorDetail }> {
    const res = await fetch(`${BASE}/${encodeURIComponent(id)}`);
    return handleResponse(res);
  },

  /** Update structured data for a file. */
  async update(
    id: string,
    body: FileExtractorUpdateRequestBody
  ): Promise<{ file: FileExtractorDetail }> {
    const res = await fetch(`${BASE}/${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },

  /** Delete a file. */
  async delete(id: string): Promise<void> {
    const res = await fetch(`${BASE}/${encodeURIComponent(id)}`, { method: "DELETE" });
    await handleResponse<{ deleted: true }>(res);
  },
};

/** Helper: read a File as base64 for upload (optional, for storing PDF for View). */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.includes(",") ? result.split(",")[1] : result;
      resolve(base64 ?? "");
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export type { FileExtractorRecord, FileExtractorDetail, StructuredData };

import type { NextApiRequest, NextApiResponse } from "next";
import * as store from "./store";
import type {
  FileExtractorDetailResponse,
  FileExtractorUpdateRequestBody,
  FileExtractorErrorResponse,
} from "@/modules/example/file_extractor/FileExtractor.types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    FileExtractorDetailResponse | FileExtractorErrorResponse | { deleted: true }
  >
) {
  const id = req.query.id as string;
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }

  if (req.method === "GET") {
    const file = store.get(id);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }
    return res.status(200).json({ file });
  }

  if (req.method === "PATCH") {
    const body = req.body as FileExtractorUpdateRequestBody;
    if (!body || typeof body.structuredData !== "object") {
      return res.status(400).json({ error: "structuredData is required" });
    }
    const file = store.update(id, {
      structuredData: body.structuredData,
      actor: body.actor,
    });
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }
    return res.status(200).json({ file });
  }

  if (req.method === "DELETE") {
    const ok = store.remove(id);
    if (!ok) {
      return res.status(404).json({ error: "File not found" });
    }
    return res.status(200).json({ deleted: true });
  }

  res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
  return res.status(405).json({ error: "Method not allowed" });
}

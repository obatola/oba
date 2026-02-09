import type { NextApiRequest, NextApiResponse } from "next";
import * as store from "./store";
import type {
  FileExtractorListResponse,
  FileExtractorUploadRequestBody,
  FileExtractorUploadResponse,
  FileExtractorErrorResponse,
  FileExtractorRecord,
  FileExtractorDetail,
} from "@/modules/example/file_extractor/FileExtractor.types";

function toRecord(d: FileExtractorDetail): FileExtractorRecord {
  const rest = { ...d };
  delete (rest as Partial<FileExtractorDetail>).pdfDataUrl;
  return rest as FileExtractorRecord;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    FileExtractorListResponse | FileExtractorUploadResponse | FileExtractorErrorResponse
  >
) {
  if (req.method === "GET") {
    const files = store.list().map(toRecord);
    return res.status(200).json({ files });
  }

  if (req.method === "POST") {
    const body = req.body as FileExtractorUploadRequestBody;
    if (!body?.fileName || typeof body.fileName !== "string") {
      return res.status(400).json({ error: "fileName is required" });
    }
    const file = store.create({
      fileName: body.fileName,
      schemaType: body.schemaType,
      fileBase64: body.fileBase64,
    });
    return res.status(201).json({ file: toRecord(file) });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: "Method not allowed" });
}

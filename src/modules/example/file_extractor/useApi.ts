import { useState } from "react";
import { fileExtractorApi, FileExtractorDetail } from "./fileExtractorApi";
import { FileSchema } from "./types";

export function useApi() {
    const [status, setStatus] = useState<string>("");
    const [lastId, setLastId] = useState<string>("");

    const run = async (
        label: string,
        fn: () => Promise<unknown>
    ) => {
        setStatus(`… ${label}`);
        try {
            const result = await fn();
            const preview = JSON.stringify(result);
            setStatus(`OK: ${label} → ${preview.slice(0, 120)}${preview.length > 120 ? "…" : ""}`);
            return result;
        } catch (e) {
            const msg = e instanceof Error ? e.message : String(e);
            setStatus(`Error: ${label} — ${msg}`);
        }
    };

    const onList = () =>
        run("List", async () => {
            const { files } = await fileExtractorApi.list();
            if (files[0]) setLastId(files[0].id);
            return { count: files.length, files };
        });

    const onUpload = ({ fileName, schemaType }: { fileName: string, schemaType: FileSchema }) =>
        run("Upload", async () => {
            const { file } = await fileExtractorApi.upload({
                fileName,
                schemaType,
            });
            setLastId(file.id);
            return file.id;
        });

    const onGet = ({ id }: { id: string }) =>
        run("Get", async () => {
            if (!id) throw new Error("No id — run List or Upload first");
            const { file } = await fileExtractorApi.get(id);
            return file;
        });

    const onUpdate = ({ fileRecord }: { fileRecord: FileExtractorDetail }) =>
        run("Update", async () => {
            const id = fileRecord.id;
            if (!id) throw new Error("No id — run List or Upload first");
            const { file } = await fileExtractorApi.update(id, {
                structuredData: { updated: true, at: new Date().toISOString() },
                actor: "Test User",
            });
            return file;
        });

    const onDelete = ({ id }: { id: string }) =>
        run("Delete", async () => {
            if (!id) throw new Error("No id — run List or Upload first");
            await fileExtractorApi.delete(id);
            setLastId("");
            return { deleted: id };
        });

    return {
        status,
        onList,
        onUpload,
        onGet,
        onUpdate,
        onDelete,
    }
}
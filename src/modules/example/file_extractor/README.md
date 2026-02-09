# File Extractor

## Goals
1. upload pdf
2. get structured data as return
3. Edit and Save Structured PDF Data
4. View PDF With Structured Data
5. Allow Deletion of PDF



## Thoughts
- could potentially be any schema of returned values

### Things to Note / Concider:
- how do I want to handle form input?
    - potentially a form library
- How would I manage the current status of the upload?
- How would I manage schema type of structured content (would that be user generated)
    - I assume schema would be utilized to pass to the ai to determine the structured results
- How can I display pdfs in view?


### Polish
- Display specific view with new content



- Questions
    - What is Supabase? What is postgres?


### User Experience

[ Upload ] // button


// table or list with the following
| File Name | Type (Schema Type) | Status | Last Action | Edit Date | Action Menu |
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    - Status ( ready | processing | archived | error )
    - Last Action
        - Edit or Creation Time (whatever is most recent)
        "Timmy created * Feb 4th"
        "Paul edited * Feb 12th"

    - Action Menu
        - View
        - Edit
        - Remove

### Interactions
Upload
    - user clicks upload button, a modal displays that has a upload file button present (maybe this is a good place for a library for file upload)
    - upon upload, the modal opens and we trigger a toast that uploading process has begun
        - we then would like to get a toast when upload is successful

File List Table
    - we should have a way to trigger a pull for data whenever the content on the backend changes to ensure the upload is complete

    Edit
        - on edit we should probably go to another page where data is then pulled on open (one option is to display a modal)
    
    Delete
        - on delete that should trigger a db change and thus, things would re-load in the table


### Steps to Complete
    1. Define Interactions
    2. Define Schema
    3. Implement Upload
    4. Implement View
    5. Implement Edit
    6. Implement Delete


### Things I will not implement 
    - sort

---

## Fake APIs (offline-ready)

All endpoints live under `/api/file-extractor` and work with `next dev` with no external services.

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/file-extractor` | List all files (for the table). |
| `POST` | `/api/file-extractor` | Upload: body `{ fileName, schemaType?, fileBase64? }`. |
| `GET` | `/api/file-extractor/[id]` | Get one file with `structuredData` and optional `pdfDataUrl`. |
| `PATCH` | `/api/file-extractor/[id]` | Update: body `{ structuredData, actor? }`. |
| `DELETE` | `/api/file-extractor/[id]` | Delete a file. |

### Client helper

Use `fileExtractorApi` from `./fileExtractorApi`:

```ts
import { fileExtractorApi, fileToBase64 } from "@/modules/example/file_extractor/fileExtractorApi";

// List (e.g. for table)
const { files } = await fileExtractorApi.list();

// Upload (e.g. from modal)
const file = await someInput.files?.[0];
const base64 = file ? await fileToBase64(file) : undefined;
const { file: newRecord } = await fileExtractorApi.upload({
  fileName: file?.name ?? "unknown.pdf",
  schemaType: "invoice",
  fileBase64: base64,
});

// Get one (View / Edit page)
const { file: detail } = await fileExtractorApi.get(id);

// Save edits
await fileExtractorApi.update(id, { structuredData: editedData, actor: "Paul" });

// Delete
await fileExtractorApi.delete(id);
```

### Data shape

- **List item** (`FileExtractorRecord`): `id`, `fileName`, `schemaType`, `status`, `lastAction`, `editDate`, `createdAt`.
- **Detail** (`FileExtractorDetail`): same + `structuredData` (flexible object) and optional `pdfDataUrl` for viewing.
- **Status**: `"ready" | "processing" | "archived" | "error"`.
- **lastAction**: `{ actor: string, action: "created" | "edited", at: ISO date }`.

Storage is in-memory (resets when the dev server restarts). A few seed rows are added on first load.
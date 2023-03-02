import localforage from "localforage";
import { IAllNotes, IDBNote } from "./types";

localforage.config({
    name: "NotesDB",
});

const DBNAME = "NotesDB";

const notesTable = localforage.createInstance({
    name: DBNAME,
    storeName: "notes",
    description: "this is where the notes are stored",
});

export const addNoteToDB = (note: IDBNote) => editNoteInDB(note);

export const editNoteInDB = (note: IDBNote) => {
    notesTable.setItem(`${note.id}`, note);
};

export const deleteNoteFromDB = (id: string) => {
    notesTable.removeItem(id);
};

export const getAllNotesFromDB = async () => {
    const keys = await notesTable.keys();
    const allNotesInTable: IAllNotes = {};
    console.log({ keys });
    for (const key of keys) {
        const note = (await notesTable.getItem(key)) as unknown as IDBNote;
        // TODO: add function to confirm value is INote type
        allNotesInTable[note.id] = note;
    }

    return allNotesInTable;
};

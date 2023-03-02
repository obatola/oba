import Dexie, { Table } from "dexie";

export interface INewNote {
    id: string;
    title: string;
    body: string;
}

export interface IDBNote extends INewNote {
    dateAdded: number;
    lastModified: number;
}

export class NotesDatabase extends Dexie {
    public notes!: Table<IDBNote, number>;

    public constructor() {
        super("NotesDatabase");
        this.version(1).stores({
            notes: "++id, title, body",
        });
    }
}

export interface IAllNotes {
    [key: string]: IDBNote;
}

import { IAllNotes } from "./types";

export const sortArrayOfNoteIdsByDateAdded = (
    notesIds: string[],
    allNotes: IAllNotes
) => {
    const sortAlgorithm = (idA: string, idB: string) => {
        if (allNotes[idA].dateAdded > allNotes[idB].dateAdded) return 1;
        if (allNotes[idA].dateAdded < allNotes[idB].dateAdded) return -1;
        return 0;
    };

    return notesIds.sort(sortAlgorithm);
};

export const generateId = (): string => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
};

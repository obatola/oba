import React, { createContext, useEffect, useReducer } from "react";
import { IAllNotes, IDBNote, INewNote } from "./types";
import {
    addNoteToDB,
    deleteNoteFromDB,
    editNoteInDB,
    getAllNotesFromDB,
} from "./noteDB";
import { sortArrayOfNoteIdsByDateAdded } from "./utils";

interface INotesState {
    allNotes: IAllNotes;
    listOfNoteIds: string[];
}

export enum INoteActions {
    AddNote = "AddNote",
    SetAllNotes = "SetAllNotes",
    EditNote = "EditNote",
    RemoveNote = "RemoveNote",
    ClearNotes = "ClearNotes",
}

type INoteActionPackages =
    | { type: INoteActions.AddNote; note: INewNote }
    | { type: INoteActions.EditNote; id: string; note: IDBNote }
    | { type: INoteActions.SetAllNotes; allNotes: IAllNotes }
    | { type: INoteActions.RemoveNote; id: string }
    | { type: INoteActions.ClearNotes };

export interface IUseNotePackage {
    state: INotesState;
    dispatch: React.Dispatch<INoteActionPackages>;
}

const initialState: INotesState = {
    allNotes: {},
    listOfNoteIds: [],
};

function noteHandlerReducerLocalStorageInterceptor(
    state: INotesState,
    action: INoteActionPackages
): INotesState {
    const newState = noteHandlerReducer(state, action);

    switch (action.type) {
        case INoteActions.AddNote:
            const newNote = newState.allNotes[action.note.id];
            addNoteToDB(newNote);
            break;
        case INoteActions.EditNote:
            editNoteInDB(action.note);
            break;
        case INoteActions.RemoveNote:
            deleteNoteFromDB(action.id);
            break;
    }

    return newState;
}

function noteHandlerReducer(
    state: INotesState,
    action: INoteActionPackages
): INotesState {
    switch (action.type) {
        case INoteActions.AddNote: {
            const newNote: IDBNote = {
                ...action.note,
                dateAdded: Date.now(),
                lastModified: Date.now(),
            };

            const allNotes: IAllNotes = {
                ...state.allNotes,
                [newNote.id]: newNote,
            };

            const listOfNoteIds = _getListOfNoteIds(allNotes);

            return {
                ...state,
                allNotes,
                listOfNoteIds,
            };
        }
        case INoteActions.EditNote: {
            const allNotes: IAllNotes = {
                ...state.allNotes,
                [action.id]: action.note,
            };

            return {
                ...state,
                allNotes: allNotes,
            };
        }
        case INoteActions.RemoveNote: {
            const allNotes: IAllNotes = {
                ...state.allNotes,
            };

            delete allNotes[action.id];
            const listOfNoteIds = _getListOfNoteIds(allNotes);

            return { ...state, allNotes, listOfNoteIds };
        }
        case INoteActions.SetAllNotes: {
            const { allNotes } = action;
            const listOfNoteIds = _getListOfNoteIds(allNotes);

            return { ...state, allNotes, listOfNoteIds };
        }
        case INoteActions.ClearNotes: {
            return { ...state, allNotes: {}, listOfNoteIds: [] };
        }
        default: {
            throw new Error(
                `Unhandled action type: ${
                    (action as unknown as { type: string }).type
                }`
            );
        }
    }
}

const _getListOfNoteIds = (allNotes: IAllNotes) => {
    console.log("sort");
    return sortArrayOfNoteIdsByDateAdded(Object.keys(allNotes), allNotes);
};

const NoteContext = createContext<IUseNotePackage | null>(null);
NoteContext.displayName = "NoteContext";

export const NoteContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [state, dispatch] = useReducer(
        noteHandlerReducerLocalStorageInterceptor,
        initialState
    );

    useEffect(() => {
        (async () => {
            const allNotesInTable: IAllNotes = await getAllNotesFromDB();
            dispatch({
                type: INoteActions.SetAllNotes,
                allNotes: allNotesInTable,
            });
        })();
    }, []);

    return (
        <NoteContext.Provider value={{ state, dispatch }}>
            {children}
        </NoteContext.Provider>
    );
};

export const useNote = (): IUseNotePackage => {
    const context = React.useContext(NoteContext);

    if (!context) {
        throw new Error("useNote must be used within a NoteContextProvider");
    }

    return context;
};

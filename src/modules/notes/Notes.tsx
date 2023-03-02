import React from "react";
import { Note } from "./Note";
import { INewNote } from "./types";
import { INoteActions, useNote } from "./useNotesContext";
import { generateId } from "./utils";

export const Notes = () => {
    const {
        state: { listOfNoteIds },
        dispatch,
    } = useNote();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.target as HTMLFormElement;

        const newNote: INewNote = {
            id: generateId(),
            title: target.noteTitle.value as string,
            body: target.noteBody.value as string,
        };

        dispatch({ type: INoteActions.AddNote, note: newNote });
    };

    return (
        <div>
            Lots of notes
            {listOfNoteIds.map((id: string) => (
                <Note key={id} id={id} />
            ))}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Note Title
                        <input
                            name="noteTitle"
                            type="text"
                            placeholder="title"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Note Body
                        <textarea name="noteBody" placeholder="...new note" />
                    </label>
                </div>
                <button type="submit">submit</button>
            </form>
        </div>
    );
};

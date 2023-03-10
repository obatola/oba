import React, { useState } from "react";
import { IDBNote } from "./types";
import { INoteActions, useNote } from "./useNotesContext";

interface INoteProps {
    id: string;
}

export const Note = ({ id }: INoteProps) => {
    const {
        state: { allNotes },
        dispatch,
    } = useNote();
    const note = allNotes[id];
    const [editedNote, setEditedNote] = useState<IDBNote>(note);
    const [isEditMode, setIsEditMode] = useState(false);

    if (!note) {
        return <>NO NOTE FOUND</>;
    }

    const handleEditSubmit = (
        event:
            | React.FormEvent<HTMLFormElement>
            | React.FormEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
        dispatch({ type: INoteActions.EditNote, id, note: editedNote });
        setIsEditMode(false);
    };

    const handleEnableEditMode = () => {
        // dispatch({ type: INoteActions.EditNote, id, note });
        setIsEditMode(true);
    };

    const handleDelete = () => {
        dispatch({ type: INoteActions.RemoveNote, id });
    };

    const handleChangeNoteField = (
        event: React.FormEvent<HTMLInputElement>
    ) => {
        const target = event.target as HTMLInputElement;

        setEditedNote({
            ...editedNote,
            [target.name]: target.value,
        });
    };

    return (
        <div
            style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid grey",
            }}
        >
            <form onSubmit={handleEditSubmit}>
                {isEditMode ? (
                    <>
                        <div>
                            <input
                                name="title"
                                placeholder="...title"
                                onChange={handleChangeNoteField}
                                value={editedNote.title}
                            />
                        </div>
                        <div>
                            <input
                                name="body"
                                placeholder="...body"
                                onChange={handleChangeNoteField}
                                value={editedNote.body}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div>{editedNote.title}</div>
                        <div>{editedNote.body}</div>
                    </>
                )}

                <button
                    type="button"
                    onClick={
                        isEditMode ? handleEditSubmit : handleEnableEditMode
                    }
                >
                    {isEditMode ? "save" : "edit"}
                </button>
                <button type="button" onClick={handleDelete}>
                    delete
                </button>
                <button type="submit" style={{ display: "none" }}>
                    submit
                </button>
            </form>
        </div>
    );
};

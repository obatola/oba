import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { IPlannerActions, usePlanner } from "../hooks/usePlannerContext";
import styles from "../styles/DayNote.module.css";
import { IDay } from "../types";

const DEBOUNCE_THROTTLE_MS = 700;

export const DayNote = () => {
    const { state, dispatch } = usePlanner();
    const currentDay = state.days[state.currentDayId];
    const [editableNote, setEditableNote] = useState<string>(currentDay?.note);

    useEffect(() => {
        console.log("State loaded changed");
        if (state.isStateLoaded) {
            setEditableNote(currentDay.note);
        }
    }, [state.isStateLoaded]);

    useEffect(() => {
        // reset notes on current day change
        setEditableNote(currentDay.note);
    }, [state.currentDayId]);

    console.log({
        currentDay,
        note: currentDay.note,
        isLoaded: state.isStateLoaded,
    });

    console.log(editableNote);

    const _saveNoteInDay = (note: string, currentDayObj: IDay) => {
        dispatch({
            type: IPlannerActions.SetDay,
            day: {
                ...currentDayObj,
                note,
            },
        });
    };

    const { debouncedFunction: debouncedSaveNoteInDay } = useDebounce({
        action: _saveNoteInDay,
        throttleTimeMS: DEBOUNCE_THROTTLE_MS,
    });

    const handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
        const { value } = event.target as HTMLTextAreaElement;
        setEditableNote(value);
        debouncedSaveNoteInDay(editableNote, currentDay);
    };

    return (
        <div className={styles.wrapper}>
            <h2>Notes</h2>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                }}
            >
                <textarea
                    title="note"
                    name="note"
                    rows={6}
                    onChange={handleChange}
                    value={editableNote}
                    className={styles.textArea}
                />
            </form>
        </div>
    );
};

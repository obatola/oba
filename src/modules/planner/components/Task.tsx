import { useState } from "react";
import { IPlannerActions, usePlanner } from "../hooks/usePlannerContext";
import { ITask } from "../types";
import {
    generateEmptyTask,
    getDateIdOfXDaysFromNow,
    getTodaysId,
    isDayIdToday,
} from "../utils";
import styles from "../styles/Task.module.css";
import Popup from "reactjs-popup";

interface IProps {
    id?: string;
    isPriority?: boolean;
    isNewTask?: boolean;
}

// TODO: instead of id as empty string for empty task view, just add a flag called, is new task
export const Task = ({ id = "", isPriority, isNewTask }: IProps) => {
    const { state, dispatch } = usePlanner();
    const [editableTask, setEditableTask] = useState<ITask>(
        state.tasks[id] || generateEmptyTask()
    );

    const handleBodyChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { value } = event.target as HTMLInputElement;
        setEditableTask({
            ...editableTask,
            body: value,
        } as ITask);
    };

    const handleIsCompleteToggle = (
        event: React.FormEvent<HTMLInputElement>
    ) => {
        const { checked } = event.target as HTMLInputElement;

        setEditableTask((prevTaskState: ITask) => {
            const newEditableTaskState = {
                ...prevTaskState,
                isComplete: checked,
            } as ITask;

            saveTask(newEditableTaskState);
            return newEditableTaskState;
        });
    };

    const saveTask = (task: ITask) => {
        if (!id) {
            // TODO: ensure body is full
            dispatch({
                type: isPriority
                    ? IPlannerActions.AddPriority
                    : IPlannerActions.AddTask,
                newTask: task,
            });
            setEditableTask(generateEmptyTask());
        } else {
            dispatch({
                type: IPlannerActions.EditTask,
                id,
                task: task,
            });
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        saveTask(editableTask);
    };

    const handleDelete = () => {
        dispatch({
            type: isPriority
                ? IPlannerActions.RemoveTaskFromDayPriority
                : IPlannerActions.RemoveTaskFromDayTask,
            id: editableTask.id,
        });
    };

    const handleMoveTasksToDay = () => {
        let dayIdToMoveTo;

        if (isDayIdToday(state.currentDayId)) {
            // tomorrow's date
            dayIdToMoveTo = getDateIdOfXDaysFromNow(1);
        } else {
            // todays date
            dayIdToMoveTo = getTodaysId();
        }

        dispatch({
            type: IPlannerActions.MoveTaskToOtherDay,
            desiredDateId: dayIdToMoveTo,
            taskId: id,
            isPriority: !!isPriority,
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.wrapper}>
                {!isNewTask && (
                    <input
                        className={styles.checkbox}
                        type="checkbox"
                        title="isComplete"
                        name="isComplete"
                        checked={editableTask.isComplete}
                        onChange={handleIsCompleteToggle}
                    />
                )}
                <input
                    className={styles.bodyInput}
                    onChange={handleBodyChange}
                    name="task"
                    placeholder="...take the dog out"
                    disabled={editableTask.isComplete}
                    value={editableTask.body}
                />
                {!isNewTask && (
                    <Popup
                        trigger={() => (
                            <button type="button" title="open task options">
                                ...
                            </button>
                        )}
                        position="left bottom"
                        closeOnDocumentClick
                    >
                        <div className={styles.popOverContainer}>
                            <button
                                type="button"
                                title="button"
                                onClick={handleMoveTasksToDay}
                            >
                                Move task to{" "}
                                {isDayIdToday(state.currentDayId)
                                    ? "tomorrow"
                                    : "today"}
                            </button>
                            <button
                                type="button"
                                title="button"
                                onClick={handleDelete}
                            >
                                Delete task
                            </button>
                        </div>
                    </Popup>
                )}
                <button
                    type="submit"
                    title="submit"
                    style={{ display: "none" }}
                />
            </form>
        </div>
    );
};

import { useState } from "react";
import { IPlannerActions, usePlanner } from "../hooks/usePlannerContext";
import { ITask } from "../types";
import { generateEmptyTask } from "../utils";

interface IProps {
    id?: string;
    isPriority?: boolean;
}

// TODO: instead of id as empty string for empty task view, just add a flag called, is new task
export const Task = ({ id = "", isPriority }: IProps) => {
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
        console.log("Submit form");
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

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="checkbox"
                title="isComplete"
                name="isComplete"
                checked={editableTask.isComplete}
                onChange={handleIsCompleteToggle}
            />
            {editableTask.isComplete ? (
                <>{editableTask.body}</>
            ) : (
                <input
                    onChange={handleBodyChange}
                    name="task"
                    placeholder="...take the dog out"
                    value={editableTask.body}
                />
            )}
            <button type="button" title="button" onClick={handleDelete}>
                x
            </button>
            <button type="submit" title="submit" style={{ display: "none" }} />
        </form>
    );
};

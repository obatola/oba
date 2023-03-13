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
    showDuration?: boolean;
    taskQueueId?: string; // id added if viewing from task queuess
}

// TODO: instead of id as empty string for empty task view, just add a flag called, is new task
export const Task = ({
    id = "",
    isPriority,
    isNewTask,
    taskQueueId,
    showDuration,
}: IProps) => {
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

    const handleDurationChange = (
        event: React.FormEvent<HTMLSelectElement>
    ) => {
        const { value } = event.target as HTMLInputElement;
        const edditedTask: ITask = {
            ...editableTask,
            durationSeconds: +value,
        };
        setEditableTask(edditedTask);
        saveTask(edditedTask);
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
            console.log("new task", { taskQueueId });
            // TODO: ensure body is full
            if (taskQueueId) {
                dispatch({
                    type: IPlannerActions.AddTask,
                    newTask: task,
                });
                dispatch({
                    type: IPlannerActions.AddTaskToQueue,
                    taskId: task.id,
                });
            } else {
                dispatch({
                    type: isPriority
                        ? IPlannerActions.AddPriority
                        : IPlannerActions.AddTask,
                    newTask: task,
                });
            }

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
        console.log("task submit");
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

    const handleAddTaskToTaskQueue = () => {
        dispatch({ type: IPlannerActions.AddTaskToQueue, taskId: id });
    };

    const handleRemoveTaskFromTaskQueue = () => {
        if (taskQueueId) {
            dispatch({
                type: IPlannerActions.RemoveTaskFromTaskQueue,
                taskId: id,
                taskQueueId,
            });
        }
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
                {showDuration && (
                    <select
                        className={styles.bodyInput}
                        onChange={handleDurationChange}
                        name="duration"
                        title="duration"
                        placeholder="30 seconds"
                        disabled={editableTask.isComplete}
                        value={editableTask.durationSeconds}
                    >
                        <option value={30}>30 seconds</option>
                        <option value={60}>1 minute</option>
                        <option value={1.5 * 60}>1.5 minutes</option>
                        <option value={2 * 60}>2 minutes</option>
                        <option value={2.5 * 60}>2.5 minutes</option>
                        <option value={3 * 60}>3 minutes</option>
                        <option value={4 * 60}>4 minutes</option>
                        <option value={5 * 60}>5 minutes</option>
                        <option value={10 * 60}>10 minutes</option>
                        <option value={15 * 60}>15 minutes</option>
                        <option value={20 * 60}>20 minutes</option>
                        <option value={25 * 60}>25 minutes</option>
                        <option value={25 * 60}>25 minutes</option>
                        <option value={30 * 60}>30 minutes</option>
                        <option value={45 * 60}>45 minutes</option>
                        <option value={60 * 60}>1 hour</option>
                    </select>
                )}
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
                            {!taskQueueId && (
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
                            )}
                            {!taskQueueId && (
                                <button
                                    type="button"
                                    title="button"
                                    onClick={handleAddTaskToTaskQueue}
                                >
                                    Add to task playlist
                                </button>
                            )}
                            {taskQueueId && (
                                <button
                                    type="button"
                                    title="button"
                                    onClick={handleRemoveTaskFromTaskQueue}
                                >
                                    Remove from playlist
                                </button>
                            )}
                            {!taskQueueId && (
                                <button
                                    type="button"
                                    title="button"
                                    onClick={handleDelete}
                                >
                                    Delete task
                                </button>
                            )}
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

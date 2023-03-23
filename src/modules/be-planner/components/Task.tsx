import { IBETask } from "../types";
import styles from "../../planner/styles/Task.module.css";
import Popup from "reactjs-popup";
import {
    getDateIdOfXDaysFromNow,
    getTodaysId,
    isDayIdToday,
} from "@/modules/planner/utils";

export interface ITaskProps {
    task: IBETask;
    onEditTask: (task: IBETask) => void;
    onMoveTasksToDay: (taskID: string, dateString: string) => void;
    onAddTaskToTaskQueue: (taskID: string) => void;
    currentDayString: string;
}

export const Task = ({
    task,
    onEditTask,
    onMoveTasksToDay,
    onAddTaskToTaskQueue,
    currentDayString,
}: ITaskProps) => {
    const handleIsCompleteToggle = () => {
        onEditTask({
            ...task,
            is_complete: !task.is_complete,
        });
    };

    const handleMoveTasksToDay = () => {
        let dayIdToMoveTo;

        if (isDayIdToday(currentDayString)) {
            // tomorrow's date
            dayIdToMoveTo = getDateIdOfXDaysFromNow(1);
        } else {
            // todays date
            dayIdToMoveTo = getTodaysId();
        }

        onMoveTasksToDay(task.task_id, dayIdToMoveTo);
    };
    const handleAddTaskToTaskQueue = () => {
        onAddTaskToTaskQueue(task.task_id);
    };
    const handleDelete = () => {
        onEditTask({
            ...task,
            is_archived: true,
        });
    };

    return (
        <div>
            <div className={styles.wrapper}>
                <input
                    className={styles.checkbox}
                    type="checkbox"
                    title="isComplete"
                    name="isComplete"
                    checked={task.is_complete}
                    onChange={handleIsCompleteToggle}
                />
                {task.name}
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
                            {isDayIdToday(currentDayString)
                                ? "next day"
                                : "today"}
                        </button>

                        <button
                            type="button"
                            title="button"
                            onClick={handleAddTaskToTaskQueue}
                        >
                            Add to task playlist
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
            </div>
        </div>
    );
};

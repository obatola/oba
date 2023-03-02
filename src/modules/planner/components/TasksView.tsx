import { usePlanner } from "../hooks/usePlannerContext";
import { sortTasksByIfCompleted } from "../utils";
import { Task } from "./Task";
import styles from "../styles/TaskView.module.css";

interface IProps {
    isPriority?: boolean;
}

export const TasksView = ({ isPriority }: IProps) => {
    const { state } = usePlanner();
    const currentDay = state.days[state.currentDayId];
    let tasks = [];
    if (isPriority) {
        tasks = currentDay?.priorities || [];
    } else {
        tasks = currentDay?.tasks || [];
    }

    return (
        <div className={styles.wrapper}>
            <h2>{isPriority ? "Priorities" : "Tasks"}</h2>
            <div className={styles.tasksWrapper}>
                {sortTasksByIfCompleted(tasks, state.tasks).map((taskId) => (
                    <Task key={taskId} id={taskId} isPriority={isPriority} />
                ))}
                <Task isPriority={isPriority} isNewTask />
            </div>
        </div>
    );
};

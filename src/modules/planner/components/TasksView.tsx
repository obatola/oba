import { usePlanner } from "../hooks/usePlannerContext";
import { getCompleteAndIncompleteTasksFromTaskIds } from "../utils";
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

    const { incompleteTasksIds, completeTasksIds } =
        getCompleteAndIncompleteTasksFromTaskIds(tasks, state.tasks);

    return (
        <div className={styles.wrapper}>
            <h2>{isPriority ? "Priorities" : "Tasks"}</h2>
            <div className={styles.tasksWrapper}>
                {incompleteTasksIds.map((taskId) => (
                    <Task key={taskId} id={taskId} isPriority={isPriority} />
                ))}
                <Task isPriority={isPriority} isNewTask />
                {completeTasksIds.map((taskId) => (
                    <Task key={taskId} id={taskId} isPriority={isPriority} />
                ))}
            </div>
        </div>
    );
};

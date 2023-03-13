import { usePlanner } from "../hooks/usePlannerContext";
import { getCompleteAndIncompleteTasksFromTaskIds } from "../utils";
import { Task } from "./Task";
import styles from "../styles/TaskView.module.css";
import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { useDebounce } from "../hooks/useDebounce";

const DEBOUNCE_THROTTLE_MS = 700;

interface IProps {
    taskList: string[];
    title: string;
    handleSaveList: (newTaskArray: string[]) => void;
    showDuration: boolean;
    isPriority?: boolean;
    taskQueueId: string;
}

export const TaskQueueListView = ({
    taskList,
    title,
    handleSaveList,
    showDuration,
    isPriority = false,
    taskQueueId,
}: IProps) => {
    const { state } = usePlanner();
    const [completeTasksIds, setCompleteTaskList] = useState<string[]>([]);
    const [incompleteTasksIds, setIncompleteTaskList] = useState<string[]>([]);

    // debounced call to set re ordered task list to reduce writes on dbs
    const { debouncedFunction: dispatchSetReorderedTasksListInDayDebounced } =
        useDebounce({
            action: handleSaveList,
            throttleTimeMS: DEBOUNCE_THROTTLE_MS,
        });

    useEffect(() => {
        const tasks = taskList;

        const { incompleteTasksIds, completeTasksIds } =
            getCompleteAndIncompleteTasksFromTaskIds(tasks, state.tasks);

        setCompleteTaskList(completeTasksIds);
        setIncompleteTaskList(incompleteTasksIds);
    }, [taskList, state.tasks]);

    const handleSetTasksList =
        (type: "complete" | "incomplete") => (stringArr: string[]) => {
            let newTasksArray: string[] = [];
            if (type === "complete") {
                setCompleteTaskList(stringArr);
                newTasksArray = [...incompleteTasksIds, ...stringArr];
            } else {
                setIncompleteTaskList(stringArr);
                newTasksArray = [...stringArr, ...completeTasksIds];
            }

            // save re ordered list in day db (debounced to reduce write calls to db)
            dispatchSetReorderedTasksListInDayDebounced(newTasksArray);
        };

    return (
        <div className={styles.wrapper}>
            <h2>{title}</h2>
            <div className={styles.tasksWrapper}>
                <Reorder.Group
                    axis="y"
                    values={incompleteTasksIds}
                    onReorder={handleSetTasksList("incomplete")}
                >
                    {incompleteTasksIds.map((taskId) => (
                        <Reorder.Item key={taskId} value={taskId}>
                            <Task
                                key={taskId}
                                id={taskId}
                                isPriority={isPriority}
                                showDuration={showDuration}
                                taskQueueId={taskQueueId}
                            />
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
                <Task
                    isPriority={isPriority}
                    isNewTask
                    taskQueueId={taskQueueId}
                />
                {completeTasksIds.map((taskId) => (
                    <Task
                        key={`task-queue-${taskId}`}
                        id={taskId}
                        isPriority={isPriority}
                        taskQueueId={taskQueueId}
                    />
                ))}
            </div>
        </div>
    );
};

import { IPlannerActions, usePlanner } from "../hooks/usePlannerContext";
import { getCompleteAndIncompleteTasksFromTaskIds } from "../utils";
import { Task } from "./Task";
import styles from "../styles/TaskView.module.css";
import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { IDay } from "../types";
import { useDebounce } from "../hooks/useDebounce";

const DEBOUNCE_THROTTLE_MS = 700;

interface IProps {
    isPriority?: boolean;
}

export const TasksView = ({ isPriority }: IProps) => {
    const { state, dispatch } = usePlanner();
    const [completeTasksIds, setCompleteTaskList] = useState<string[]>([]);
    const [incompleteTasksIds, setIncompleteTaskList] = useState<string[]>([]);
    const currentDay = state.days[state.currentDayId];

    const _saveTaskArrayInDay = (
        newTaskArray: string[],
        currentDayObj: IDay
    ) => {
        dispatch({
            type: IPlannerActions.SetDay,
            day: {
                ...currentDayObj,
                [isPriority ? "priorities" : "tasks"]: newTaskArray,
            },
        });
    };

    // debounced call to set re ordered task list to reduce writes on dbs
    const { debouncedFunction: dispatchSetReorderedTasksListInDayDebounced } =
        useDebounce({
            action: _saveTaskArrayInDay,
            throttleTimeMS: DEBOUNCE_THROTTLE_MS,
        });

    useEffect(() => {
        let tasks = [];

        if (isPriority) {
            tasks = currentDay?.priorities || [];
        } else {
            tasks = currentDay?.tasks || [];
        }

        const { incompleteTasksIds, completeTasksIds } =
            getCompleteAndIncompleteTasksFromTaskIds(tasks, state.tasks);

        setCompleteTaskList(completeTasksIds);
        setIncompleteTaskList(incompleteTasksIds);
    }, [currentDay, isPriority, state.tasks]);

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
            dispatchSetReorderedTasksListInDayDebounced(
                newTasksArray,
                currentDay
            );
        };

    return (
        <div className={styles.wrapper}>
            <h2>{isPriority ? "Priorities" : "Tasks"}</h2>
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
                            />
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
                <Task isPriority={isPriority} isNewTask />
                {completeTasksIds.map((taskId) => (
                    <Task key={taskId} id={taskId} isPriority={isPriority} />
                ))}
            </div>
        </div>
    );
};

import { useEffect, useState } from "react";
import { IPlannerActions, usePlanner } from "../hooks/usePlannerContext";
import styles from "../styles/TaskQueueView.module.css";
import {
    getCompleteAndIncompleteTasksFromTaskIds,
    getTimeLeftDisplayText,
    playSound,
} from "../utils";
import { TaskQueueListView } from "./TaskQueueListView";
import { FaPlay, FaStop } from "react-icons/fa";
import { ICON_SIZE } from "@/contants";

const DEFAULT_DURATION = 60;

export const TaskQueueView = () => {
    const { state, dispatch } = usePlanner();
    const [isTaskStarted, setIsTaskStarted] = useState(false); //TODO: set to false
    const currentDay = state.days[state.currentDayId];
    const taskQueue = state.taskQueues[currentDay.taskQueues[0]];

    const { incompleteTasksIds } = getCompleteAndIncompleteTasksFromTaskIds(
        taskQueue.tasks,
        state.tasks
    );

    const currentTaskInQueue = state.tasks[incompleteTasksIds[0]];

    const [timeLeft, setTimeLeft] = useState<number>(
        currentTaskInQueue?.durationSeconds || DEFAULT_DURATION
    );

    useEffect(() => {
        if (currentTaskInQueue) {
            setTimeLeft(currentTaskInQueue.durationSeconds || DEFAULT_DURATION);
        }
        if (currentTaskInQueue === undefined) {
            setIsTaskStarted(false);
        }
    }, [currentTaskInQueue]);

    useEffect(() => {
        // decrement timer
        if (isTaskStarted) {
            if (timeLeft > 0) {
                setTimeout(() => {
                    setTimeLeft((previousTime) => {
                        return previousTime - 1;
                    });
                }, 1000);
            } else {
                playSound("/success-1-compressed.wav");
                setIsTaskStarted(false);
            }
        }
    }, [timeLeft, isTaskStarted]);

    if (!taskQueue) {
        return <>no queue</>;
    }

    const handleSaveList = (updatedList: string[]) => {
        // TODO: ensure I don't need to save taskQueue as a ref
        dispatch({
            type: IPlannerActions.SetTaskQueue,
            taskQueue: {
                ...taskQueue,
                tasks: updatedList,
            },
        });
    };

    console.log(currentTaskInQueue);

    const handleNextTask = () =>
        dispatch({
            type: IPlannerActions.EditTask,
            id: currentTaskInQueue.id,
            task: {
                ...currentTaskInQueue,
                isComplete: true,
            },
        });

    const handleCloseTaskPlaylist = () =>
        dispatch({
            type: IPlannerActions.CloseTaskQueue,
        });

    return (
        <div>
            <h2>Queue</h2>
            {incompleteTasksIds.length === 0 && (
                <>
                    All Task Complete!
                    <button type="button" onClick={handleCloseTaskPlaylist}>
                        {"< back to day view"}
                    </button>
                </>
            )}
            {incompleteTasksIds.length > 0 && (
                <div className={styles.playlistTimerView}>
                    <div className={styles.taskTitle}>
                        {currentTaskInQueue.body}
                    </div>
                    <div className={styles.timeText}>
                        {getTimeLeftDisplayText(timeLeft)}
                    </div>
                    {timeLeft === 0 && (
                        <button type="button" onClick={handleNextTask}>
                            next
                        </button>
                    )}
                    {timeLeft > 0 && (
                        <button
                            type="button"
                            onClick={
                                !isTaskStarted
                                    ? () => {
                                          setIsTaskStarted(true);
                                      }
                                    : () => setIsTaskStarted(false)
                            }
                        >
                            {!isTaskStarted ? (
                                <FaPlay size={ICON_SIZE.large} />
                            ) : (
                                <FaStop size={ICON_SIZE.large} />
                            )}
                        </button>
                    )}
                </div>
            )}

            <TaskQueueListView
                taskList={taskQueue.tasks}
                title="Task Queue"
                showDuration
                taskQueueId={taskQueue?.id}
                handleSaveList={handleSaveList}
            />
        </div>
    );
};

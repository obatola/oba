import moment from "moment";
import { IPlannerActions, usePlanner } from "../hooks/usePlannerContext";
import { TasksView } from "./TasksView";
import styles from "../styles/DayView.module.css";
import { DayNote } from "./DayNote";
import { TaskQueueView } from "./TaskQueueView";

export const DayView = () => {
    const { state, dispatch } = usePlanner();
    const currentDay = state.days[state.currentDayId];

    const handleGoBackOneDay = () => {
        dispatch({ type: IPlannerActions.AdvanceByNDays, numDays: -1 });
    };
    const handleAdvanceOneDay = () => {
        dispatch({ type: IPlannerActions.AdvanceByNDays, numDays: 1 });
    };

    const handleViewTaskPlaylist = () =>
        dispatch({
            type: IPlannerActions.ViewTaskQueue,
            taskQueueId: currentDay.taskQueues[0],
        });

    const handleCloseTaskPlaylist = () =>
        dispatch({
            type: IPlannerActions.CloseTaskQueue,
        });

    if (state.viewTaskQueue !== undefined) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.headerWrapper}>
                    <button type="button" onClick={handleCloseTaskPlaylist}>
                        {"< back to day view"}
                    </button>
                    Task Playlist
                </div>
                <TaskQueueView />
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.headerWrapper}>
                <button type="button" onClick={handleGoBackOneDay}>
                    {"<"}
                </button>
                {moment(state.currentDayId)
                    .startOf("day")
                    .format("dddd, MMMM Do YYYY")}
                <button type="button" onClick={handleAdvanceOneDay}>
                    {">"}
                </button>
            </div>
            {currentDay.taskQueues.length === 1 && (
                <button type="button" onClick={handleViewTaskPlaylist}>
                    view task playlist
                </button>
            )}
            <TasksView isPriority />
            <TasksView />
            <DayNote />
        </div>
    );
};

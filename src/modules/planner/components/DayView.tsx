import moment from "moment";
import { IPlannerActions, usePlanner } from "../hooks/usePlannerContext";
import { TasksView } from "./TasksView";
import styles from "../styles/DayView.module.css";
import { DayNote } from "./DayNote";

export const DayView = () => {
    const { state, dispatch } = usePlanner();
    const handleGoBackOneDay = () => {
        dispatch({ type: IPlannerActions.AdvanceByNDays, numDays: -1 });
    };
    const handleAdvanceOneDay = () => {
        dispatch({ type: IPlannerActions.AdvanceByNDays, numDays: 1 });
    };

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
            <TasksView isPriority />
            <TasksView />
            <DayNote />
        </div>
    );
};

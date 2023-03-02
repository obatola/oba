import moment from "moment";
import { usePlanner } from "../hooks/usePlannerContext";
import { TasksView } from "./TasksView";
import styles from "../styles/DayView.module.css";

export const DayView = () => {
    const { state } = usePlanner();

    return (
        <div className={styles.wrapper}>
            {moment(state.currentDayId)
                .startOf("day")
                .format("dddd, MMMM Do YYYY")}
            <TasksView isPriority />
            <TasksView />
        </div>
    );
};

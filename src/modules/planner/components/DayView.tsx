import moment from "moment";
import { usePlanner } from "../hooks/usePlannerContext";
import { TasksView } from "./TasksView";

export const DayView = () => {
    const { state } = usePlanner();

    return (
        <>
            {moment(state.currentDayId)
                .startOf("day")
                .format("dddd, MMMM Do YYYY")}
            <TasksView isPriority />
            <TasksView />
        </>
    );
};

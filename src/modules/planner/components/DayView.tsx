import moment from "moment";
import { useEffect } from "react";
import { IPlannerActions, usePlanner } from "../hooks/usePlannerContext";
import { generateNewDay } from "../utils";
import { TasksView } from "./TasksView";

export const DayView = () => {
    const { state, dispatch } = usePlanner();

    useEffect(() => {
        if (!state.days[state.currentDayId]) {
            console.log("NO DAY AVAILABLE");
        } else {
            console.log("found a day", state.days[state.currentDayId]);
        }
    }, []);

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

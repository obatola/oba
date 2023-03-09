import React, { createContext, useEffect, useReducer } from "react";
import produce from "immer";
import moment from "moment";
import { IDay, IDaysDB, ITask, ITasksDB } from "../types";
import { generateNewDay, getTodaysId } from "../utils";
import {
    addTaskToDB,
    editDayInDB,
    editTaskInDB,
    getAllDaysFromDB,
    getAllTasksFromDB,
} from "../plannerDB";
import { DATE_ID_FORMAT } from "../constants";

interface IPlannerState {
    days: IDaysDB;
    tasks: ITasksDB;
    currentDayId: string;
    isStateLoaded: boolean;
}

export enum IPlannerActions {
    AddTask = "AddTask",
    AdvanceByNDays = "AdvanceByNDays",
    AddPriority = "AddPriority",
    SetDays = "SetDays",
    SetDay = "SetDay",
    SetTasks = "SetTasks",
    StateLoaded = "StateLoaded",
    EditTask = "EditTask",
    RemoveTaskFromDayTask = "RemoveTaskFromDayTask",
    RemoveTaskFromDayPriority = "RemoveTaskFromDayPriority",
    MoveTaskToOtherDay = "MoveTaskToOtherDay",
    ClearPlanner = "ClearPlanner",
}

type IPlannerActionPackages =
    | { type: IPlannerActions.AddTask; newTask: ITask }
    | { type: IPlannerActions.AdvanceByNDays; numDays: number }
    | { type: IPlannerActions.AddPriority; newTask: ITask }
    | { type: IPlannerActions.SetDay; day: IDay }
    | { type: IPlannerActions.EditTask; id: string; task: ITask }
    | { type: IPlannerActions.SetDays; days: IDaysDB }
    | { type: IPlannerActions.SetTasks; tasks: ITasksDB }
    | { type: IPlannerActions.StateLoaded }
    | { type: IPlannerActions.RemoveTaskFromDayTask; id: string }
    | { type: IPlannerActions.RemoveTaskFromDayPriority; id: string }
    | {
          type: IPlannerActions.MoveTaskToOtherDay;
          desiredDateId: string;
          taskId: string;
          isPriority: boolean;
      }
    | { type: IPlannerActions.ClearPlanner };

export interface IUsePlannerPackage {
    state: IPlannerState;
    dispatch: React.Dispatch<IPlannerActionPackages>;
}

const intitialToday = generateNewDay();

const initialState: IPlannerState = {
    days: {
        [intitialToday.id]: intitialToday,
    },
    tasks: {},
    currentDayId: getTodaysId(),
    isStateLoaded: false,
};

function noteHandlerReducerLocalStorageInterceptor(
    state: IPlannerState,
    action: IPlannerActionPackages
): IPlannerState {
    const newState = noteHandlerReducer(state, action);
    const currentDay = newState.days[state.currentDayId];

    switch (action.type) {
        case IPlannerActions.AddTask:
        case IPlannerActions.AddPriority:
            const newTask = newState.tasks[action.newTask.id];
            addTaskToDB(newTask);
            editDayInDB(currentDay);
            break;
        case IPlannerActions.EditTask:
            editTaskInDB(action.task);
            break;
        case IPlannerActions.SetDay:
            editDayInDB(action.day);
            break;
        case IPlannerActions.RemoveTaskFromDayTask:
        case IPlannerActions.RemoveTaskFromDayPriority:
            editDayInDB(currentDay);
            editTaskInDB(newState.tasks[action.id]);
            break;
        case IPlannerActions.MoveTaskToOtherDay:
            // manipulated currentDay and the day we're moving to
            editDayInDB(currentDay);
            const dayMovedTo = newState.days[action.desiredDateId];
            editDayInDB(dayMovedTo);
            break;
    }

    return newState;
}

function noteHandlerReducer(
    state: IPlannerState,
    action: IPlannerActionPackages
): IPlannerState {
    console.log("action fired", action.type);
    switch (action.type) {
        case IPlannerActions.AddTask: {
            return produce(state, (draft) => {
                const { newTask } = action;
                // add task id to todays task
                draft.days[draft.currentDayId].tasks.push(newTask.id);
                // add task to task list
                draft.tasks[newTask.id] = newTask;
            });
        }
        case IPlannerActions.AdvanceByNDays: {
            return produce(state, (draft) => {
                // get n days from now, start of day formated string
                const newDayId = moment(draft.currentDayId)
                    .add(action.numDays, "day")
                    .format(DATE_ID_FORMAT);
                // check to see if there's a day object for that day
                // if day object exists
                if (draft.days[newDayId] !== undefined) {
                    // change current day to that day
                    draft.currentDayId = newDayId;
                } else {
                    // if day object does not exist yet
                    // change current day to that day and create that day, set in state
                    draft.days[newDayId] = generateNewDay(newDayId);
                    draft.currentDayId = newDayId;
                }
            });
        }
        case IPlannerActions.AddPriority: {
            return produce(state, (draft) => {
                const { newTask } = action;
                // add task id to todays priorities
                draft.days[draft.currentDayId].priorities.push(newTask.id);
                // add task to task list
                draft.tasks[newTask.id] = newTask;
            });
        }
        case IPlannerActions.EditTask: {
            return produce(state, (draft) => {
                const { id, task } = action;
                draft.tasks[id] = task;
            });
        }
        case IPlannerActions.RemoveTaskFromDayTask: {
            return produce(state, (draft) => {
                const { id } = action;
                const currentDay = draft.days[draft.currentDayId];
                const indexOfDaysTask = currentDay.tasks.indexOf(id);
                currentDay.tasks.splice(indexOfDaysTask, 1);
                draft.tasks[action.id].isDeleted = true;
            });
        }
        case IPlannerActions.RemoveTaskFromDayPriority: {
            return produce(state, (draft) => {
                const { id } = action;
                const currentDay = draft.days[draft.currentDayId];
                const indexOfDaysTask = currentDay.priorities.indexOf(id);
                currentDay.priorities.splice(indexOfDaysTask, 1);
                draft.tasks[action.id].isDeleted = true;
            });
        }
        case IPlannerActions.MoveTaskToOtherDay: {
            return produce(state, (draft) => {
                const { taskId, desiredDateId, isPriority } = action;
                draft.currentDayId;
                // remove task from current day
                const currentDay = draft.days[draft.currentDayId];
                if (isPriority) {
                    const indexOfDaysTask =
                        currentDay.priorities.indexOf(taskId);
                    currentDay.priorities.splice(indexOfDaysTask, 1);
                } else {
                    const indexOfDaysTask = currentDay.tasks.indexOf(taskId);
                    currentDay.tasks.splice(indexOfDaysTask, 1);
                }

                const doesDesiredDayExist = !!draft.days[desiredDateId];
                if (!doesDesiredDayExist) {
                    // if day does not exist create new day
                    draft.days[desiredDateId] = generateNewDay(desiredDateId);
                }

                const desiredDay = draft.days[desiredDateId];

                // add task to new day
                if (isPriority) {
                    desiredDay.priorities.push(taskId);
                } else {
                    desiredDay.tasks.push(taskId);
                }
            });
        }
        case IPlannerActions.SetDays: {
            return produce(state, (draft) => {
                draft.days = action.days;
            });
        }
        case IPlannerActions.SetDay: {
            return produce(state, (draft) => {
                draft.days[action.day.id] = action.day;
            });
        }
        case IPlannerActions.StateLoaded: {
            return produce(state, (draft) => {
                draft.isStateLoaded = true;
            });
        }
        case IPlannerActions.SetTasks: {
            return produce(state, (draft) => {
                draft.tasks = action.tasks;
            });
        }
        case IPlannerActions.ClearPlanner: {
            return produce(state, (draft) => {
                draft.days = {};
                draft.tasks = {};
            });
        }
        default: {
            throw new Error(
                `Unhandled action type: ${
                    (action as unknown as { type: string }).type
                }`
            );
        }
    }
}

const PlannerContext = createContext<IUsePlannerPackage | null>(null);
PlannerContext.displayName = "PlannerContext";

export const PlannerContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [state, dispatch] = useReducer(
        noteHandlerReducerLocalStorageInterceptor,
        initialState
    );

    useEffect(() => {
        (async () => {
            const tasksInTable: ITasksDB = await getAllTasksFromDB();
            const daysInTable: IDaysDB = await getAllDaysFromDB();
            dispatch({
                type: IPlannerActions.SetDays,
                days:
                    Object.keys(daysInTable).length > 0
                        ? daysInTable
                        : initialState.days,
            });
            dispatch({
                type: IPlannerActions.SetTasks,
                tasks: tasksInTable,
            });
            dispatch({ type: IPlannerActions.StateLoaded });
        })();
    }, []);

    return (
        <PlannerContext.Provider value={{ state, dispatch }}>
            {children}
        </PlannerContext.Provider>
    );
};

export const usePlanner = (): IUsePlannerPackage => {
    const context = React.useContext(PlannerContext);

    if (!context) {
        throw new Error(
            "usePlanner must be used within a PlannerContextProvider"
        );
    }

    return context;
};
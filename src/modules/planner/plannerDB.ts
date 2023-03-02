import localforage from "localforage";
import { IDay, IDaysDB, ITask, ITasksDB } from "./types";

const DB_NAME = "PlannerDB";

localforage.config({
    name: DB_NAME,
});

const daysTable = localforage.createInstance({
    name: DB_NAME,
    storeName: "days",
    description: "this is where the days are stored",
});

const tasksTable = localforage.createInstance({
    name: DB_NAME,
    storeName: "tasks",
    description: "this is where the tasks are stored",
});

export const addTaskToDB = (task: ITask) => editTaskInDB(task);

export const editTaskInDB = (task: ITask) => {
    tasksTable.setItem(`${task.id}`, task);
};

export const deleteTaskFromDB = (id: string) => {
    tasksTable.removeItem(id);
};

export const getAllTasksFromDB = async () => {
    const keys = await tasksTable.keys();
    const allTasksInTable: ITasksDB = {};
    for (const key of keys) {
        const task = (await tasksTable.getItem(key)) as unknown as ITask;
        // TODO: add function to confirm value is ITask type
        allTasksInTable[task.id] = task;
    }

    return allTasksInTable;
};

/* DAYS DB */

export const addDayToDB = (day: IDay) => editDayInDB(day);

export const editDayInDB = (day: IDay) => {
    daysTable.setItem(`${day.id}`, day);
};

export const deleteDayFromDB = (id: string) => {
    daysTable.removeItem(id);
};

export const getAllDaysFromDB = async () => {
    const keys = await daysTable.keys();
    const allDaysInTable: IDaysDB = {};
    for (const key of keys) {
        const day = (await daysTable.getItem(key)) as unknown as IDay;
        // TODO: add function to confirm value is IDay type
        allDaysInTable[day.id] = day;
    }

    return allDaysInTable;
};

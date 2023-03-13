import localforage from "localforage";
import {
    IDay,
    IDaysDB,
    ITask,
    ITaskQueue,
    ITasksDB,
    ITasksQueuesDB,
} from "./types";

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

const taskQueuesTable = localforage.createInstance({
    name: DB_NAME,
    storeName: "taskQueues",
    description: "this is where the queues are stored",
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

/* QUEUES DB */

export const addTaskQueueToDB = (queue: ITaskQueue) => editTaskQueueInDB(queue);

export const editTaskQueueInDB = (queue: ITaskQueue) => {
    taskQueuesTable.setItem(`${queue.id}`, queue);
};

export const deleteTaskQueueFromDB = (id: string) => {
    taskQueuesTable.removeItem(id);
};

export const getAllTaskQueuesForDayFromDB = async () => {
    const keys = await taskQueuesTable.keys();
    const allTaskQueuesInTable: ITasksQueuesDB = {};
    for (const key of keys) {
        const queue = (await taskQueuesTable.getItem(
            key
        )) as unknown as ITaskQueue;
        // TODO: add function to confirm value is IDay type
        allTaskQueuesInTable[queue.id] = queue;
    }

    return allTaskQueuesInTable;
};

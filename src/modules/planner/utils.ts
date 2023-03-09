import moment from "moment";
import { generateId } from "../notes/utils";
import { DATE_ID_FORMAT } from "./constants";
import { IDay, ITask, ITasksDB } from "./types";

export const getTodaysId = () => moment().startOf("day").format(DATE_ID_FORMAT);

export const getDateIdOfXDaysFromNow = (numDaysFromNow: number) =>
    moment().startOf("day").add(numDaysFromNow, "days").format(DATE_ID_FORMAT);

export const generateNewDay = (dayInIdFormat: string = getTodaysId()): IDay => {
    return {
        tasks: [],
        priorities: [],
        id: dayInIdFormat,
        day: dayInIdFormat,
        note: "",
    };
};

export const isDayIdToday = (dayId: string) => {
    const dayFormatedString = moment(dayId)
        .startOf("day")
        .format(DATE_ID_FORMAT);
    const today = moment().startOf("day").format(DATE_ID_FORMAT);

    return dayFormatedString === today;
};

export const generateEmptyTask = (): ITask => {
    return {
        id: generateId(),
        dateAdded: new Date().getTime(),
        dateModified: new Date().getTime(),
        body: "",
        isComplete: false,
        isDeleted: false,
        isArchived: false,
    };
};

export const sortTasksByIfCompleted = (
    taskIDs: string[],
    allTasks: ITasksDB
) => {
    const sortAlgorithm = (taskIDA: string, taskIDB: string) => {
        // console.log(allTasks[taskIDA].isComplete, allTasks[taskIDB].isComplete);
        if (allTasks[taskIDA].isComplete && !allTasks[taskIDB].isComplete) {
            return 1;
        } else if (
            !allTasks[taskIDA].isComplete &&
            allTasks[taskIDB].isComplete
        ) {
            return -1;
        }
        return 0;
    };

    return [...taskIDs].sort(sortAlgorithm);
};

export const getCompleteAndIncompleteTasksFromTaskIds = (
    taskIds: string[],
    allTasks: ITasksDB
): {
    incompleteTasksIds: string[];
    completeTasksIds: string[];
} => {
    const incompleteTasksIds: string[] = [];
    const completeTasksIds: string[] = [];

    for (const id of taskIds) {
        if (allTasks[id].isComplete) {
            completeTasksIds.push(id);
        } else {
            incompleteTasksIds.push(id);
        }
    }

    return { incompleteTasksIds, completeTasksIds };
};

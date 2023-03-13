import moment from "moment";
import { DATE_ID_FORMAT } from "./constants";
import { DayIdType, IDay, ITask, ITaskQueue, ITasksDB } from "./types";
import { v4 as uuidv4 } from "uuid";

export const getTodaysId = () => moment().startOf("day").format(DATE_ID_FORMAT);

export const getDateIdOfXDaysFromNow = (numDaysFromNow: number) =>
    moment().startOf("day").add(numDaysFromNow, "days").format(DATE_ID_FORMAT);

export const generateNewDay = (
    dayInIdFormat: DayIdType = getTodaysId()
): IDay => {
    return {
        tasks: [],
        priorities: [],
        id: dayInIdFormat,
        day: dayInIdFormat,
        taskQueues: [],
        note: "",
    };
};

export const generateNewTaskQueue = (
    dayInIdFormat: DayIdType,
    queueId: string = uuidv4()
): ITaskQueue => {
    return {
        id: queueId,
        tasks: [],
        gapDurationBetweenTasksSeconds: 3,
        associatedDay: dayInIdFormat,
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
        id: uuidv4(),
        dateAdded: new Date().getTime(),
        dateModified: new Date().getTime(),
        body: "",
        isComplete: false,
        durationSeconds: 60,
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

export const getTimeLeftDisplayText = (timeLeftSeconds: number) => {
    const minutes = `${Math.floor(timeLeftSeconds / 60)}`.padStart(2, "0");
    const seconds = `${timeLeftSeconds % 60}`.padStart(2, "0");
    return `${minutes}:${seconds}`;
};

export function playSound(url: string) {
    const audio = new Audio(url);
    audio.play();
}

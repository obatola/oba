export type DayIdType = string;

export interface ITaskQueue {
    id: string;
    tasks: string[];
    gapDurationBetweenTasksSeconds: number;
    associatedDay: DayIdType;
}

export interface ITasksQueuesDB {
    [id: string]: ITaskQueue;
}

export interface IDay {
    tasks: string[];
    taskQueues: string[];
    priorities: string[];
    schedule?: string;
    fiveMinuteJournal?: string;
    id: DayIdType;
    day: string;
    note: string;
}

export interface IDaysDB {
    [id: string]: IDay;
}

export interface ITask {
    id: string;
    dateAdded: number;
    dateModified: number;
    body: string;
    isComplete: boolean;
    isDeleted: boolean;
    isArchived: boolean;
    durationSeconds?: number;
}

export interface ITasksDB {
    [id: string]: ITask;
}

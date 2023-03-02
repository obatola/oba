export interface IDay {
    tasks: string[];
    priorities: string[];
    schedule?: string;
    fiveMinuteJournal?: string;
    id: string;
    day: string;
    note: string;
}

export interface IDaysDB {
    [id: string]: IDay;
}

export interface ITasksDB {
    [id: string]: ITask;
}

export interface ITask {
    id: string;
    dateAdded: number;
    dateModified: number;
    body: string;
    isComplete: boolean;
    isDeleted: boolean;
    isArchived: boolean;
}

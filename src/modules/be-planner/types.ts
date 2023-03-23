export interface IBETask {
    task_id: string;
    name: string;
    date_added: string;
    is_complete: boolean;
    is_archived: boolean;
    duration_seconds: string;
    time_started: string;
    time_completed: string;
    time_to_complete_seconds: number;
    date_modified: string;
    user_id: string;
    week_id: string;
    day_id: string;
    playlist_id: string;
}

export interface IBEUser {
    user_id: string;
    first_name: string;
    last_name: string;
    date_added: string;
    email: string;
}

export interface IBEDay {
    day_id: string;
    date: string;
    user_id: string;
    note: string;
}

import { API_PATHS, PATHS } from "@/modules/be-planner/constants";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import { DATE_ID_FORMAT } from "@/modules/planner/constants";
import styles from "../../planner/styles/DayView.module.css";
import { IBEDay, IBETask } from "../types";
import { TasksView } from "./TasksView";

export const DayView = () => {
    const [currentDayString, setCurrentDayString] = useState<string>(
        moment().startOf("day").format(DATE_ID_FORMAT)
    );
    const [day, setDay] = useState<IBEDay>();
    const [tasks, setTasks] = useState<IBETask[]>([]);

    const router = useRouter();
    useEffect(() => {
        (async () => {
            try {
                // check if logged in
                const response = await fetch(
                    `${API_PATHS.getDays}/${currentDayString}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (response.status === 401) {
                    router.push(PATHS.login);
                    return;
                }

                const responseJSON = await response.json();
                console.log({ responseJSON });

                if (
                    responseJSON.day &&
                    responseJSON.tasks &&
                    responseJSON.tasks.length >= 0
                ) {
                    setDay(responseJSON.day);
                    setTasks(responseJSON.tasks);
                }
                // if logged in get days
                // else redirect to login
            } catch (error) {
                console.log(error);
            }
        })();
    }, [currentDayString]);

    const getXDaysFromNow = (numDays: number) =>
        moment(currentDayString).add(numDays, "day").format(DATE_ID_FORMAT);

    const handleAdvanceOneDay = () => {
        setCurrentDayString(getXDaysFromNow(1));
    };

    const handleGoBackOneDay = () => {
        setCurrentDayString(getXDaysFromNow(-1));
    };

    const handleMoveTasksToDay = (task_id: string, dayString: string) => {
        (async () => {
            try {
                // check if logged in
                const response = await fetch(
                    `${API_PATHS.getDays}/${dayString}/move-task-to-day`,
                    {
                        method: "POST",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ task_id }),
                    }
                );

                if (response.status === 401) {
                    router.push(PATHS.login);
                    return;
                }

                const responseJSON = await response.json();
                console.log({ responseJSON });

                if (responseJSON.tasks && responseJSON.tasks.length >= 0) {
                    setTasks(responseJSON.tasks);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    };

    const handleAddTaskToTaskQueue = (taskID: string) => {
        // TODO: implement and figure out how to determine which task queue
        console.log(taskID);
    };

    const handleCreateNewTask = (name: string) => {
        (async () => {
            try {
                // check if logged in
                const response = await fetch(
                    `${API_PATHS.getDays}/${currentDayString}/task`,
                    {
                        method: "POST",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name }),
                    }
                );

                if (response.status === 401) {
                    router.push(PATHS.login);
                    return;
                }

                const responseJSON = await response.json();
                console.log({ responseJSON });

                if (responseJSON.tasks && responseJSON.tasks.length >= 0) {
                    setTasks(responseJSON.tasks);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    };

    const handleEditTask = (task: IBETask) => {
        (async () => {
            try {
                // check if logged in
                const response = await fetch(
                    `${API_PATHS.getDays}/${currentDayString}/task`,
                    {
                        method: "PUT",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(task),
                    }
                );

                if (response.status === 401) {
                    router.push(PATHS.login);
                    return;
                }

                const responseJSON = await response.json();
                console.log({ responseJSON });

                if (responseJSON.tasks && responseJSON.tasks.length >= 0) {
                    setTasks(responseJSON.tasks);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.headerWrapper}>
                <button type="button" onClick={handleGoBackOneDay}>
                    {"<"}
                </button>
                {moment(currentDayString)
                    .startOf("day")
                    .format("dddd, MMMM Do YYYY")}
                <button type="button" onClick={handleAdvanceOneDay}>
                    {">"}
                </button>
            </div>
            {/* {currentDay?.taskQueues.length === 1 && (
                <button type="button" onClick={handleViewTaskPlaylist}>
                    view task playlist
                </button>
            )} */}
            {/* <TasksView isPriority /> */}
            <TasksView
                currentDayString={currentDayString}
                tasks={tasks}
                onSubmitNewTask={handleCreateNewTask}
                onEditTask={handleEditTask}
                onMoveTasksToDay={handleMoveTasksToDay}
                onAddTaskToTaskQueue={handleAddTaskToTaskQueue}
            />
            {/* <DayNote /> */}
        </div>
    );
};

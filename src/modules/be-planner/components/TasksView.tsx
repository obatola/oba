import { useState } from "react";
import styles from "../../planner/styles/TaskView.module.css";
import { IBETask } from "../types";
import { ITaskProps, Task } from "./Task";

interface ITaskViewProps extends INewTaskInputProps, Omit<ITaskProps, "task"> {
    tasks: IBETask[];
    isPriority?: boolean;
}

export const TasksView = ({
    tasks,
    isPriority,
    onSubmitNewTask,
    ...rest
}: ITaskViewProps) => (
    <div className={styles.wrapper}>
        <h2>{isPriority ? "Priorities" : "Tasks"}</h2>
        <div className={styles.tasksWrapper}>
            {tasks.map((task) => (
                <Task key={task.task_id} task={task} {...rest} />
            ))}
            <NewTaskInput onSubmitNewTask={onSubmitNewTask} />
        </div>
    </div>
);

interface INewTaskInputProps {
    onSubmitNewTask: (taskName: string) => void;
}

const NewTaskInput = ({ onSubmitNewTask: onSubmit }: INewTaskInputProps) => {
    const [name, setName] = useState<string>("");

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { value } = event.target as unknown as {
            value: string;
        };
        setName(value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setName("");
        onSubmit(name);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="newTask"
                title="newTask"
                onChange={handleChange}
                value={name}
                placeholder="...walk the dog"
            />
        </form>
    );
};

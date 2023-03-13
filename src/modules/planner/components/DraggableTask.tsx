import { Reorder, useDragControls } from "framer-motion";
import { ITaskProps, Task } from "./Task";

type IProps = Omit<ITaskProps, "draggableControl">;

export function DraggableTask(props: IProps) {
    const controls = useDragControls();

    return (
        <Reorder.Item
            value={props.id}
            id={props.id}
            dragListener={false}
            dragControls={controls}
        >
            <Task {...props} draggableControl={(e) => controls.start(e)} />
        </Reorder.Item>
    );
}

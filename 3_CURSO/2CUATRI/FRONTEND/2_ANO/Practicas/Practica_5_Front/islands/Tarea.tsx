import { tasktype } from "../types.ts";

type Props = {
    task:tasktype;
    };

const Tarea = (props:Props) => {
    return (
        <div>
            <div>{props.task.name}</div>
            <div>{props.task.state}</div>
        </div>
    );
}

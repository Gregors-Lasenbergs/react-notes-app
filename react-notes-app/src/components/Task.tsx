type TaskProps = {
    taskName: string;
    taskDescription: string;
}
export const Task = (props: TaskProps) => {
    return (
        <div className={"task"}>
            <h2> {props.taskName} </h2>
            <p> {props.taskDescription} </p>
        </div>
    );
};
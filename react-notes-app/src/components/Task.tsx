import {TodoTask} from "../App.tsx";

export const Task = (props: TodoTask) => {
    
    const deleteCard = () => {
        props.onTaskDelete(props.id);
    }

    function editCard() {
        props.onTaskEdit(props.id);
    }

    return (
        <div className={"task"}>
            <button onClick={deleteCard}>Delete</button>
            <button onClick={editCard}>Edit</button>
            <h2> {props.name} </h2>
            <p> {props.info} </p>
        </div>
    );
};
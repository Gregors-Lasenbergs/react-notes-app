import './CreateTask.css';
import {useRef} from "react";
import {TodoTask} from "../App.tsx";

type TaskCreateFieldProps = {
    onTaskCreate: (task: TodoTask) => void;
}

export const CreateTask = (props: TaskCreateFieldProps) => {

    const nameRef = useRef<HTMLInputElement>(null);
    const infoRef = useRef<HTMLInputElement>(null);
    
    const handleTaskCreate = () => {
        if (nameRef.current && infoRef.current) {
            createTask(nameRef.current.value, infoRef.current.value);
        }
    }

    const createTask = (name: string, info: string) => {
        const task: TodoTask = {
            name: name,
            info: info,
            id: Date.now(),
            onTaskEdit: () => {},
            onTaskDelete: () => {}
        };
        props.onTaskCreate(task);
    }
    
    return (
        <div className={"ask-create-field-container"}>
            <label htmlFor="">
                Task name
                <input className={"task-name"} type="text" ref={nameRef}/>
            </label>
            <label>
                Task description
                <input className={"task-info"} type="text" ref={infoRef}/>
            </label>
            <button onClick={handleTaskCreate}>Create</button>
        </div>
    );
};

export default CreateTask;
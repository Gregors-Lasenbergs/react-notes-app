import './App.css'
import {Task} from "./components/Task.tsx";
import {CreateTask} from "./components/CreateTask.tsx";
import {useState} from "react";
import axios from "axios";

type TodoTask = {
    name: string;
    info: string;
    id: number;
}

function App() {
    const [tasks, setTasks] = useState<TodoTask[]>([]);

    const handleTaskCreated = (task: TodoTask) => {
        const tasksArr = [...tasks];
        tasksArr.push(task);
        setTasks(tasksArr);
        console.log(task);
    }
    
    return (
      <div className={"app-container"}>
          <h1>Notes app</h1>
          <CreateTask onTaskCreate={handleTaskCreated}/>
          <div className={"taskContainer"}>
              {tasks.map((task) => (
                  <Task key={task.id} taskName={task.name} taskDescription={task.info}/>
              ))}
          </div>
      </div>
  )
}

// Import all cards from the database
const getAllCards = async () => {
    const taskUrl = "http://localhost:3004/tasks";
    let tasks: TodoTask[] = [];

    try {
        const response = await axios.get(taskUrl);
        response.data.forEach((element: TodoTask) => {
            tasks.push(element);
        });
        console.log("Tasks received successfully", response.data);
        return tasks;
    } catch (error) {
        console.error("Failed to get tasks", error);
        return [];
    }
}

// Add a card element to the DOM

const loadAllCardsFromDb = (tasks: Promise<TodoTask[] | any[]>) => {
    tasks.then((tasks: TodoTask[]) => {
        tasks.forEach((card: TodoTask) => {
            addCardElement(card)
        })
    })
};

loadAllCardsFromDb(getAllCards())
export default App

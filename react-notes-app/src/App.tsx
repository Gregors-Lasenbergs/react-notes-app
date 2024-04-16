import './App.css'
import {Task} from "./components/Task.tsx";
import {CreateTask} from "./components/CreateTask.tsx";
import {useState, useEffect } from "react";
import axios from "axios";

export type TodoTask = {
    name: string;
    info: string;
    id: number;
    onTaskDelete: (id: number) => void;
    onTaskEdit: (id: number) => void;
}

function App() {
    const [tasks, setTasks] = useState<TodoTask[]>([]);

    const handleTaskCreated = async (task: TodoTask) => {
        try {
            addCardToDB(task);
            setTasks(prevTasks => [...prevTasks, task]);
            console.log("Task added successfully");
        } catch (error) {
            console.error("Failed to add task", error);
        }
    };
    
    const addCardToDB = (newTask: TodoTask) => {
        const taskUrl = 'http://localhost:3004/tasks';
            axios.post(taskUrl, {
                id: newTask.id,
                name: newTask.name,
                info: newTask.info,
                onTaskDelete: newTask.onTaskDelete,
                onTaskEdit: newTask.onTaskEdit
            }).then((response) => {
                console.log("Task added successfully", response.data);
            }).catch((error) => {
                console.error("Failed to add card to DataBase", error);
            });
    };

    const handleTaskDelete = async (id: number) => {
        try {
            await deleteCardFromDb(id);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
            console.log("Task deleted successfully");
        } catch (error) {
            console.error("Failed to delete task", error);
        }
    };
    
    const handleTaskEdit = async (id: number) => {
        const taskToEdit = tasks.find(task => task.id === id);
        if (taskToEdit) {
            const newTask = {
                name: prompt('Enter new name', taskToEdit.name) || '',
                info: prompt('Enter new info', taskToEdit.info) || '',
                id: taskToEdit.id,
                onTaskDelete: taskToEdit.onTaskDelete,
                onTaskEdit: taskToEdit.onTaskEdit
            };
            try {
                editCardInDB(id, newTask);
                setTasks(prevTasks => prevTasks.map(task => task.id === id ? newTask : task));
                console.log("Task edited successfully");
            } catch (error) {
                console.error("Failed to edit task", error);
            }
        }
    }
    
    const editCardInDB = (id: number, newTask: TodoTask) => {
        const taskUrl = `http://localhost:3004/tasks/${id}`;
        axios.put(taskUrl, {
            name: newTask.name,
            info: newTask.info,
            onTaskDelete: newTask.onTaskDelete,
            onTaskEdit: newTask.onTaskEdit
        }).then((response) => {
            console.log("Task edited successfully", response.data);
        }).catch((error) => {
            console.error("Failed to edit task", error);
        });
    }

    const deleteCardFromDb = async (id: number) => {
        const taskUrl = `http://localhost:3004/tasks/${id}`;
        try {
            const response = await axios.delete(taskUrl);
            console.log("Task deleted successfully", response.data);
        } catch (error) {
            console.error("Failed to delete task", error);
        }
    };

    // Import all cards from the database
    const getAllCards = async () => {
        const taskUrl = 'http://localhost:3004/tasks';

        try {
            const response = await axios.get(taskUrl);
            console.log('Tasks received successfully', response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to get tasks', error);
            return [];
        }
    };

// Add a card element to the DOM
    const loadAllCardsFromDb = async () => {
        const tasksFromDb = await getAllCards();
        console.log("Tasks from DB", tasksFromDb);
        tasksFromDb.forEach((task: TodoTask) => {
            handleTaskCreated(task);
        });
    };
    useEffect(() => {
        loadAllCardsFromDb();
    }, []);
    
    return (
      <div className={"app-container"}>
          <h1>Notes app</h1>
          <CreateTask onTaskCreate={handleTaskCreated}/>
          <div className={'taskContainer'}>
              {tasks.map(task => (
                  <Task
                      key={task.id}
                      name={task.name}
                      info={task.info}
                      id={task.id}
                      onTaskDelete={handleTaskDelete}
                      onTaskEdit={handleTaskEdit}
                  />
              ))}
          </div>
      </div>
    )
}


export default App

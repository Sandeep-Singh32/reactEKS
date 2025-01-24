import { useState, useEffect, useRef } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import * as api from "./api"; // Import API methods

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  // Fetch tasks from the backend
  useEffect(() => {
    const getTasks = async () => {
      try {
        const fetchedTasks = await api.fetchTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getTasks();
  }, []);

  async function toggleTaskCompleted(id) {
    try {
      const task = tasks.find((task) => task.id === id);
      const updatedTask = { ...task, completed: !task.completed };
      await api.updateTask(id, updatedTask);

      const updatedTasks = tasks.map((task) =>
        task.id === id ? updatedTask : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  }

  async function deleteTask(id) {
    try {
      await api.deleteTask(id);
      const remainingTasks = tasks.filter((task) => task.id !== id);
      setTasks(remainingTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  async function editTask(id, newName) {
    try {
      const task = tasks.find((task) => task.id === id);
      const updatedTask = { ...task, name: newName };
      await api.updateTask(id, updatedTask);

      const editedTaskList = tasks.map((task) =>
        task.id === id ? updatedTask : task
      );
      setTasks(editedTaskList);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  async function addTask(name) {
    try {
      const newTask = { name, completed: false };
      const createdTask = await api.createTask(newTask);
      setTasks([...tasks, createdTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const listHeadingRef = useRef(null);
  const prevTaskLength = useRef(tasks.length);

  useEffect(() => {
    if (tasks.length < prevTaskLength.current) {
      listHeadingRef.current.focus();
    }
    prevTaskLength.current = tasks.length;
  }, [tasks]);

  return (
    <div className="todoapp stack-large">
      <h1>TODO</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        aria-labelledby="list-heading"
        className="todo-list stack-large stack-exception"
        role="list"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;

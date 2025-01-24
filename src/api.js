// require('dotenv').config();
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const fetchTasks = async () => {
  try {
    const response = await fetch(BASE_URL + "/todo");
    if (!response.ok) throw new Error("Failed to fetch tasks");
    return await response.json();
  } catch (error) {
    console.error("Error in fetchTasks:", error);
    throw error;
  }
};

export const createTask = async (task) => {
  try {
    const response = await fetch(BASE_URL + "/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error("Failed to create task");
    return await response.json();
  } catch (error) {
    console.error("Error in createTask:", error);
    throw error;
  }
};

export const updateTask = async (id, updatedTask) => {
  try {
    const response = await fetch(`${BASE_URL + "/todo"}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    if (!response.ok) throw new Error("Failed to update task");
    return await response.json();
  } catch (error) {
    console.error("Error in updateTask:", error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${BASE_URL + "/todo"}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete task");
    return await response.json();
  } catch (error) {
    console.error("Error in deleteTask:", error);
    throw error;
  }
};

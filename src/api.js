// require('dotenv').config();
let BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
if (!BASE_URL) {
  console.log("No VITE_REACT_APP_BASE_URL found in.env, using default URL");
  BASE_URL =
    "http://a3b92c1b26a1f488d9aadf397b15c25e-410735805.us-east-1.elb.amazonaws.com";
}

export const fetchTasks = async () => {
  try {
    const envs = process.env.VITE_REACT_APP_BASE_URL;
    console.log("fetch tasks ..", BASE_URL);
    console.log("envs ", envs, " --------");

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
    console.log("createTask tasks ..", BASE_URL, "-----", task);
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
    console.log("updateTask tasks ..", BASE_URL, "---", updatedTask);
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
    console.log("delete tasks ..", BASE_URL, "---", id);
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

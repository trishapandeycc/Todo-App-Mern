import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/todos",
});

// Get all todos
export const getTodos = () => API.get("/");

// Create a todo
export const createTodo = (todo) => API.post("/", todo);

// Delete a todo
export const deleteTodo = (id) => API.delete(`/${id}`);

// Update a todo
export const updateTodo = (id, todo) => API.put(`/${id}`, todo);

export default API;
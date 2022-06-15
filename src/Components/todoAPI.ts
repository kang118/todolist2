import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/",
});

export const getList = async () => {
  let res = await instance.get("/api");
  return res.data;
};

export const addTodo = async (todo) => {
  let res = await instance.post("/api/create", { content: todo });
  return data;
};

export const updateTodo = async (todo) => {
  const { data } = await instance.patch("/todo", { todo });
  return data;
};
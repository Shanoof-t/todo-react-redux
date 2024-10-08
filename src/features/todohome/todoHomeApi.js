import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TUDO_URL } from "../../api/api";
export const fetchTask = createAsyncThunk("todohome/fetchTask", async () => {
  const res = await axios.get(TUDO_URL);
  return res.data;
});

export const addTask = createAsyncThunk("todo/addTask", async (task) => {
  const res = await axios.post(TUDO_URL, task);
  return res.data;
});

export const addMark = createAsyncThunk(
  "todo/addMark",
  async ({ id, todoData }) => {
    const task = todoData.data.find((task) => task.id === id);
    const res = await axios.patch(`${TUDO_URL}/${id}`, { mark: !task.mark });
    return res.data;
  }
);

export const deleteTask = createAsyncThunk("todo/deleteTask", async (id) => {
  const res = axios.delete(`${TUDO_URL}/${id}`);
  return res.data;
});

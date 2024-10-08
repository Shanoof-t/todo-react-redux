import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TUDO_URL } from "../../api/api";

export const fetchTaskDetails = createAsyncThunk(
  "tododedtails/fetchTaskDetails",
  async (id) => {
    const res = await axios.get(`${TUDO_URL}/${id}`);
    return res.data;
  }
);
export const editTask = createAsyncThunk(
  "tododetails/editTask",
  async ({ id, data }) => {
    const res = await axios.patch(`${TUDO_URL}/${id}`, data);
    return res.data;
  }
);

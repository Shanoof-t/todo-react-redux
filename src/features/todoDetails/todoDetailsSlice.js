import { createSlice } from "@reduxjs/toolkit";
import { editTask, fetchTaskDetails } from "./todoDetailsApi";

const initialState = {
  loading: false,
  task: "",
  mark: false,
  error: "",
};
const todoDetailsSlice = createSlice({
  name: "tododetails",
  initialState,
  reducers: {
    loadInput: (state, action) => {
      state.task = action.payload;
    },
    setMark: (state, action) => {
      state.mark = action.payload;
    },
  },
  extraReducers: (biulder) => {
    biulder
      .addCase(fetchTaskDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTaskDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload.task;
        state.mark = action.payload.mark;
      })
      .addCase(fetchTaskDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload.task;
        state.mark = action.payload.mark;
      });
  },
});

export const { loadInput, setMark } = todoDetailsSlice.actions;
export default todoDetailsSlice.reducer;

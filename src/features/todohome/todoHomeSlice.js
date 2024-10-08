import { createSlice } from "@reduxjs/toolkit";
import { addMark, addTask, deleteTask, fetchTask } from "./todoHomeApi";

const initialState = {
  initialLoading: false,
  data: [],
  initialError: "",
  task: "",
  mark: false,
  addLoading: false,
  addError: "",
  markError: "",
  deleteError: "",
};
const todoHomeSlice = createSlice({
  name: "todohome",
  initialState,
  reducers: {
    loaded: (state, action) => {
      state.task = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTask.pending, (state) => {
        state.initialLoading = true;
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.initialLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.initialLoading = false;
        state.initialError = action.error.message;
      })
      .addCase(addTask.pending, (state) => {
        state.addLoading = true;
      })
      .addCase(addTask.fulfilled, (state) => {
        state.task = "";
        state.mark = false;
        state.addLoading = false;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.addError = action.error.message;
      })
      .addCase(addMark.fulfilled, (state) => {
        state.mark = false;
      })
      .addCase(addMark.rejected, (state) => {
        state.markError = "Mark Error";
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.deleteError = action.error.message;
      });
  },
});

export const { loaded, onMark } = todoHomeSlice.actions;
export default todoHomeSlice.reducer;

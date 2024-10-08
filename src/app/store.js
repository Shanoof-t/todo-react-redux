import { configureStore } from "@reduxjs/toolkit";
import todoHome from "../features/todohome/todoHomeSlice";
const store = configureStore({
  reducer: {
    todoHome,
  },
});

export default store;

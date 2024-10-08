import { configureStore } from "@reduxjs/toolkit";
import todoHome from "../features/todohome/todoHomeSlice";
import todoDetails from "../features/todoDetails/todoDetailsSlice";
const store = configureStore({
  reducer: {
    todoHome,
    todoDetails,
  },
});

export default store;

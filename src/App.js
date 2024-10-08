import logo from "./logo.svg";
import "./App.css";
import TodoHome from "./pages/TodoHome";
import { Route, Routes } from "react-router-dom";
import TaskDetails from "./pages/TaskDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoHome />} />
      <Route path="task/:id" element={<TaskDetails />} />
    </Routes>
  );
}

export default App;

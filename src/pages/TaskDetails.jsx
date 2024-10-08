import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addTask, fetchTask } from "../features/todohome/todoHomeApi";
import { loaded } from "../features/todohome/todoHomeSlice";
import {
  editTask,
  fetchTaskDetails,
} from "../features/todoDetails/todoDetailsApi";
import { loadInput, setMark } from "../features/todoDetails/todoDetailsSlice";

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(fetchTaskDetails(id));
  }, [dispatch, id]);

  const task = useSelector((state) => state.todoDetails);
  console.log(task);

  const handleInputChange = (e) => {
    const val = e.target.value;
    dispatch(loadInput(val));
  };

  const handleEdit = () => {
    const data = {
      task: task.task,
      mark: task.mark,
    };
    dispatch(editTask({ id, data })).then(() => {
      alert("Edited");
      navigate(-1);
    });
  };

  const handleMark = (e) => {
    const val = e.target.checked;
    dispatch(setMark(val));
  };

  if (!task) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-3xl font-bold text-red-600 text-center mb-4">
            Task not found!
          </h1>
          <button
            onClick={handleGoBack}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-red-600 text-center mb-4">
          Task Details
        </h1>
        {task.error && (
          <h1 className="text-center text-red-600">{task.error}</h1>
        )}
        {task.loading && (
          <h1 className="text-center">Loading...</h1>
        )}
        <div className="text-gray-800 mb-6">
          <h2 className="text-xl font-semibold mb-2">What is to be done?</h2>
          <div className="flex mb-4">
            <input
              type="text"
              value={task.task}
              onChange={handleInputChange}
              className="p-4 border border-gray-300 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter task"
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              onChange={handleMark}
              checked={task.mark}
              className="mr-2 h-5 w-5"
            />
            <label className="text-gray-700">Task finished?</label>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleGoBack}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Go Back
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            onClick={handleEdit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;

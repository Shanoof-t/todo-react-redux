import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMark,
  addTask,
  deleteTask,
  fetchTask,
} from "../features/todohome/todoHomeApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { loaded, onMark } from "../features/todohome/todoHomeSlice";

function TodoHome() {
  const dispatch = useDispatch();
  const todoData = useSelector((state) => state.todoHome);
  const handleInputChange = (e) => {
    const val = e.target.value;
    dispatch(loaded(val));
  };
  const handleAdd = () => {
    const task = {
      task: todoData.task,
      mark: todoData.mark,
    };
    dispatch(addTask(task)).then(() => {
      dispatch(fetchTask());
    });
  };

  useEffect(() => {
    dispatch(fetchTask());
  }, []);

  const handleMark = (id) => {
    dispatch(addMark({ id, todoData })).then(() => {
      dispatch(fetchTask());
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id)).then(() => {
      dispatch(fetchTask());
    });
  };
  return (
    <div className="bg-gray-900 w-full h-screen flex justify-center items-center">
      <div className="p-10 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl text-red-600 font-bold text-center mb-6">
          To-Do List
        </h1>
        {todoData.addLoading && <h5 className="text-center">Loading....</h5>}
        <div className="flex mb-4">
          <input
            type="text"
            value={todoData.task}
            onChange={handleInputChange}
            className="p-4 border border-gray-300 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Enter task"
          />
          <button
            className="bg-red-600 text-white p-4 rounded-r-lg hover:bg-red-700 transition"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
        {todoData.initialLoading && <h1 className="text-center">Loading...</h1>}
        {todoData.initialError && (
          <h1 className="text-center text-red-600">Something went wrong</h1>
        )}
        {todoData.addError && (
          <h1 className="text-center text-red-600">Something went wrong</h1>
        )}
        {todoData.markError && (
          <h1 className="text-center text-red-600">{todoData.markError}</h1>
        )}
        {todoData.deleteError && (
          <h1 className="text-center text-red-600">{todoData.deleteError}</h1>
        )}
        <h4 className="font-bold mb-2">Tasks</h4>
        {todoData.data.map((task) => (
          <div className="flex items-center mb-4" key={task.id}>
            <div className="flex-shrink-0">
              {task.mark ? (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="w-5 h-5 text-red-600 cursor-pointer"
                  onClick={() => handleMark(task.id)}
                />
              ) : (
                <div
                  className="w-5 h-5 border border-gray-300 rounded-full cursor-pointer"
                  onClick={() => handleMark(task.id)}
                ></div>
              )}
            </div>
            <div
              className="flex-1 ms-2"
              //   onClick={() => handleNavigate(task.id)}
            >
              {task.mark ? (
                <h6 className="line-through text-gray-500">{task.task}</h6>
              ) : (
                <h6 className="text-gray-800">{task.task}</h6>
              )}
            </div>
            <div className="flex-shrink-0 ms-2">
              <FontAwesomeIcon
                icon={faXmark}
                className="text-red-600 cursor-pointer hover:text-red-700 transition"
                onClick={() => handleDelete(task.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoHome;

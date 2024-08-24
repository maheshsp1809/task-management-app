import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addTask, updateTask, fetchTasks } from "../store/taskSlice";

function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const task = useSelector((state) =>
    state.tasks.list.find((t) => t.id === id)
  );
  const status = useSelector((state) => state.tasks.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (id && task) {
      setTitle(task.title);
      setCompleted(task.completed);
    }
  }, [id, task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (id) {
      dispatch(updateTask({ id, title, completed })).then(() => {
        navigate(`/task/${id}`);
      });
    } else {
      dispatch(addTask({ title, completed })).then(() => {
        navigate("/");
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Task Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="mr-2"
          />
          <span className="text-gray-700 text-sm font-bold">Completed</span>
        </label>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {id ? "Update Task" : "Add Task"}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;

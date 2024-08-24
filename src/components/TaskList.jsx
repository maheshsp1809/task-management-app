import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTasks } from "../store/taskSlice";

function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.list);
  const status = useSelector((state) => state.tasks.status);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Task List</h2>
      <div className="mb-4">
        <Link
          to="/add"
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Add New Task
        </Link>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>Error loading tasks</div>}
      <ul className="mt-4">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="bg-gray-100 p-4 mb-2 rounded flex justify-between items-center"
          >
            <Link
              to={`/task/${task.id}`}
              className={task.completed ? "line-through" : ""}
            >
              {task.title}
            </Link>
            <div>
              <Link
                to={`/edit/${task.id}`}
                className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;

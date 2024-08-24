import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchTasks, deleteTask, updateTask } from "../store/taskSlice";

function TaskDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const task = useSelector((state) =>
    state.tasks.list.find((t) => t.id === id)
  );
  const status = useSelector((state) => state.tasks.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  if (!task) return <div>Loading...</div>;

  const handleDelete = () => {
    dispatch(deleteTask(id)).then(() => {
      navigate("/");
    });
  };

  const handleToggleComplete = () => {
    dispatch(updateTask({ ...task, completed: !task.completed }));
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
      <p className="mb-4">{task.description}</p>
      <p className="mb-4">Status: {task.completed ? "Completed" : "Pending"}</p>
      <div className="flex space-x-2">
        <button
          onClick={handleToggleComplete}
          className={`px-4 py-2 rounded ${
            task.completed ? "bg-yellow-500" : "bg-green-500"
          } text-white`}
        >
          {task.completed ? "Mark as Pending" : "Mark as Completed"}
        </button>
        <Link
          to={`/edit/${task.id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
      <Link to="/" className="block mt-4 text-blue-500">
        Back to List
      </Link>
    </div>
  );
}

export default TaskDetails;

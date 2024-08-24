import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setTasks } from "../tasksSlice";

const Filter = ({ tasks }) => {
  const [filter, setFilter] = useState("All");
  const dispatch = useDispatch();

  const handleFilterChange = (status) => {
    setFilter(status);
    const filteredTasks =
      status === "All"
        ? tasks
        : tasks.filter((task) =>
            status === "Completed" ? task.completed : !task.completed
          );
    dispatch(setTasks(filteredTasks));
  };

  return (
    <div className="mb-4">
      <button onClick={() => handleFilterChange("All")} className="mr-2">
        All
      </button>
      <button onClick={() => handleFilterChange("Completed")} className="mr-2">
        Completed
      </button>
      <button onClick={() => handleFilterChange("Pending")} className="mr-2">
        Pending
      </button>
    </div>
  );
};

export default Filter;

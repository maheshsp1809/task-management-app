import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";
import TaskForm from "./components/TaskForm";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Task Management App</h1>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/task/:id" element={<TaskDetails />} />
            <Route path="/add" element={<TaskForm />} />
            <Route path="/edit/:id" element={<TaskForm />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

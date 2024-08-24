import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import TaskForm from "../components/TaskForm";

const mockStore = configureStore([]);

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
}));

describe("TaskForm", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      tasks: {
        list: [],
        status: "idle",
      },
    });
  });

  test("renders TaskForm component", () => {
    render(
      <Provider store={store}>
        <Router>
          <TaskForm />
        </Router>
      </Provider>
    );

    expect(screen.getByLabelText(/Task Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Task Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Completed/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Task/i })
    ).toBeInTheDocument();
  });

  test("validates form inputs", async () => {
    render(
      <Provider store={store}>
        <Router>
          <TaskForm />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /Add Task/i }));

    expect(await screen.findByText(/Title is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Description is required/i)
    ).toBeInTheDocument();
  });
});

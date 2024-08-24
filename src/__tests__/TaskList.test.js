import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import TaskList from "../components/TaskList";

const mockStore = configureStore([]);

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
}));

describe("TaskList", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      tasks: {
        list: [
          {
            id: "1",
            title: "Task 1",
            description: "Description 1",
            completed: false,
          },
          {
            id: 2,
            title: "Task 2",
            description: "Description 2",
            completed: true,
          },
        ],
        status: "succeeded",
      },
    });
  });

  test("renders TaskList component", () => {
    render(
      <Provider store={store}>
        <Router>
          <TaskList />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Task List/i)).toBeInTheDocument();
    expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Task 2/i)).toBeInTheDocument();
  });
});

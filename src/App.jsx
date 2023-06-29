import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckCircle,
  faCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);

  library.add(faCheckCircle, faCircle, faTrash);

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = (title) => {
    const newTask = {
      id: tasks.length + 1,
      title,
      completed: false,
    };
    setTasks([...tasks, newTask]);

    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
  };

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

    fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    });
  };

  return (
    <div className="task-list bg-gray-800">
      <div className="max-w-md mx-auto p-4 bg-gray-800">
        <h2 className="text-center text-white text-2xl font-bold mb-5">
          Win The Day!
        </h2>
        {tasks.length === 0 ? (
          <p className="text-white my-4">
            No tasks available. Add a task to get started!
          </p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`flex items-center mb-2 p-2 rounded ${
                  task.completed ? "bg-gray-300" : "bg-white"
                }`}
                onClick={() => toggleTask(task.id)}
              >
                <span className="mr-2">
                  <FontAwesomeIcon
                    icon={task.completed ? "check-circle" : "circle"}
                    className="text-blue-500"
                  />
                </span>
                <span className="flex-grow">{task.title}</span>
                <span
                  className="cursor-pointer"
                  onClick={() => deleteTask(task.id)}
                >
                  <FontAwesomeIcon icon="trash" className="text-red-500" />
                </span>
              </li>
            ))}
          </ul>
        )}
        <TaskForm addTask={addTask} />
      </div>
    </div>
  );
};

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== "") {
      addTask(title);
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mt-5">
      <input
        className="bg-gray-200 flex-grow rounded-l py-2 px-3 mr-2"
        type="text"
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-r"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

TaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default TodoList;

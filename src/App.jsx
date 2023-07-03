import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckCircle,
  faCircle,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);

  library.add(faCheckCircle, faCircle, faTrash, faEdit);

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((response) => response.json())
      .then((data) => {
        const updatedTasks = data.map((task) => {
          const taskStatus = localStorage.getItem(`taskStatus-${task.id}`);
          return {
            ...task,
            status: taskStatus ? JSON.parse(taskStatus) : false,
          };
        });
        setTasks(updatedTasks);
      });
  }, []);

  const addTask = (title) => {
    const currentDate = new Date();
    const newTask = {
      id: tasks.length + 1,
      title,
      completed: false,
      dateCreated: currentDate.toLocaleDateString(),
      timeCreated: currentDate.toLocaleTimeString(),
      status: false,
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
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const updatedTask = { ...task, status: !task.status };
        fetch(`http://localhost:3000/tasks/${taskId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: updatedTask.status }),
        });
        localStorage.setItem(
          `taskStatus-${taskId}`,
          JSON.stringify(updatedTask.status)
        );
        return updatedTask;
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

    fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    });
    localStorage.removeItem(`taskStatus-${taskId}`);
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
                  task.status ? "bg-gray-300" : "bg-white"
                } ${task.status ? "line-through" : ""}`}
              >
                <span className="mr-2">
                  <FontAwesomeIcon
                    icon={task.status ? "check-circle" : "circle"}
                    className="text-blue-500"
                    onClick={() => toggleTask(task.id)}
                  />
                </span>
                <span className="flex-grow">
                  <span>{task.title}</span>
                </span>
                <span
                  className="cursor-pointer mx-2"
                  onClick={() => deleteTask(task.id)}
                >
                  <FontAwesomeIcon icon="trash" className="text-red-500" />
                </span>
                <Link to={`/details/${task.id}`}>
                  <FontAwesomeIcon icon="edit" className="text-blue-500" />
                </Link>
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

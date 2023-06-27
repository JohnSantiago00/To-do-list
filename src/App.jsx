import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckCircle,
  faCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useState } from "react";
import "./index.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);

  library.add(faCheckCircle, faCircle, faTrash);

  const addTask = (title) => {
    const newTask = {
      id: tasks.length + 1,
      title,
      completed: false,
    };
    setTasks([...tasks, newTask]);
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
  };

  return (
    <div className="task-list">
      <h2>Win The Day!</h2>
      {tasks.length === 0 ? (
        <p className="no-tasks">
          No tasks available. Add a task to get started!
        </p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`task-item ${task.completed ? "completed" : ""}`}
              onClick={() => toggleTask(task.id)}
            >
              <span className="task-icon">
                <FontAwesomeIcon
                  icon={task.completed ? "check-circle" : "circle"}
                />
              </span>
              <span className="task-title">{task.title}</span>
              <span className="delete-icon" onClick={() => deleteTask(task.id)}>
                <FontAwesomeIcon icon="trash" />
              </span>
            </li>
          ))}
        </ul>
      )}
      <TaskForm addTask={addTask} />
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
    <form onSubmit={handleSubmit}>
      <input
        className="submit-Box"
        type="text"
        placeholder=" Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="submit-Btn" type="submit">
        Add
      </button>
    </form>
  );
};

TaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default TodoList;

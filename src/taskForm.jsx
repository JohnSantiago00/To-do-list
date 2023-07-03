import PropTypes from "prop-types";
import { useState } from "react";

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const newTask = {
      id: currentDate.getTime(),
      title,
      completed: false,
      dateCreated: currentDate.toLocaleDateString(),
      timeCreated: currentDate.toLocaleTimeString(),
      status: false,
    };

    localStorage.setItem(`task-${newTask.id}`, JSON.stringify(newTask));
    onAddTask(newTask);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

TaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default TaskForm;

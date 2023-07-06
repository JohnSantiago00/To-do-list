import PropTypes from "prop-types";
import { useState } from "react";

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Name: TaskForm
// Input: Object (props: onAddTask)
// Output: JSX
// Purpose: Renders a form for adding a new task
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // Name: handleSubmit
  // Input: Event object
  // Output: None
  // Purpose: Handles the form submission and adds a new task
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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

// Prop Types
TaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default TaskForm;

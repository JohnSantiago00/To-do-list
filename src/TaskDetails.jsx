import { faEdit, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/tasks/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTask(data);
        setUpdatedTitle(data.title);
        setStatus(data.status);
      });
  }, [id]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    const updatedTask = {
      ...task,
      title: updatedTitle,
    };

    setTask(updatedTask);

    localStorage.setItem(`task-${id}`, JSON.stringify(updatedTask));
    localStorage.setItem(`taskStatus-${id}`, JSON.stringify(status));

    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: updatedTitle }),
    });

    setEditing(false);
  };

  const handleInputChange = (e) => {
    setUpdatedTitle(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  if (!task) {
    return <p>Loading task details...</p>;
  }

  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg bg-white rounded-lg shadow-lg p-13">
        {editing ? (
          <>
            <input
              type="text"
              className="mb-4 border-b-2 border-gray-500 focus:outline-none"
              value={updatedTitle}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-4">{task.title}</h2>
            <p className="text-gray-700">ID: {task.id}</p>
            <p className="text-gray-700">Date Created: {task.dateCreated}</p>
            <p className="text-gray-700">Time Created: {task.timeCreated}</p>
            <p className="text-gray-700">
              Status: {status ? "Completed" : "Incomplete"}
            </p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleEdit}
              >
                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                Edit
              </button>
              <Link
                to="/"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;

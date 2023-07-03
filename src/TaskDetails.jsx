import { faEdit, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/tasks/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTask(data);
        setUpdatedTitle(data.title);
      });
  }, [id]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    // Perform save operation with updatedTitle
    setTask((prevTask) => ({
      ...prevTask,
      title: updatedTitle,
    }));
    setEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const handleGoHome = () => {
    // No need to use window.location or useNavigate
  };

  if (!task) {
    return <p>Loading task details...</p>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md rounded overflow-hidden shadow-lg bg-white p-8">
        {editing ? (
          <>
            <input
              type="text"
              className="mb-4 border-b-2 border-gray-500 focus:outline-none"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              onKeyPress={handleKeyPress}
            />
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
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">{task.title}</h2>
            <p className="text-gray-700">ID: {task.id}</p>
            <p className="text-gray-700">Date Created: {task.dateCreated}</p>
            <p className="text-gray-700">Time Created: {task.timeCreated}</p>
            <p className="text-gray-700">
              Status: {task.status ? "Completed" : "Incomplete"}
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleEdit}
            >
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              Edit
            </button>
            <Link
              to="/"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Home
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;

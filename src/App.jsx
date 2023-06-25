import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";

const TodoList = () => {
  // Sample task data
  const tasks = [
    { id: 1, title: "Go to the gym", completed: true },
    { id: 2, title: "Do Laundry", completed: false },
    { id: 3, title: "Read 30 min", completed: false },
    { id: 4, title: "Clean the house", completed: false },
    { id: 5, title: "Work on porject", completed: false },
  ];

  // Register the icons
  library.add(faCheckCircle, faCircle);

  return (
    <div className="task-list">
      <h2>Win The Day!</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            {task.completed ? (
              <span className="task-icon">
                <FontAwesomeIcon icon="check-circle" />
              </span>
            ) : (
              <span className="task-icon">
                <FontAwesomeIcon icon="circle" />
              </span>
            )}
            <span className="task-title">{task.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

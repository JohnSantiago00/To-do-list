import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App.jsx";
import TaskDetails from "./TaskDetails.jsx";

import "./index.css";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/details/:id" element={<TaskDetails />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);

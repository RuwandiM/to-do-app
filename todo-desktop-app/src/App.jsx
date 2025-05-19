import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <main className="container">
      <div>
        <h3>To-Do List 🗓️</h3>
      </div>
      <div className="inputContainer">
        <input
          type="text"
          placeholder="Add your task here"
          onChange={(e) => setName(e.target.value)}
          className="inputField"
        />
        <button className="addButton">Add new</button>
      </div>
      <div className="taskList">
        {[...Array(5)].map((_, i) => (
          <div key={i}>
            <div className="taskItem">
              <input 
                type="checkbox" 
                className="taskCheckbox" 
                checked={isCompleted}
              />
              <span className={`tasktext ${isCompleted ? "completed" : ""}`}>This is {i + 1} task I need to be completed.</span>
              <button className="deleteButton">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
            <hr className="customhr" />
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;

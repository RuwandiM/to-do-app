import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [title, setTitle] = useState("");
  const [todoList, setTodoLIst] = useState([]);

  function fetchTodoList() {
    invoke("get_todos")
      .then((response) => {
        console.log("Response from Rust:", response);
        setTodoLIst(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function addTodo() {
    invoke("add_todo", {title})
      .then(() => {
        setTitle("");
        fetchTodoList();
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
      });
  }

  useEffect(() => {
    fetchTodoList();
  })

  return (
    <main className="container">
      <div>
        <h3>To-Do List 🗓️</h3>
      </div>
      <div className="inputContainer">
        <input
          type="text"
          placeholder="Add your task here"
          onChange={(e) => setTitle(e.target.value)}
          className="inputField"
          value={title}
        />
        <button className="addButton" onClick={() => addTodo()}>Add new</button>
      </div>
      <div className="taskList">
        {todoList.map((todo) => (
          <div key={todo.id}>
            <div className="taskItem">
              <div>
                <input 
                  type="checkbox" 
                  className="taskCheckbox" 
                  checked={isCompleted}
                />
                <span className={`tasktext ${isCompleted ? "completed" : ""}`}>{todo.title}</span>
              </div>
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

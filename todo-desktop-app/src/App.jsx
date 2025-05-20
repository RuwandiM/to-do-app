import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function App() {
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

  function deleteTodo(id) {
    invoke("delete_todo", {id})
      .then(() => {
        fetchTodoList();
      })
      .catch((error) => {
        console.error("Error delete todo :", error);
      })
  }

  function toggleTodo(id) {
    invoke("toggle_todo", {id})
      .then(() => {
        fetchTodoList();
      })
      .catch((error) => {
        console.log("Error toggling todo:", error); 
      })
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
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className={`tasktext ${todo.completed ? "completed" : ""}`}>{todo.title}</span>
              </div>
              <button className="deleteButton" onClick = {() => deleteTodo(todo.id)}>
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

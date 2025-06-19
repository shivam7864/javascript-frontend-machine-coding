import React, { useRef, useState } from "react";
import TodoList from "./TodoList";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const index = useRef(0);

  const handleAddTodo = (todo) => {
    const newtodo = todo?.trim();
    if (newtodo === "") return;

    const newArr = [...todoList];
    newArr.push({
      id: index.current,
      completed: false,
      title: newtodo,
    });

    index.current += 1;
    setTodo("");
    setTodoList(newArr);
  };

  return (
    <div className="container">
      <h1>Todo app</h1>
      <div className="inputBox">
        <input
          className="input-box"
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={() => handleAddTodo(todo)} className="add-button">
          Add
        </button>
      </div>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
};

export default Todo;

import React from "react";

const TodoList = ({ todoList, setTodoList }) => {
  const handleCheck = (checkedValue, id) => {
    const newArray = [...todoList];
    const idx = newArray.findIndex((item) => item?.id === id);
    newArray[idx].completed = checkedValue;
    setTodoList(newArray);
  };

  const handleDelete = (id) => {
    const newArr = todoList.filter((item) => item?.id != id);
    setTodoList(newArr);
  };
  return (
    <div>
      <h2>List of Todo</h2>
      <div className="todo">
        {todoList?.map((todo) => {
          return (
            <li className="todoItem" key={todo?.id}>
              <input
                type="checkbox"
                checked={todo?.completed}
                onChange={(e) => {
                  handleCheck(e.target.checked, todo?.id);
                }}
              />
              {todo?.completed ? (
                <s>{todo?.title}</s>
              ) : (
                <div>{todo?.title}</div>
              )}
              <button onClick={() => handleDelete(todo?.id)}>Delete</button>
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./AddEditTodo.css"; // Подключение CSS
import { addTodo, editTodo, deleteTodo } from "../features/ todosSlice";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTodo({ id: Date.now(), title }));
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Введите задачу"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddTodo;

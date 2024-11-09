import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editTodo } from "../features/ todosSlice";
import "./AddEditTodo.css"; // Подключение CSS

const EditTodo = ({ todo, onCancel }) => {
  const [title, setTitle] = useState(todo.title);
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(editTodo({ ...todo, title }));
    onCancel();
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleSave}>Сохранить</button>
      <button onClick={onCancel}>Отмена</button>
    </div>
  );
};

export default EditTodo;

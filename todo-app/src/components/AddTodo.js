import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./AddEditTodo.css";
import { addTodo, editTodo, deleteTodo } from "../features/ todosSlice";

// Компонент AddTodo — позволяет пользователю добавлять новые задачи в список
const AddTodo = () => {
  // Локальный стейт для хранения текста новой задачи
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    // Проверка на наличие текста в задаче (без пробелов)
    if (title.trim()) {
      // Отправка действия addTodo в Redux с данными новой задачи
      dispatch(addTodo({ id: Date.now(), title }));
      // Очистка поля ввода после добавления задачи
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Поле ввода для названия новой задачи */}
      <input
        type="text"
        placeholder="Введите задачу"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* Кнопка для добавления новой задачи */}
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddTodo;

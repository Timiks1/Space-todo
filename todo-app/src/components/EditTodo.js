import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editTodo } from "../features/ todosSlice";
import "./AddEditTodo.css";

// Компонент EditTodo — позволяет пользователю редактировать существующую задачу
// Принимает props:
// - `todo`: объект задачи, которую нужно отредактировать
// - `onCancel`: функция для отмены редактирования и закрытия формы
const EditTodo = ({ todo, onCancel }) => {
  // Локальный стейт для хранения измененного текста задачи
  const [title, setTitle] = useState(todo.title);
  const dispatch = useDispatch();

  // Функция handleSave — сохраняет изменения задачи
  const handleSave = () => {
    // Отправка действия editTodo с обновленным текстом задачи в Redux
    dispatch(editTodo({ ...todo, title }));
    // Закрытие формы редактирования после сохранения
    onCancel();
  };

  return (
    <div>
      {/* Поле ввода для редактирования текста задачи */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* Кнопка для сохранения изменений */}
      <button onClick={handleSave}>Сохранить</button>
      {/* Кнопка для отмены редактирования */}
      <button onClick={onCancel}>Отмена</button>
    </div>
  );
};

export default EditTodo;

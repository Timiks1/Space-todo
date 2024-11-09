import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTodos, deleteTodo } from "../features/ todosSlice";
import Pagination from "./Pagination";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";
import "./TodoList.css";

// Компонент TodoList — управляет отображением списка задач с функциями добавления, редактирования, удаления и пагинации
const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.list); // Получение списка задач из состояния Redux
  const status = useSelector((state) => state.todos.status); // Получение статуса загрузки из состояния Redux

  // Локальное состояние для управления текущей страницей, количеством задач на странице и задачей для редактирования
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(10);
  const [editingTodo, setEditingTodo] = useState(null);

  // useEffect — загружает задачи при монтировании компонента
  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  // Определение индексов для текущей страницы задач
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo); // Список задач для текущей страницы

  // Функция для изменения текущей страницы при нажатии кнопки пагинации
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Функция handleDelete — удаляет задачу по ID
  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  // Функция handleEdit — устанавливает задачу для редактирования
  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  // Отображение сообщений состояния загрузки данных
  if (status === "loading") return <p>Загрузка задач...</p>;
  if (status === "failed") return <p>Ошибка при загрузке задач.</p>;

  return (
    <div>
      <h2>Список задач</h2>
      <AddTodo />

      {/* Если выбрана задача для редактирования, отображается форма EditTodo, иначе показывается список задач */}
      {editingTodo ? (
        <EditTodo todo={editingTodo} onCancel={() => setEditingTodo(null)} />
      ) : (
        <ul>
          {currentTodos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <span>{todo.title}</span>
              <div className="button-group">
                {/* Кнопка для перехода к редактированию задачи */}
                <button className="edit-btn" onClick={() => handleEdit(todo)}>
                  Редактировать
                </button>
                {/* Кнопка для удаления задачи */}
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(todo.id)}
                >
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Компонент пагинации */}
      <div className="pagination-container">
        <Pagination
          todosPerPage={todosPerPage}
          totalTodos={todos.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default TodoList;

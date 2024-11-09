import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTodos, deleteTodo } from "../features/ todosSlice";
import Pagination from "./Pagination";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";
import "./TodoList.css";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.list);
  const status = useSelector((state) => state.todos.status);

  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(10);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  if (status === "loading") return <p>Загрузка задач...</p>;
  if (status === "failed") return <p>Ошибка при загрузке задач.</p>;

  return (
    <div>
      <h2>Список задач</h2>
      <AddTodo />
      {editingTodo ? (
        <EditTodo todo={editingTodo} onCancel={() => setEditingTodo(null)} />
      ) : (
        <ul>
          {currentTodos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <span>{todo.title}</span>
              <div className="button-group">
                <button className="edit-btn" onClick={() => handleEdit(todo)}>
                  Редактировать
                </button>
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

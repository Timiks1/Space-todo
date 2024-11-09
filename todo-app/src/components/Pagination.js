import React from "react";

// Компонент Pagination — управляет пагинацией и позволяет пользователю
// переходить между страницами задач.
// Принимает props:
// - `todosPerPage`: количество задач на одной странице
// - `totalTodos`: общее количество задач
// - `paginate`: функция для установки текущей страницы
// - `currentPage`: текущая активная страница
const Pagination = ({ todosPerPage, totalTodos, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalTodos / todosPerPage); // Общее количество страниц

  // Генерация массива номеров страниц
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Функция renderPageNumbers — отрисовывает кнопки для номеров страниц
  const renderPageNumbers = () => {
    if (totalPages <= 7) {
      // Если страниц 7 или меньше, показываем все номера страниц
      return pageNumbers.map((number) => (
        <li key={number} className="page-item">
          <button
            onClick={() => paginate(number)}
            className={`page-link ${number === currentPage ? "active" : ""}`}
          >
            {number}
          </button>
        </li>
      ));
    } else {
      // Если страниц больше 7, отображаем первые 5, троеточие и последнюю страницу
      const displayedPages = [...pageNumbers.slice(0, 5), "...", totalPages];

      return displayedPages.map((number, index) => {
        if (number === "...") {
          // Рендеринг неактивной кнопки с троеточием
          return (
            <li key={index} className="page-item">
              <button className="page-link dots" disabled>
                ...
              </button>
            </li>
          );
        }

        // Рендеринг кнопок для номера страниц
        return (
          <li key={number} className="page-item">
            <button
              onClick={() => paginate(number)}
              className={`page-link ${number === currentPage ? "active" : ""}`}
            >
              {number}
            </button>
          </li>
        );
      });
    }
  };

  return (
    <nav>
      <ul className="pagination">{renderPageNumbers()}</ul>
    </nav>
  );
};

export default Pagination;

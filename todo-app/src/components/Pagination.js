import React from "react";

const Pagination = ({ todosPerPage, totalTodos, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalTodos / todosPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Функция для отображения кнопок
  const renderPageNumbers = () => {
    if (totalPages <= 7) {
      // Если страниц меньше 7, показываем все
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
      // Если страниц больше 7, показываем первые 5, троеточие и последнюю страницу
      const displayedPages = [
        ...pageNumbers.slice(0, 5), // Первые 5 страниц
        "...", // Троеточие
        totalPages, // Последняя страница
      ];

      return displayedPages.map((number, index) => {
        if (number === "...") {
          return (
            <li key={index} className="page-item">
              <button className="page-link dots" disabled>
                ...
              </button>
            </li>
          );
        }

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

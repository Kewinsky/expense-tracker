import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useContext } from "react";
import { ThemeContext } from "../../App";
import "./paginationComponent.scss";

const PaginationComponent = ({
  currentPage,
  totalPages,
  onPageChange,
  handlePreviousPage,
  handleNextPage,
}) => {
  const { theme } = useContext(ThemeContext);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <ul
      className={`pagination justify-content-center ${
        theme === "dark" ? "dark-pagination" : ""
      }`}
    >
      <li class="page-item">
        <button onClick={handlePreviousPage} class="page-link">
          <BsArrowLeft />
        </button>
      </li>
      {pages.map((page) => (
        <li
          key={page}
          className={`page-item ${currentPage === page ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => onPageChange(page)}>
            {page}
          </button>
        </li>
      ))}
      <li class="page-item">
        <button onClick={handleNextPage} class="page-link">
          <BsArrowRight />
        </button>
      </li>
    </ul>
  );
};

export default PaginationComponent;

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
      className={`pagination justify-content-center m-0 pb-3 ${
        theme === "dark" ? "dark-pagination" : ""
      }`}
    >
      <li className="page-item">
        <button onClick={handlePreviousPage} className="page-link">
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
      <li className="page-item">
        <button onClick={handleNextPage} className="page-link">
          <BsArrowRight />
        </button>
      </li>
    </ul>
  );
};

export default PaginationComponent;

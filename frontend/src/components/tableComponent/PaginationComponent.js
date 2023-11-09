import {
  BsArrowBarLeft,
  BsArrowBarRight,
  BsArrowLeftShort,
  BsArrowRightShort,
} from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../App";
import "./paginationComponent.scss";

const PaginationComponent = ({
  currentPage,
  totalPages,
  onPageChange,
  handleFirstPage,
  handleLastPage,
  handlePreviousPage,
  handleNextPage,
}) => {
  const { theme } = useContext(ThemeContext);

  const calculateMaxPagesDisplayed = () => {
    return window.innerWidth < 768 ? 3 : 5;
  };

  const [maxPagesDisplayed, setMaxPagesDisplayed] = useState(
    calculateMaxPagesDisplayed()
  );

  useEffect(() => {
    const handleResize = () => {
      setMaxPagesDisplayed(calculateMaxPagesDisplayed());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const generatePageNumbers = () => {
    const pages = [];
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxPagesDisplayed / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxPagesDisplayed - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <ul
      className={`pagination justify-content-center m-0 pb-3 ${
        theme === "dark" ? "dark-pagination" : ""
      }`}
    >
      <li className="page-item">
        <button onClick={handleFirstPage} className="page-link">
          <BsArrowBarLeft />
        </button>
      </li>
      <li className="page-item">
        <button onClick={handlePreviousPage} className="page-link">
          <BsArrowLeftShort />
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
          <BsArrowRightShort />
        </button>
      </li>
      <li className="page-item">
        <button onClick={handleLastPage} className="page-link">
          <BsArrowBarRight />
        </button>
      </li>
    </ul>
  );
};

export default PaginationComponent;

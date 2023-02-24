import React from "react";
import { Link } from "react-router-dom";
import "./pagination.css";

const Pagination = ({ currentPage, totalPages }) => {
  const pageNumbers = [];
  const maxPagesToShow = 5;

  // Generate an array of page numbers to display
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // If there are too many pages to display, replace some with ellipses
  if (pageNumbers.length > maxPagesToShow) {
    const startEllipsis = currentPage - 2 > 1;
    const endEllipsis = currentPage + 2 < totalPages;
    if (startEllipsis) {
      pageNumbers.splice(1, currentPage - 3, "...");
    }
    if (endEllipsis) {
      pageNumbers.splice(currentPage + 2, totalPages - currentPage - 2, "...");
    }
  }

  return (
    <div className="pagination">
      {currentPage !== 1 && (
        <Link to={`/course/pages/${currentPage - 1}`}>
          <button className="page-link">Previous</button>
        </Link>
      )}
      {pageNumbers.map((page) => (
        <React.Fragment key={page}>
          {page === "..." ? (
            <span className="ellipsis">...</span>
          ) : (
            <Link to={`/course/pages/${page}`}>
              <button className={page === currentPage ? "active" : ""}>{page}</button>
            </Link>
          )}
        </React.Fragment>
      ))}
      {currentPage !== totalPages && (
        <Link to={`/course/pages/${currentPage + 1}`}>
          <button className="page-link">Next</button>
        </Link>
      )}
    </div>
  );
};

export default Pagination;

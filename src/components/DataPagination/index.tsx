import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import classes from "./index.module.scss";


type Props = {
  elementsPerPage: number;
  totalElements: number;
  activePage: number;
  paginate: Function;
};

const DataPagination: React.FC<Props> = ({
  elementsPerPage,
  totalElements,
  activePage,
  paginate,
}) => {
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(10); // move ellipses by 10
  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(totalElements / elementsPerPage); i++) {
    pageNumbers.push(i);
  }
  const movementEnd = pageNumbers.length - 5;

  const ellipseDecreaseClick = () => {
    if (pageStart > 0) {
      setPageStart((prev) => prev - 5);
      setPageEnd((prev) => prev - 5);
    }
  };

  const ellipseIncreaseClick = () => {
    if (pageEnd < movementEnd) {
      setPageStart((prev) => prev + 5);
      if (pageEnd + 5 > movementEnd) {
        const value = pageEnd + 5 - movementEnd;
        setPageEnd((prev) => prev + 5 - value);
      } else {
        setPageEnd((prev) => prev + 5);
      }
    }
  };

  const firstPage = () => {
    paginate(1);
    setPageStart(0);
    setPageEnd(10);
  };

  const lastPage = () => {
    paginate(pageNumbers[pageNumbers.length - 1]);
  };

  return (
    <div className={classes.bk_pagination}>
      <Pagination size="sm" className="mt-3">
        <Pagination.First onClick={firstPage} />
        {pageStart !== 0 ? (
          <Pagination.Ellipsis onClick={ellipseDecreaseClick} />
        ) : null}
        {pageNumbers.slice(pageStart, pageEnd).map((pageNumber) => {
          return (
            <Pagination.Item
              className="mx-1"
              key={pageNumber}
              active={pageNumber === activePage}
              onClick={() => {
                if (pageNumber === activePage) {
                  return;
                }
                paginate(pageNumber);
              }}
            >
              {pageNumber}
            </Pagination.Item>
          );
        })}
        {pageEnd >= movementEnd ? null : (
          <Pagination.Ellipsis onClick={ellipseIncreaseClick} />
        )}
        {pageNumbers.length >= 15
          ? pageNumbers.slice(-5).map((pageNumber) => {
              return (
                <Pagination.Item
                  className="mx-1"
                  key={pageNumber}
                  active={pageNumber === activePage}
                  onClick={() => paginate(pageNumber)}
                >
                  {pageNumber}
                </Pagination.Item>
              );
            })
          : null}
        <Pagination.Last onClick={lastPage} />
      </Pagination>
    </div>
  );
};

export default DataPagination;

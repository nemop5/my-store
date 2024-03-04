import { useCallback } from "react";

import { useFiltersContext } from "domain/Filters";
import ReactPaginate from "react-paginate";
import { ArrowLeft, ArrowRight } from "assets";
import clsx from "clsx";

import "./items-table-pagination.scss";

const constants = {
  PAGE_SIZES: [50, 30, 10],
  PREV_LABEL: "Prethodna",
  NEXT_LABEL: "Sledeća",
  PAGE: "strana",
  BREAK_LABEL: "...",
};

export const ItemsTablePagination = ({ pageCount, pageIndex = 0, gotoPage, marginPages = 1, pageRange = 3 }) => {
  const { itemsPerView, setItemsPerView } = useFiltersContext();

  const handlePageClick = useCallback(
    (event) => {
      gotoPage(event.selected);
    },
    [gotoPage]
  );

  return (
    <div className="pagination">
      <ReactPaginate
        activeClassName="pagination__number--active"
        breakClassName="pagination__item pagination__item--break"
        breakLabel={constants.BREAK_LABEL}
        breakLinkClassName="pagination__item-link pagination__item-link--break"
        containerClassName="pagination__controls"
        disableInitialCallback
        disabledClassName="pagination__item--disabled"
        forcePage={pageIndex}
        marginPagesDisplayed={marginPages}
        nextAriaLabel={`${constants.NEXT_LABEL} ${constants.PAGE}`}
        nextClassName="pagination__item pagination__item--next"
        nextLinkClassName="pagination__button pagination__button--next"
        onPageChange={handlePageClick}
        pageClassName="pagination__item"
        pageCount={pageCount}
        pageLinkClassName="pagination__item-link"
        pageRangeDisplayed={pageRange}
        previousAriaLabel={`${constants.PREV_LABEL} ${constants.PAGE}`}
        previousClassName="pagination__item pagination__item--previous"
        previousLinkClassName="pagination__button pagination__button--prev"
        renderOnZeroPageCount={null}
        nextLabel={
          <>
            <span>{constants.NEXT_LABEL}</span>
            <ArrowRight />
          </>
        }
        previousLabel={
          <>
            <ArrowLeft />
            <span>{constants.PREV_LABEL}</span>
          </>
        }
      />
      <div className="pagination__page-count">
        {`Prikaži `}
        {constants.PAGE_SIZES.map((value, i) => {
          return (
            <button
              key={i}
              className={clsx("pagination__page-count-item", {
                "pagination__page-count-item--active": itemsPerView === value,
              })}
              onClick={() => setItemsPerView(value)}
            >
              {value}
            </button>
          );
        })}
        {` rezultata`}
      </div>
    </div>
  );
};

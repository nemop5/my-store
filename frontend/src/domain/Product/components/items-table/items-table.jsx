import { useInventoryContext } from "domain/Product";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePagination, useRowSelect, useSortBy, useTable } from "react-table";
import { ArrowDown, ArrowUp } from "assets";
import clsx from "clsx";
import { useSessionStorage } from "domain/App";
import { useFiltersContext } from "domain/Filters";
import { Button } from "shared";
import { ItemsTablePagination } from "..";
import { useItemTableLabels } from "../../hooks";

import "./items-table.scss";
export const ItemsTable = React.forwardRef(
  ({ displayedColumns, data, onChildScroll, resetScroll, onRowClick }, ref) => {
    let navigate = useNavigate();
    const { updateSelection } = useInventoryContext();
    const { columns } = useItemTableLabels(displayedColumns);
    const { itemsPerView } = useFiltersContext();
    const [scrollActive, setScrollActive] = useState(false);
    const [lastVisitedPage, setVisitedPage] = useSessionStorage("items-table-last-visited-page", 0);

    const [numOfPages, setNumOfPages] = useState(1);

    const goRouteId = useCallback(
      (id) => {
        navigate(`/product/${id}`);
      },
      [navigate]
    );

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      pageCount,
      gotoPage,
      selectedFlatRows,
      setPageSize,
      state: { pageIndex },
    } = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: lastVisitedPage || 0, pageSize: itemsPerView },
      },
      useSortBy,
      usePagination,
      useRowSelect,
    );

    useEffect(() => {
      setPageSize(itemsPerView);
    }, [itemsPerView, setPageSize]);

    useEffect(() => {
      updateSelection(selectedFlatRows);
    }, [selectedFlatRows, updateSelection]);

    const ColumnElement = useCallback(
      ({ cell, row }) => {
        switch (cell.column.id) {
          case "title":
            return <div>{row.original.title}</div>;
          case "brand":
            return <div>{row.original.brand}</div>;
          case "description":
              return <div>{cell.value}</div>;
          case "category":
            return <div>{cell.value}</div>;
          case "discount_percentage":
            return <div>{cell.value}</div>;
          case "price":
            return <div>{cell.value}</div>;
          case "rating":
            return <div>{cell.value}</div>;
          case "stock":
            return <div>{cell.value}</div>;
          case "thumbnail":
            return <div><img src={cell.value} alt={"Nema slike"} style={{ maxWidth: '100%', height: 'auto' }} /></div>;
          case "images":
            return (
              <div className="images_table_wrap" style={{ display: 'flex', flexWrap: 'wrap' }}>
                {cell.value.map((image, index) => (
                  <div key={index} style={{ flex: '0 0 48%', margin: '1%' }}>
                    <img src={image} alt={"Nema slike"} style={{ width: '100%', height: 'auto' }} />
                  </div>
                ))}
              </div>
            );
          default:
            return cell.render("Cell");
        }
      },
      []
    );

    const onScrollHandler = (e) => {
      const itemYPos = e.currentTarget.scrollTop;
      setScrollActive(itemYPos > 20);
      onChildScroll(itemYPos);
    };

    const onClickHandler = (cell, row) => {
      console.log("ROW ORIGINAL", row.original);
      if (onRowClick) {
        onRowClick(row.original);
      } else if (!["selection", "button"].includes(cell.column.id)) {
        goRouteId(row.original.id);
      }
    };

    useEffect(() => {
      setVisitedPage((previousPageIndex) => {
        if (pageIndex !== previousPageIndex) resetScroll();

        return pageIndex;
      });
    }, [pageIndex, setVisitedPage, resetScroll]);

    useEffect(() => {
      setNumOfPages(data?.length ? pageCount : 1);
    }, [data, pageCount]);

    return data.length ? (
      <>
        <div className="items-table-wrap" onScroll={onScrollHandler} ref={ref}>
          <div {...getTableProps()} className="items-table">
            <div
              className={clsx("items-table__header items-table__grid", { "items-table__header--sticky": scrollActive })}
              style={{ "--grid-size": headerGroups[0]?.headers?.length }}
            >
              {headerGroups[0].headers.map((column) =>
                column.id !== "selection" ? (
                  <div
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={column.id}
                    className="items-table__heading "
                  >
                    {column.render("Header")}
                    <span className="items-table__sort-icon">
                      {column.isSorted ? column.isSortedDesc ? <ArrowDown /> : <ArrowUp /> : ""}
                    </span>
                  </div>
                ) : (
                  <div key={column.id}></div>
                )
              )}
            </div>
            <div {...getTableBodyProps()} className="items-table__body">
              {page.map((row) => {
                prepareRow(row);

                return (
                  <div
                    key={row.id}
                    {...row.getRowProps()}
                    className={clsx("items-table__row items-table__grid")}
                    style={{ "--grid-size": row.cells.length }}
                  >
                    {row.cells.map((cell, index) => (
                      <div
                        {...cell.getCellProps()}
                        key={index}
                        className={clsx(
                          "items-table__data",
                          {
                            "items-table__data--mobile-hide-border": cell.column.id === "button",
                          },
                          {
                            "items-table__data--mobile-hide-label": cell.column.id === "selection",
                          }
                        )}
                        onClick={() => onClickHandler(cell, row)}
                        data-label={cell.column.render("Header")}
                      >
                        <div>
                          <ColumnElement cell={cell} row={row} />
                        </div>
                      </div>
                    ))}
                    <div className="items-table__row-button">
                      <Button
                        buttonText={"Više informacija"}
                        buttonColor={"blue"}
                        event={() => goRouteId(row.original.itemId)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <ItemsTablePagination pageCount={numOfPages} pageIndex={pageIndex} gotoPage={gotoPage} />
      </>
    ) : (
      <div className="items-table__loading">Ne postoji nijedan inventar sa selektovanim filterima.</div>
    );
  }
);

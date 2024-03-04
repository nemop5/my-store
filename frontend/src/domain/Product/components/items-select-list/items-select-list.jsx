import { useTable, useRowSelect, useSortBy } from "react-table";
import { useInventoryPartTableLabels } from "../../hooks";

import "./items-select-list.scss";

export const ItemsSelectList = ({ data }) => {
  const { columns } = useInventoryPartTableLabels("modal");
  const { getTableProps, headerGroups } = useTable({ columns, data }, useSortBy, useRowSelect);

  return (
    <div className="table-wrap">
      <div {...getTableProps()} className="items-select-table">
        <div className="items-select-table__header items-select-table__grid">
          <div className="items-table__heading"></div>
          {headerGroups[0].headers.map((column) => (
            <div key={column.id} className="items-table__heading">
              {column.render("Header")}
            </div>
          ))}
        </div>
        <div className="items-select-table__body">
          {data.map((item) => {
            const { navigatorId } = item;
            return (
              <div key={item.itemId} className="items-select-table__row items-select-table__grid">
                <div
                  className="items-select-table__data items-select-table__data--ev-number"
                  data-label={columns[0].Header}
                >
                  <div>{item.itemId}</div>
                  {navigatorId && <div className="items-table__data-old-item-id">{navigatorId}</div>}
                </div>
                <div className="items-select-table__data" data-label={columns[1].Header}>
                  {item.name}
                </div>
                {item.serialNumber && (
                  <div className="items-select-table__data" data-label={columns[2].Header}>
                    {item.serialNumber}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

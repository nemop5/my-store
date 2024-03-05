import React, { useRef } from "react";
import "./items-table-checkbox.scss";

export const ItemsTableCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return <input type="checkbox" className="items-table__checkbox" ref={resolvedRef} {...rest} />;
});

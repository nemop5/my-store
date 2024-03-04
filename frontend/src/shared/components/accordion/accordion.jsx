import React, { useEffect, useState } from "react";
import clsx from "clsx";

import "./accordion.scss";
export const Accordion = ({ children, onExpand, expanded }) => {
  const [isExpanded, setExpanded] = useState(true);

  useEffect(() => {
    setExpanded(expanded);
  }, [expanded]);

  const expandAccordion = () => {
    onExpand();
  };

  const collapseAccordion = () => {
    setExpanded(false);
  };

  const [header, body] = React.Children.toArray(children);

  return (
    <>
      <div onClick={expandAccordion} className={clsx("accordion__header", { collapsed: isExpanded })}>
        {header}
      </div>
      <div onClick={collapseAccordion} className={clsx("accordion__body", { collapsed: !isExpanded })}>
        {body}
      </div>
    </>
  );
};

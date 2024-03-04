import clsx from "clsx";
import React, { useState } from "react";
import "./tabs.scss";

export const Tabs = ({ items }) => {
  const [isActive, setIsActive] = useState(0);

  const handleTabChange = (index) => {
    setIsActive(index);
  };

  const TabButtons = () => (
    <>
      {items.map(({ title }, index) => {
        return (
          <button
            className={clsx("tab__button", { "tab__button--active": isActive === index })}
            key={title}
            id={title}
            type="button"
            onClick={() => handleTabChange(index)}
            disabled={isActive === index}
          >
            {title}
          </button>
        );
      })}
    </>
  );

  return (
    <div className="tabs">
      <div className="tabs__button-wrap">
        <TabButtons />
      </div>
      <div className="tab">
        {items.map(({ title, component }, index) => {
          return (
            <div className="tab__content-wrap" key={title}>
              {isActive === index && <div className="tab__content">{component}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

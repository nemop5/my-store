import React, { useState } from "react";
import clsx from "clsx";
import "./squeeze-box.scss";
import { useEffect } from "react";
import { useRef } from "react";
import { ArrowDown } from "assets";

export const SqueezeBox = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [header, body] = React.Children.toArray(children);
  const [initialBodyHeight, setInitialBodyHeight] = useState(0);
  const container = useRef();

  useEffect(() => {
    setInitialBodyHeight(container.current.children[0].offsetHeight);
  }, [children]);

  useEffect(() => {
    container.current.style.maxHeight = isCollapsed ? "0px" : `${initialBodyHeight}px`;
  }, [isCollapsed, initialBodyHeight]);

  const toggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="squeeze-box">
      <div onClick={toggle} className="squeeze-box__header">
        {header}
        <ArrowDown className={clsx("squeeze-box__header-arrow", { collapse: !isCollapsed })} />
      </div>
      <div className={clsx("squeeze-box__body", { collapse: isCollapsed })} ref={container}>
        {body}
      </div>
    </div>
  );
};

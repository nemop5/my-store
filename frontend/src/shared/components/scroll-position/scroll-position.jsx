import React, { useEffect, useRef, useCallback } from "react";
import { useSessionStorage } from "domain/App";

import "./scroll-position.scss";
import { useDebounce } from "shared";

export const ScrollPosition = ({ children, uniqueId }) => {
  const scrollRef = useRef();
  const [rememberedY, setY] = useSessionStorage(uniqueId, 0);
  const { debounce } = useDebounce();

  useEffect(() => {
    if (rememberedY === 0) return;
    scrollRef.current?.scrollTo(0, rememberedY);
  }, [rememberedY]);

  const onChildScroll = useCallback((itemYPos) => debounce(setY, itemYPos), [setY, debounce]);

  const resetScroll = useCallback(() => {
    scrollRef.current.scrollTo(0, 0, { behavior: "instant" });
  }, []);

  const scrollableChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ref: scrollRef,
        onChildScroll: onChildScroll,
        resetScroll: resetScroll,
      });
    }
    return child;
  });

  return <div className="scroll">{scrollableChildren}</div>;
};

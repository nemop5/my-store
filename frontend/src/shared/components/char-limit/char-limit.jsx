import React from "react";

import "./char-limit.scss";

export const CharLimit = (props) => {
  const { charCount, maxLength } = props;
  return (
    <div className="char-limit">
      <span className="char-limit__min">{charCount || 0}</span>
      <span className="char-limit__max">/{maxLength}</span>
    </div>
  );
};

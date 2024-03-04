import React from "react";
import ReactDOM from "react-dom";

import { GlobalRouter } from "router";

import "style/style.scss";
const Root = () => {
  return (
    <React.StrictMode>
      <GlobalRouter />
    </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

import React from "react";
import { Link } from "react-router-dom";

import "./error.page.scss";
export const ErrorPage = () => (
  <div className="error-module__error">
    <h3 className="error-module__title">404</h3>
    <h2 className="error-module__text">Opps! Page not found</h2>
    <Link className="error-module__link" to="/">
      Please, take me HOME!
    </Link>
  </div>
);

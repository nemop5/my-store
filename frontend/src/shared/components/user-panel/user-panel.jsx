import React from "react";
import { Link } from "react-router-dom";
import AmazonLogo from "../../../assets/amazon.jpg";

import "./user-panel.scss";
export const UserPanel = () => {

  return (
    <div className="user__panel" onClick={(e) => e.stopPropagation()}>
      <Link to="" className="user__panel-link">
        <img src={AmazonLogo} alt="Amazon logo" style={{ maxWidth: '100%', height: 'auto' }}></img>
      </Link>
    </div>
  );
};

export default UserPanel;

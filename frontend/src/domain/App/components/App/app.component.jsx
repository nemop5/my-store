import React, { useState } from "react";
import clsx from "clsx";
import { Outlet } from "react-router-dom";

import { UserPanel, UserNavigation } from "domain/User";

import { SideBar } from "shared";

import { ApplicationContextProvider } from "../../context";

import "./app.component.scss";

export const App = () => {
  const [isNavMenuClicked, setIsNavMenuClicked] = useState(false);
  
  return (
    <ApplicationContextProvider>
      <div className={clsx("app", { "app--nav-open": isNavMenuClicked })}>
        <div className="app__sidebar">
          <SideBar className={"user-panel"}>
            <UserPanel />
            <UserNavigation />
          </SideBar>
        </div>
        <main className={clsx("app__content")}>
          <Outlet context={[isNavMenuClicked, setIsNavMenuClicked]} />
        </main>
      </div>
    </ApplicationContextProvider>
  );
};

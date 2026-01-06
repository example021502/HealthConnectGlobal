import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { themecontext } from "../contexts/ThemeContext";
function MainRenderComponent() {
  const { theme } = useContext(themecontext);
  return (
    <main
      className={`h-dvh ${
        theme === "dark"
          ? "bg-blue-dark text-white"
          : "bg-background-white text-blue-dark"
      } w-full overflow-y-hidden`}
    >
      <Outlet />
    </main>
  );
}

export default MainRenderComponent;

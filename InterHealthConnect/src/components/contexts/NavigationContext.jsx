import React, { createContext, useEffect, useState } from "react";
export const navButtonsContext = createContext(null);
function NavigationContext({ children }) {
  const [display, setDisplay] = useState(() => {
    const display_state = sessionStorage.getItem("display");
    return display_state || "Dashboard";
  });
  const change = (name) => {
    setDisplay(name);
  };

  useEffect(() => {
    sessionStorage.setItem("display", display);
  }, [display]);
  return (
    <navButtonsContext.Provider value={{ display, setDisplay, change }}>
      {children}
    </navButtonsContext.Provider>
  );
}

export default NavigationContext;

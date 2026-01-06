import React, { useState, createContext } from "react";

export const themecontext = createContext(null);

function ThemeContext({ children }) {
  const [theme, setTheme] = useState("white");
  const setSelectedTheme = (them) => {
    setTheme(them);
  };
  return (
    <themecontext.Provider value={{ theme, setTheme, setSelectedTheme }}>
      {children}
    </themecontext.Provider>
  );
}

export default ThemeContext;

import React, { createContext, useState, useContext } from "react";
export const LogSectionContext = createContext();

function SigninSignupContext({ children }) {
  const [section, setSection] = useState("Signin");
  const sectionSelection = (section) => {
    setSection(section);
  };
  return (
    <LogSectionContext.Provider value={{ section, sectionSelection }}>
      {children}
    </LogSectionContext.Provider>
  );
}

export default SigninSignupContext;

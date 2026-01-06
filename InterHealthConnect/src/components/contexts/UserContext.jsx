import React, { createContext, useState } from "react";
export const LoggedUserContext = createContext(null);

function UserContext({ children }) {
  const [user, setUser] = useState("");
  const [log, setLog] = useState(false);
  return (
    <LoggedUserContext.Provider value={{ user, setUser, log, setLog }}>
      {children}
    </LoggedUserContext.Provider>
  );
}

export default UserContext;

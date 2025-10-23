import { createContext, useState, useEffect } from "react";

const MY_CONTEXT_KEY = "myAppContextState";
export const AuthContext = createContext();

function UserProvider({ children }) {
  const [view, setView] = useState(() => {
    try {
      const storedState = sessionStorage.getItem(MY_CONTEXT_KEY);
      return storedState ? JSON.parse(storedState) : "home";
    } catch (error) {
      console.error("Failed to parse state from sessionStorage", error);
      return "default";
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(MY_CONTEXT_KEY, JSON.stringify(view));
    } catch (error) {
      console.error("Failed to save state to sessionStorage", error);
    }
  }, [view]);

  return (
    <AuthContext.Provider value={{ view, setView }}>
      {children}
    </AuthContext.Provider>
  );
}

export default UserProvider;

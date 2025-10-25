import { createContext, useState, useEffect } from "react";

const MY_CONTEXT_KEY = "myAppContextState";
export const AuthContext = createContext();

function UserProvider({ children }) {
  const [view, setView] = useState(() => {
    try {
      const storedState = sessionStorage.getItem(MY_CONTEXT_KEY);
      // Safely parse and retrieve the 'view' property, defaulting to 'home'
      return storedState ? JSON.parse(storedState).view : "home";
    } catch (error) {
      return "home";
    }
  });

  useEffect(() => {
    try {
      // Store the state as an object { view: "current_view" } for robust retrieval
      sessionStorage.setItem(MY_CONTEXT_KEY, JSON.stringify({ view }));
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

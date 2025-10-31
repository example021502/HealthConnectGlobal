import { useState, useEffect } from "react";
import { AuthContext, MY_CONTEXT_KEY } from "./Context";
function UserProvider({ children }) {
  const [view, setView] = useState(() => {
    try {
      const storedState = sessionStorage.getItem(MY_CONTEXT_KEY);
      return storedState ? JSON.parse(storedState).view : "home";
    } catch {
      return "home";
    }
  });

  useEffect(() => {
    try {
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

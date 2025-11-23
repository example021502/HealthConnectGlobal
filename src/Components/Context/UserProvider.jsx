import { useState, useEffect } from "react";
import { AuthContext, MY_CONTEXT_KEY } from "./Context";
function UserProvider({ children }) {
  const [view, setView] = useState(() => {
    try {
      const ViewState = sessionStorage.getItem(MY_CONTEXT_KEY);
      return ViewState ? JSON.parse(ViewState).view : "home";
    } catch {
      return "home";
    }
  });
  const [UserName, setUserName] = useState(() => {
    try {
      const UserState = sessionStorage.getItem(MY_CONTEXT_KEY);
      return UserState ? JSON.parse(UserState).view : "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(
        MY_CONTEXT_KEY,
        JSON.stringify({ view, UserName })
      );
    } catch (error) {
      console.error("Failed to save state to sessionStorage", error);
    }
  }, [view, UserName]);

  const contextValue = {
    view,
    setView,
    UserName,
    setUserName,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default UserProvider;

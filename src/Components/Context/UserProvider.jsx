import { useState, useEffect } from "react";
import { AuthContext } from "./Context";

function UserProvider({ children }) {
  const My_View_key = "myViewState";
  const My_userName_key = "myUserNameState";
  const my_users_key = "myUsersState";

  const [users, setUsers] = useState(() => {
    const usersState = sessionStorage.getItem(my_users_key);
    return usersState ? JSON.parse(usersState).users : "no data";
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(my_users_key, JSON.stringify({ users }));
    } catch {
      return console.log("Error, failed to load the users!!");
    }
  }, [users]);

  const [view, setView] = useState(() => {
    try {
      const ViewState = sessionStorage.getItem(My_View_key);
      return ViewState ? JSON.parse(ViewState).view : "home";
    } catch {
      return "home";
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(My_View_key, JSON.stringify({ view }));
    } catch (error) {
      console.error("Failed to save state to sessionStorage", error);
    }
  }, [view]);

  const [userName, setUserName] = useState(() => {
    try {
      const UserState = sessionStorage.getItem(My_userName_key);
      return UserState ? JSON.parse(UserState).userName : "undefined";
    } catch {
      return "undefined";
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(My_userName_key, JSON.stringify({ userName }));
    } catch (error) {
      console.error("Failed to save state to sessionStorage", error);
    }
  }, [userName]);

  return (
    <AuthContext.Provider
      value={{ view, setView, userName, setUserName, users, setUsers }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default UserProvider;

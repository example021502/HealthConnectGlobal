import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./Context";
import axios from "axios";

function UserProvider({ children }) {
  const My_View_key = "myViewState";

  const current_user_key = "currentUserState";

  const patients_key = "patientsState";

  const specialists_key = "specialistsState";
  const status_key = "statusState";

  const fetchData = useCallback(async () => {
    try {
      // Fetch patients data
      const patientsData = await axios.get("http://localhost:8081/patients");
      setPatients(patientsData.data);

      // Fetch specialists data
      const specialistsData = await axios.get(
        "http://localhost:8081/specialists"
      );

      setSpecialists(specialistsData.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // status
  const [status, setStatus] = useState(() => {
    const usersState = sessionStorage.getItem(status_key);
    return usersState ? JSON.parse(usersState).status : "offline";
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(status_key, JSON.stringify({ status }));
    } catch {
      return console.log(
        "Error, failed to save the the status data to local storage!!"
      );
    }
  }, [status]);

  // specialists
  const [specialists, setSpecialists] = useState(() => {
    const usersState = sessionStorage.getItem(specialists_key);
    return usersState ? JSON.parse(usersState).specialists : "no data";
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(specialists_key, JSON.stringify({ specialists }));
    } catch {
      return console.log(
        "Error, failed to save the specialists data to local storage!!"
      );
    }
  }, [specialists]);

  // patients
  const [patients, setPatients] = useState(() => {
    const usersState = sessionStorage.getItem(patients_key);
    return usersState ? JSON.parse(usersState).patients : "no data";
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(patients_key, JSON.stringify({ patients }));
    } catch {
      return console.log(
        "Error, failed to save the patients users data to local storage!!"
      );
    }
  }, [patients]);

  // view
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
      console.error("Error, failed to save state to sessionStorage", error);
    }
  }, [view]);

  // userName
  const [userName, setUserName] = useState(() => {
    try {
      const UserState = sessionStorage.getItem(current_user_key);
      return UserState ? JSON.parse(UserState).userName : "undefined";
    } catch {
      return "undefined";
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(current_user_key, JSON.stringify({ userName }));
    } catch (error) {
      console.error("Failed to save state to sessionStorage", error);
    }
  }, [userName]);

  return (
    <AuthContext.Provider
      value={{
        status,
        setStatus,
        view,
        setView,
        userName,
        setUserName,
        patients,
        setPatients,
        specialists,
        setSpecialists,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default UserProvider;

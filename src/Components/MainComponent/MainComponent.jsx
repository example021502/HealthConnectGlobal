import { AuthContext } from "../Context/Context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Home from "../Home/Home";
import Signin from "../Signin/Signin";
import Signup from "../Signup/Signup";
import DoctorDashboard from "../DoctorDashboard/DoctorDashboard";
import PatientDashboard from "../PatientDashboard/PatientDashboard";
import Documents from "../Documents/Documents";
import Patients from "../Patients/Patients";
import Schedules from "../Schedules/Schedules";
import Settings from "../Settings/Settings";
import Messaging from "../Messaging/Messaging";
import Support from "../Support/Support";

function MainComponent() {
  const { view, setPatients, patients, setSpecialists, specialists } =
    useContext(AuthContext);

  useEffect(() => {
    // patients_users
    axios
      .get("http://localhost:8081/patients")
      .then((res) => setPatients(res.data))
      .catch((err) => console.log(err));

    // specialists
    axios
      .get("http://localhost:8081/specialists")
      .then((res) => setSpecialists(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-full h-full">
      {view === "home" && <Home />}
      {view === "signin" && <Signin />}
      {view === "signup" && <Signup />}
      {view === "specialist" && <DoctorDashboard />}
      {view === "patient" && <PatientDashboard />}
      {view === "documents" && <Documents />}
      {view === "patients" && <Patients />}
      {view === "schedules" && <Schedules />}
      {view === "settings" && <Settings />}
      {view === "messaging" && <Messaging />}
      {view === "support" && <Support />}
    </div>
  );
}

export default MainComponent;

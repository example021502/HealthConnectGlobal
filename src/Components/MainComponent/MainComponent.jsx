import { AuthContext } from "../Context/Context";
import { useContext } from "react";
import Home from "../Home/Home";
import Signin from "../Signin/Signin";
import Signup from "../Signup/Signup";
import DoctorDashboard from "../DoctorDashboard/DoctorDashboard";
import PatientDashboard from "../PatientDashboard/PatientDashboard";

function MainComponent() {
  const { view, setView } = useContext(AuthContext);

  console.log("Current Context View State:", view);

  return (
    <div className="w-full h-full">
      {view === "home" && <Home />}
      {view === "signin" && <Signin />}
      {view == "signup" && <Signup />}
      {view == "Specialist" && <DoctorDashboard />}
      {view == "patient" && <PatientDashboard />}
    </div>
  );
}

export default MainComponent;

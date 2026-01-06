import React from "react";
import Home from "./components/pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DoctorDashboard from "./components/pages/DoctorDashboard";
import PatientDashboard from "./components/pages/PatientDashboard";
import SigninSignupContext from "./components/contexts/SigninSignupContext";
import SigningPage from "./components/pages/SigningPage";
import UserContext from "./components/contexts/UserContext";
import ThemeContext from "./components/contexts/ThemeContext";
import MainRenderComponent from "./components/pages/MainRenderComponent";
import Appointments from "./components/pages/Appointments";
import Doctors from "./components/pages/Doctors";
import Patients from "./components/pages/Patients";
import Payments from "./components/pages/Payments";
import Messages from "./components/pages/Messages";
import Settings from "./components/pages/Settings";
import CatchAll from "./components/pages/CatchAll";
import DashboardContent from "./components/layouts/Dashboard/DashboardContent";
import ExpandingContext from "./components/contexts/ExpandingContext";
import NavigationContext from "./components/contexts/NavigationContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRenderComponent />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "SigningPage",
            element: <SigningPage />,
          },
        ],
      },
      {
        path: "DoctorDashboard",
        element: <DoctorDashboard />,
        children: [
          {
            index: true,
            element: <DashboardContent />,
          },
          {
            path: "Appointments",
            element: <Appointments />,
          },
          {
            path: "Doctors",
            element: <Doctors />,
          },
          {
            path: "Patients",
            element: <Patients />,
          },
          {
            path: "Payments",
            element: <Payments />,
          },
          {
            path: "Messages",
            element: <Messages />,
          },
          {
            path: "Settings",
            element: <Settings />,
          },
        ],
      },

      {
        path: "PatientDashboard",
        element: <PatientDashboard />,
        children: [
          {
            index: true,
            element: <DashboardContent />,
          },
          {
            path: "Appointments",
            element: <Appointments />,
          },
          {
            path: "Doctors",
            element: <Doctors />,
          },
          {
            path: "Payments",
            element: <Payments />,
          },
          {
            path: "Messages",
            element: <Messages />,
          },
          {
            path: "Settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <CatchAll />,
  },
]);
function App() {
  return (
    <SigninSignupContext>
      <UserContext>
        <ThemeContext>
          <ExpandingContext>
            <NavigationContext>
              <RouterProvider router={router} />
            </NavigationContext>
          </ExpandingContext>
        </ThemeContext>
      </UserContext>
    </SigninSignupContext>
  );
}

export default App;

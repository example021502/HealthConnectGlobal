import React from "react";
import Home from "./components/pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Signin from "./components/pages/Signin";
import Signup from "./components/pages/Signup";
import SigninSignupContext from "./components/contexts/SigninSignupContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);
function App() {
  return (
    <SigninSignupContext>
      <RouterProvider router={router} />
    </SigninSignupContext>
  );
}

export default App;

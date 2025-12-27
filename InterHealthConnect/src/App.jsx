import React from "react";
import Home from "./components/pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SigninSignupContext from "./components/contexts/SigninSignupContext";
import SigningPage from "./components/pages/SigningPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "signin",
        element: <SigningPage />,
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

import React from "react";
import TopBar from "../layouts/Dashboard/TopBar";
import NavBar from "../layouts/Dashboard/NavBar";
import { Outlet } from "react-router-dom";

function DoctorDashboard() {
  return (
    <div className="flex w-full h-full flex-col items-start justify-start tracking-wide overflow-y-hidden backdrop-blur-standard bg-bg-gradient">
      <TopBar />
      <div className="flex flex-row items-center justify-start w-full h-full overflow-y-hidden">
        <NavBar />
        <main className="w-7/9 h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DoctorDashboard;

import React from "react";

import Dashboard from "./components/Dashboard/Dashboard";
import SideBar from "./components/SideBar/SideBar";

function DashboardScreen() {
  return (
    <div className="h-screen flex">
      <SideBar />
      <Dashboard />
    </div>
  );
}

export default DashboardScreen;

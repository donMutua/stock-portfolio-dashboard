import React from "react";

import GraphComponent from "./component/GraphComponent";
import PortfolioSection from "./component/PortfolioSection";
import SearchBar from "./component/SearchBar";

function Dashboard() {
  return (
    <div className="w-4/5 bg-gray-900 h-full">
      <SearchBar />
      <GraphComponent />
      <PortfolioSection />
    </div>
  );
}

export default Dashboard;

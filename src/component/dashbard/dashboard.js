import React, { useState, useEffect } from "react";
import "./dashboard.css"; // Correct the typo in "deshboard" to "dashboard"
import Navigation from "../native/navigation";

const Dashboard = () => {
  return (
    <div className="inbox-container">
      <Navigation activeView={"dashboard"} />

      <div className="inbox-parts">
        <h2>Dashboard</h2>
        {/* Add more content for the Dashboard as needed */}
      </div>
    </div>
  );
};

export default Dashboard;

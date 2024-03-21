import React from "react";

import "./setting.css";
import Navigation from "../native/navigation";
const Settings = () => {
  return (
    <div className="inbox-container">
      <Navigation activeView={"settings"} />

      <div className="inbox-parts">
        <h2>Settings</h2>
        {/* Add more content for the Dashboard as needed */}
      </div>
    </div>
  );
};

export default Settings;

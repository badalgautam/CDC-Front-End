// Navigation.js
import React from "react";

import { GrTicket } from "react-icons/gr";
import { RiDashboardLine } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";
import { MdOutlineSettings } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

// import logo from './../Images/logo.png';
import logo from "../../Images/logo.png";

const Navigation = ({ activeView, handleClick }) => {
  const masterclick = (view) => {
    // Redirect to different pages based on the clicked view
    switch (view) {
      case "dashboard":
        window.location.href = "/dashboard";
        break;
      case "inbox":
        window.location.href = "/inbox";
        break;
      case "ticket":
        window.location.href = "/ticket";
        break;
      case "assigned":
        window.location.href = "/assigned";
        break;
      case "masters":
        window.location.href = "/masters";
        break;
      case "reports":
        window.location.href = "/reports";
        break;
      case "settings":
        window.location.href = "/settings";
        break;
      default:
        // Handle default case or do nothing
        break;
    }
  };

  return (
    <div className="inbox-part" style={{ height: "100%", overflow: "auto" }}>
      <img
        src={logo}
        alt="Logo"
        style={{ width: "90%", maxHeight: "200px", marginLeft: "1vh" }}
      />

      <div className="all-tasks">
        <div
          className={
            activeView === "dashboard"
              ? "view-active-container"
              : "view-container"
          }
          onClick={() => masterclick("dashboard")}
        >
          <div className="row">
            <div className="icon-container">
              <RiDashboardLine className="message-icon" />
            </div>
            <h3 className="text-container">Dashboard</h3>
          </div>
        </div>

        <div
          className={
            activeView === "inbox" ? "view-active-container" : "view-container"
          }
          onClick={() => masterclick("inbox")}
        >
          <div className="row">
            <div className="icon-container">
              <FaWhatsapp className="message-icon" />
            </div>
            <h3 className="text-container">Inbox</h3>
          </div>
        </div>

        <div
          className={
            activeView === "ticket" ? "view-active-container" : "view-container"
          }
          onClick={() => masterclick("ticket")}
        >
          <div className="row">
            <div className="icon-container">
              <GrTicket className="message-icon" />
            </div>
            <h3 className="text-container">Ticket</h3>
          </div>
        </div>

        <div
          className={
            activeView === "assigned"
              ? "view-active-container"
              : "view-container"
          }
          onClick={() => masterclick("assigned")}
        >
          <div className="row">
            <div className="icon-container">
              <GrTicket className="message-icon" />
            </div>
            <h3 className="text-container">Assigned To Me</h3>
          </div>
        </div>

        <div
          className={
            activeView === "masters"
              ? "view-active-container"
              : "view-container"
          }
          onClick={() => masterclick("masters")}
        >
          <div className="row">
            <div className="icon-container">
              <FaRegCircleUser className="message-icon" />
            </div>
            <h3 className="text-container">Master's</h3>
          </div>
        </div>

        <div
          className={
            activeView === "reports"
              ? "view-active-container"
              : "view-container"
          }
          onClick={() => masterclick("reports")}
        >
          <div className="row">
            <div className="icon-container">
              {/* Replace 'your-report-analytics-library' with the correct import */}
              <TbReportAnalytics className="message-icon" />
            </div>
            <h3 className="text-container">Reports</h3>
          </div>
        </div>

        <div
          className={
            activeView === "settings"
              ? "view-active-container"
              : "view-container"
          }
          onClick={() => masterclick("settings")}
        >
          <div className="row">
            <div className="icon-container">
              <MdOutlineSettings className="message-icon" />
            </div>
            <h3 className="text-container">Settings</h3>
          </div>
        </div>
      </div>
      {/* Add email content here */}
    </div>
  );
};

export default Navigation;

import React, { useState, useEffect } from "react";
import { GrTicket } from "react-icons/gr";
import { RiDashboardLine } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";
import { MdOutlineSettings } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

import "./inbox.css";

function Inbox() {
  const [isScreenOpen, setIsScreenOpen] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [Data, setData] = useState([]);
  const [open, setOpen] = useState([]);
  const [closed, setClosed] = useState([]);
  const [closeCount, setCloseCount] = useState([]);
  const [openCount, setOpenCount] = useState([]);
  const openCounts = openCount;
  const closeCounts = closeCount;
  // console.log(closeCounts);

  const categories = ["All", "You", "Unassigned", "Spam", "Open"];

  const [selectedCategory, setSelectedCategory] = useState(""); // State to track the selected category

  const handleCategoryChange = (event) => {
    // Update the selected category when the dropdown value changes
    setSelectedCategory(event.target.value);
  };

  const handleClick = async () => {
    try {
      const response = await fetch(
        "https://customerdigitalconnect.com/chatlist/latest-messages",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcwODUwMjYzMywiaWF0IjoxNzA4NDg0NjMzfQ.ZiRNgDNU5u1_zIeDzwiYxVdHXoMkxZkQbc9zlQ_JXpyzFE3FaNsc8pJlAyJUFtR7-hvRKREIXt77L_GfLUkUxA",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setApiData(data);
      console.log("open list only");
      logDataInfo(data);
      // Handle the data as needed
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const logDataInfo = (data) => {
    if (data && data.length > 0) {
      const firstData = data[0];
      console.log("Open Count:", firstData.openCount);
      console.log("Closed Count:", firstData.closedCount);
      setClosed(firstData.closed);
      setCloseCount(firstData.closedCount);
      setOpenCount(firstData.openCount);
      if (firstData.open && firstData.open.length > 0) {
        console.log("Open Data:");
        setOpen(firstData.open);
        setData(firstData.open);
        firstData.open.forEach((item, index) => {
          console.log(`[${index}] Full Name: ${item.fullName}`);
        });
      } else {
        console.log("No open data");
      }
      printdata();
      console.log("Closed Data:", firstData.closed);
    } else {
      console.log("No data");
    }
  };

  const printdata = () => {
    console.log("Open Data:", apiData[0].open[0]);
    console.log("Closed Data:", closed);
    console.log("Close Count:", closeCount);
    console.log("Open Count:", openCount);
  };

  const handleButtonClick = (category) => {
    // Your logic here based on button click
    console.log(`Button clicked for category: ${category}`);
    const alldata = apiData[0];

    if (category === "open") {
      setData(alldata.open);
    } else if (category === "closed") {
      setData(alldata.closed);
    }
  };

  return (
    <div className="inbox-container">
      <div className="inbox-part" style={{ height: "100%", overflow: "auto" }}>
        {/* First part of the split screen */}
        <h2 className="h2" style={{ textAlign: "center" }}>
          All Masters{" "}
        </h2>
        <div className="all-tasks">
          <div className={isScreenOpen ? "view-container" : "deshboard"}>
            <div className="row">
              <div className="icon-container">
                <RiDashboardLine className="message-icon" />
              </div>
              <h3 className="text-container">Dashboard</h3>
            </div>
          </div>

          <div className="view-container" onClick={handleClick}>
            <div className="row">
              <div className="icon-container">
                <FaWhatsapp className="message-icon" />
              </div>
              <h3 className="text-container">Inbox</h3>
            </div>
          </div>

          <div className="view-container">
            <div className="row">
              <div className="icon-container">
                <GrTicket className="message-icon" />
              </div>
              <h3 className="text-container">Ticket</h3>
            </div>
          </div>

          <div className="view-container">
            <div className="row">
              <div className="icon-container">
                <GrTicket className="message-icon" />
              </div>
              <h3 className="text-container">Assigned To Me</h3>
            </div>
          </div>

          <div className="view-container">
            <div className="row">
              <div className="icon-container">
                <FaRegCircleUser className="message-icon" />
              </div>
              <h3 className="text-container">Master's</h3>
            </div>
          </div>

          <div className="view-container">
            <div className="row">
              <div className="icon-container">
                <TbReportAnalytics className="message-icon" />
              </div>
              <h3 className="text-container">Reports</h3>
            </div>
          </div>

          <div className="view-container">
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
      <div className="inbox-part">
        {/* Second part of the split screen */}
        <h2 className="h2">Chat List</h2>

        <div className="open-close-container">
          <div className="row">
            <div>
              <select
                value={selectedCategory}
                className="search-text"
                onChange={handleCategoryChange}
              >
                <option value="">Select a category</option>
                <option value="all">All</option>
                <option value="you">You</option>
                <option value="unassigned">Unassigned</option>
                <option value="spam">Spam</option>
                {/* Add more options as needed */}
              </select>
            </div>

            <button
              className="open-close-text"
              onClick={() => handleButtonClick("open")}
            >
              <div className="row">
                <h3 className="chat-list-text">Open</h3>
                <div className="open-close-count">{openCounts}</div>
              </div>
            </button>

            <button
              className="open-close-text"
              onClick={() => handleButtonClick("closed")}
            >
              <div className="row">
                <h3 className="chat-list-text">Closed</h3>
                <div className="open-close-count">{closeCounts}</div>
              </div>
            </button>
          </div>
        </div>

        <div>
          {apiData.length > 0 &&
            apiData[0].open &&
            apiData[0].open.length > 0 &&
            Data.map((item, index) => (
              <div key={index} className="chat-list-container">
                <div className="row">
                  <div className="chat-image">
                    {/* <MdOutlineSettings className="message-icon" />
                     */}
                    <h3 className="chat-icon">
                      {item.fullName && item.fullName.charAt(0)}
                    </h3>
                  </div>

                  <h3 className="chat-container">{item.fullName}</h3>
                </div>
              </div>
            ))}
        </div>

        <div></div>
      </div>

      <div className={`inbox-part ${isScreenOpen ? "open" : "closed"}`}>
        <h2 className="h2">Chat History</h2>
      </div>
    </div>
  );
}

export default Inbox;

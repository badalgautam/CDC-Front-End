import React, { useState, useEffect, useRef } from "react";
// import Dropdown from "react-bootstrap/Dropdown";
import { GrTicket } from "react-icons/gr";
import { RiDashboardLine } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";
import { MdOutlineSettings } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { VscSearch } from "react-icons/vsc";
import { IoFilterOutline } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";
import Switch from "@mui/material/Switch";

import "./inbox.css";
import {
  AllActiveUsersForAssigned,
  ChatHistoryByNumber,
  ClosedChat,
  ChatAssignedTo,
  UserGetById,
  ChatList,
  createMessageEntry,
  SendTextNotes,
} from "./inboxapi";
import Navigation from "../native/navigation";
import { CFormSwitch, CFormTextarea } from "@coreui/react";

function Inbox() {
  const [apiData, setApiData] = useState([]);
  const [Data, setData] = useState([]);
  const [open, setOpen] = useState([]);
  const [closed, setClosed] = useState([]);
  const [closeCount, setCloseCount] = useState([]);
  const [openCount, setOpenCount] = useState([]);
  const openCounts = openCount;
  const closeCounts = closeCount;
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeView, setActiveView] = useState("inbox");
  const [activeOpenClose, setOpenClose] = useState("open");
  const [activeItem, setItem] = useState([]);
  const [activeAssignedUser, setAssignedUser] = useState([]);
  const [activecutomer, setcutomer] = useState([]); //Click Customer
  const [assignedUsers, setAssignedUsers] = useState([]); //All Active User For Assigned
  const [activechathistory, setchathistory] = useState([]); //Click Customer History
  const [clickedItemIndex, setClickedItemIndex] = useState(null); //index of Active Customer Chat History Open
  const [showImageChatHistory, setShowImageChatHistory] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const showSendButton = inputValue.trim() !== "";
  const handleCategoryChange = (event) => {
    // Update the selected category when the dropdown value changes
    setSelectedCategory(event.target.value);
  };

  const handleOutInput = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = async (view) => {
    setActiveView(view);
    setOpenClose("open");
    try {
      const data = await await ChatList();
      setApiData(data);
      logDataInfo(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const logDataInfo = (data) => {
    if (data && data.length > 0) {
      const firstData = data[0];
      setClosed(firstData.closed);
      setCloseCount(firstData.closedCount);
      setOpenCount(firstData.openCount);
      if (firstData.open && firstData.open.length > 0) {
        setOpen(firstData.open);
        setData(firstData.open);
      } else {
        console.log("No open data");
      }
    } else {
      console.log("No data");
    }
  };

  const masterclick = (view) => {
    setActiveView(view);
  };

  const handleButtonClick = (category) => {
    const alldata = apiData[0];
    setOpenClose(category);
    if (category === "open") {
      setData(alldata.open);
    } else if (category === "closed") {
      setData(alldata.closed);
    }
  };

  const gotochathistory = async (item) => {
    try {
      const data = await ChatHistoryByNumber(item);
      setcutomer(item);
      setchathistory(data);
    } catch (error) {
      // Handle errors
      console.error("Error fetching chat history:", error.message);
    }
  };

  const fetchingAssignedUsers = async () => {
    try {
      const data = await AllActiveUsersForAssigned();
      setAssignedUsers(data);
      const selectedUserItem = data.find(
        (user) => user.userId === activecutomer.assignedto
      );
      const jsonString = JSON.stringify(selectedUserItem);
      setSelectedUserName(jsonString);
    } catch (error) {
      console.error("Error fetching assigned users:", error);
    }
  };

  useEffect(() => {
    fetchingAssignedUsers();
    handleClick("inbox");
  }, []);

  const [selectedUserName, setSelectedUserName] = useState("");

  const handleAssignedUser = async (event) => {
    const selectedUserString = event.target.value; // Get the user as a stringified JSON from the selected option
    setSelectedUserName(selectedUserString);
    const selectedUser = JSON.parse(selectedUserString);
    const selectedUserItem = assignedUsers.find(
      (user) => user.username === selectedUser.username
    );
    // Check if the selected user is found
    if (selectedUserItem) {
      const assignedPayload = {
        mobileNo: activecutomer.phoneNo,
        messagetype: "assigned",
        assignedto: selectedUserItem.userId,
        fromId: 100,
      };

      try {
        const response = await ChatAssignedTo(assignedPayload);
        const data = await await ChatList();
        setApiData(data);
        logDataInfo(data);
        handleRowClick(clickedItemIndex, activecutomer); // for reload history
      } catch (error) {
        console.error("Error handling assigned click:", error);
      }
    } else {
      console.warn("User not found in assignedUsers array.");
      // You may choose to handle this case differently based on your requirements
    }
  };

  const handleRowClick = async (index, item) => {
    setClickedItemIndex((prev) => (prev === index ? null : index));
    console.log("row data ", item, item.assignedto);
    const userData = await UserGetById(item.assignedto);
    setAssignedUser(userData);
    const selectedUserItem = assignedUsers.find(
      (user) => user.userId === item.assignedto
    );
    const jsonString = JSON.stringify(selectedUserItem);
    setSelectedUserName(jsonString);
    gotochathistory(item);
    setItem(item);
    setShowImageChatHistory(false);
  };

  const [displayData, setDisplayData] = useState([]); // Updated to hold filtered data

  useEffect(() => {
    setChecked(false);
    const filteredData = Data.filter((item) =>
      item.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayData(filteredData);
  }, [Data, searchTerm]);

  const chatHistoryRef = useRef(null);

  const handleFilterOption = (option) => {
    console.log(`Filter option selected: ${option}`);
    alert(`Filter option selected: ${option}`);
  };

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [activechathistory]);

  const handleClosedClick = async () => {
    const payload = {
      mobileNo: activecutomer.phoneNo,
      messagetype: "closed",
      fromId: 100,
    };

    await ClosedChat(payload)
      .then((data) => {
        alert(JSON.stringify(data, null, 2)); // Display response data in an alert
        handleClick("inbox");
        handleRowClick(clickedItemIndex, activecutomer);
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error:", error);
      });
  };

  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const [isOutgoingWindowOpen, setOutgoingWindowOpen] = useState(false);

  const outgoingWindowClosed = () => {
    setOutgoingWindowOpen(!isOutgoingWindowOpen);
  };
  const outgoingWindowRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        outgoingWindowRef.current &&
        !outgoingWindowRef.current.contains(event.target)
      ) {
        outgoingWindowClosed();
      }
    };

    if (isOutgoingWindowOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOutgoingWindowOpen]);

  const handleOutFilterOption = (option) => {
    setOutgoingWindowOpen(!isOutgoingWindowOpen);
    console.log(`Filtering by ${option}`);
  };
  function OutgoingTextNotes(type, message) {
    console.log("Button clicked! Calling OutgoingTextNotes method.");
    let messagetype = null;
    if (type) {
      messagetype = "text";
    } else {
      messagetype = "notes";
    }
    const result = SendTextNotes(activecutomer, messagetype, message);
  }

  const handleOutApiButtonClick = () => {
    // Implement your logic for handling button click
    console.log("Button clicked");
  };

  return (
    <div className="inbox-container">
      {/* part 1 */}
      <Navigation activeView={activeView} />

      {/* change part 2  */}
      <div className="inbox-parts">
        <div className="inbox-part2">
          <div className="search-bar-container">
            <div>
              <span className="chats">Chats</span>
            </div>
            <input
              type="search"
              className="search-bar"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

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
                </select>
              </div>

              <button
                className={
                  activeOpenClose === "open"
                    ? "open-close-active-text"
                    : "open-close-text"
                }
                onClick={() => handleButtonClick("open")}
              >
                <div className="open-closed-row">
                  <h3 className="chat-list-text">Open</h3>
                  <div className="open-close-count">
                    <span className="close-text">{openCounts}</span>
                  </div>
                </div>
              </button>

              <button
                className={
                  activeOpenClose === "closed"
                    ? "open-close-active-text"
                    : "open-close-text"
                }
                onClick={() => handleButtonClick("closed")}
              >
                <div className="open-closed-row">
                  <h3 className="chat-list-text">Closed</h3>
                  <div className="open-close-count">
                    <span className="close-text">{closeCount}</span>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div
            className="overflow"
            style={{
              height: "100%",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "thin",
              scrollbarColor: "rgb(209, 211, 212) transparent",
            }}
          >
            {apiData.length > 0 && apiData[0].open && (
              <>
                {searchTerm
                  ? displayData.map((item, index) => (
                      <div
                        key={index}
                        className={`chat-list-container ${
                          clickedItemIndex === index
                            ? "red-chat-list-container"
                            : ""
                        }`}
                        onClick={() => handleRowClick(index, item)}
                      >
                        <div className="row">
                          <div className="chat-image">
                            <h3 className="chat-icon">
                              {item.fullName && item.fullName.charAt(0)}
                            </h3>
                          </div>
                          <h3 className="chat-container">{item.fullName}</h3>
                        </div>
                      </div>
                    ))
                  : Data.map((item, index) => (
                      <div
                        key={index}
                        className={`chat-list-container ${
                          clickedItemIndex === index
                            ? "red-chat-list-container"
                            : ""
                        }`}
                        onClick={() => handleRowClick(index, item)}
                      >
                        <div className="row">
                          <div className="chat-image">
                            <h3 className="chat-icon">
                              {item.fullName && item.fullName.charAt(0)}
                            </h3>
                          </div>
                          <h3 className="chat-container">{item.fullName}</h3>
                        </div>
                      </div>
                    ))}
              </>
            )}
          </div>
        </div>

        <div className="inbox-part3">
          {showImageChatHistory ? (
            <>
              <div className="blank-history">
                <div className="blank-history-img">
                  <div className="blank-img">
                    <img
                      src="https://cdc.customerdigitalconnect.com/assets/images/no-conversation.svg"
                      alt="file not found"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="h2">Select Conversation</h3>
                  <p className="h2">
                    Select any conversation to view all the messages.
                  </p>
                </div>
              </div>
            </>
          ) : (
            // Content when showImage is false
            <>
              <div className="chat-name-bar">
                <div className="row">
                  <div className="icon-container-history">
                    <div className="message-icon-history">
                      {activecutomer.fullName &&
                      activecutomer.fullName.length > 0
                        ? activecutomer.fullName.substring(0, 1)
                        : null}
                    </div>
                  </div>
                  <h3 className="text-container-history">
                    {activecutomer.fullName}
                  </h3>

                  <div className="all-activity-view">
                    <button className="checkin-view">Checkin</button>
                    <select
                      value={selectedUserName}
                      onChange={handleAssignedUser}
                      className="assigned-view"
                    >
                      <option value="">Select User</option>
                      {assignedUsers.map((user) => (
                        <option key={user.userId} value={JSON.stringify(user)}>
                          {user.firstName} {user.lastName}
                        </option>
                      ))}
                    </select>

                    <button className="closed-view" onClick={handleClosedClick}>
                      Closed
                    </button>
                  </div>
                </div>
              </div>

              <div
                className="chat-history-view"
                ref={chatHistoryRef}
                style={{
                  height: "77%",
                  overflow: "auto",
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgb(209, 211, 212) transparent",
                  transform: "rotate(360deg)",
                }}
              >
                {activechathistory.map((item, index) => (
                  <div key={index} className="chat-history-views">
                    <div
                      className={
                        item.type === "Receiver"
                          ? "message-container-incoming"
                          : "message-container-outgoing"
                      }
                    >
                      <div
                        className={
                          item.type === "Receiver"
                            ? "message-incoming"
                            : "message-outgoing"
                        }
                      >
                        <div style={{ whiteSpace: "pre-line" }}>
                          {item.message}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* <div className="chat-input-view">
                <h3>chat input</h3>
              </div> */}

              <div className="chat-input-view">
                <div class="input-container">
                  <div className="send-outgoing-api">
                    <button className="icon" onClick={outgoingWindowClosed}>
                      <IoFilterOutline />
                    </button>

                    {isOutgoingWindowOpen && (
                      <div
                        className={`outgoing-window ${
                          isOutgoingWindowOpen ? "open" : ""
                        }`}
                      >
                        {/* Buttons inside the outgoing window */}
                        <button
                          className="outgoing-view"
                          onClick={() => handleOutFilterOption("Catlog")}
                        >
                          <div className="image-row">
                            <div className="image-icon-container">
                              <RiDashboardLine className="image-message-icon" />
                            </div>
                            <span className="image-text-container">Catlog</span>
                          </div>
                        </button>
                        <button
                          className="outgoing-view"
                          onClick={() => handleOutFilterOption("Video")}
                        >
                          <div className="image-row">
                            <div className="image-icon-container">
                              <RiDashboardLine className="image-message-icon" />
                            </div>
                            <span className="image-text-container">Video</span>
                          </div>
                        </button>
                        <button
                          className="outgoing-view"
                          onClick={() => handleOutFilterOption("Audio")}
                        >
                          <div className="image-row">
                            <div className="image-icon-container">
                              <RiDashboardLine className="image-message-icon" />
                            </div>
                            <span className="image-text-container">Audio</span>
                          </div>
                        </button>
                        <button
                          className="outgoing-view"
                          onClick={() => handleOutFilterOption("Template")}
                        >
                          <div className="image-row">
                            <div className="image-icon-container">
                              <RiDashboardLine className="image-message-icon" />
                            </div>
                            <span className="image-text-container">
                              Template
                            </span>
                          </div>
                        </button>
                        <button
                          className="outgoing-view"
                          onClick={() => handleOutFilterOption("Documents")}
                        >
                          <div className="image-row">
                            <div className="image-icon-container">
                              <RiDashboardLine className="image-message-icon" />
                            </div>
                            <span className="image-text-container">
                              Documents
                            </span>
                          </div>
                        </button>
                        <button
                          className="outgoing-view"
                          onClick={() => handleOutFilterOption("Photos")}
                        >
                          <div className="image-row">
                            <div className="image-icon-container">
                              <RiDashboardLine className="image-message-icon" />
                            </div>
                            <span className="image-text-container">Photos</span>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="send-message-input">
                    <textarea
                      className={
                        checked ? "send-note-input" : "send-text-input"
                      }
                      type="text"
                      placeholder={
                        checked
                          ? "Type your notes message..."
                          : "Type your text message..."
                      }
                      value={inputValue}
                      onChange={handleOutInput}
                    />
                  </div>

                  <div className="Switch-button">
                    {!showSendButton && (
                      <div className="switcher">
                        <span className="switch-text">Notes</span>
                        <Switch
                          checked={checked}
                          onChange={() => setChecked(!checked)}
                          inputProps={{ "aria-label": "controlled" }}
                          className="custom-switch"
                          // color="default"
                        />
                      </div>
                    )}
                    {showSendButton && (
                      <button
                        className="outgoing-send-button"
                        onClick={() => OutgoingTextNotes(!checked, inputValue)}
                      >
                        <VscSend className="send-button" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>

    // </div>
  );
}

export default Inbox;

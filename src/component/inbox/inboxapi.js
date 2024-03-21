// InboxAPI.js
const authToken = sessionStorage.getItem("authToken");

async function AllActiveUsersForAssigned() {
  try {
    // Replace 'your_token' with your actual authentication token
    const response = await fetch(
      "https://customerdigitalconnect.com/users/active",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          // Add any other necessary headers here
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

async function ChatHistoryByNumber(item) {
  try {
    const url = `https://customerdigitalconnect.com/chatlist/history/number/${item.phoneNo}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle errors by throwing or logging
    console.error("Error making API request:", error.message);
    throw error; // Re-throw the error for handling in the component
  }
}

async function ClosedChat(payload) {
  try {
    const response = await fetch(
      "https://customerdigitalconnect.com/chat-activity/closed",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to close chat");
    }

    return await response.json();
  } catch (error) {
    console.error("Error closing chat:", error);
    throw error;
  }
}

async function ChatAssignedTo(payload) {
  try {
    const response = await fetch(
      "https://customerdigitalconnect.com/chat-activity/assigned",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to close chat");
    }

    return await response.json();
  } catch (error) {
    console.error("Error closing chat:", error);
    throw error;
  }
}

async function UserGetById(id) {
  try {
    if (isNaN(id) || id === undefined) {
      throw new Error("Invalid user ID");
    }
    const response = await fetch(
      `https://customerdigitalconnect.com/userid/${id}`, // Use backticks for template literals
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    const data = await response.json();

    if (data.status === "success") {
      // Extracting the desired data from the response
      const user = data.data[0];
      return user; // Instead of using setUserData in this function, just return the user data
    } else {
      console.error("API call failed:", data.message);
      throw new Error(data.message); // Throw an error to handle it outside this function if needed
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Throw an error to handle it outside this function if needed
  }
}

async function ChatList() {
  try {
    const response = await fetch(
      "https://customerdigitalconnect.com/chatlist/latest-messages",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching chat list:", error);
    throw error;
  }
}

const createMessageEntry = (activecutomer, messagetype, message) => {
  const baseData = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: activecutomer.phoneNo,
    fromId: 100,
    assignedto: activecutomer.assignedto,
    name: activecutomer.fullName,
  };

  switch (messagetype) {
    case "text":
      console.log("Type: text");
      console.log("Message:", message);
      return {
        ...baseData,
        type: "text",
        text: {
          preview_url: false,
          body: message,
        },
      };
    case "notes":
      console.log("Type: notes");
      console.log("Message:", message);
      return {
        ...baseData,
        type: "notes",
        text: {
          preview_url: false,
          body: message,
        },
      };
    case "audio":
      console.log("Type: audio");
      return {
        ...baseData,
        type: "audio",
      };
    case "video":
      console.log("Type: video");
      return {
        ...baseData,
        type: "video",
      };
    case "documents":
      console.log("Type: documents");
      return {
        ...baseData,
        type: "documents",
      };
    case "location":
      console.log("Type: location");
      return {
        ...baseData,
        type: "location",
      };
    case "order":
      console.log("Type: order");
      return {
        ...baseData,
        type: "order",
      };
    case "reaction":
      console.log("Type: reaction");
      return {
        ...baseData,
        type: "reaction",
      };
    case "template":
      console.log("Type: template");
      return {
        ...baseData,
        type: "template",
      };
    case "sticker":
      console.log("Type: sticker");
      return {
        ...baseData,
        type: "sticker",
      };
    case "interactive":
      console.log("Type: interactive");
      return {
        ...baseData,
        type: "interactive",
      };
    case "image":
      console.log("Type: image");
      return {
        ...baseData,
        type: "image",
      };
    default:
      console.log("No matching message type:", messagetype);
      return null;
  }
};


async function SendTextNotes(activecutomer, messagetype, message) {
  try {
    const messageEntry = createMessageEntry(
      activecutomer,
      messagetype,
      message
    );

    const formData = new FormData();
    formData.append("messageEntry", JSON.stringify(messageEntry));

    const response = await fetch(
      "https://customerdigitalconnect.com/outgoing/send-message",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      }
    );

    const responseData = await response.json();

    // Check the response status and handle accordingly
    if (response.ok) {
      console.log(responseData); // Successful response
    } else {
      console.error(responseData); // Log the error details
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export {
  AllActiveUsersForAssigned,
  ChatHistoryByNumber,
  ClosedChat,
  ChatAssignedTo,
  UserGetById,
  ChatList,
  createMessageEntry,
  SendTextNotes,
};

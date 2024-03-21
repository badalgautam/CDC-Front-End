import React from 'react';
import "./ticket.css"
import Navigation from "../native/navigation";

const Ticket = () => {
  return (
    <div className="inbox-container">
      <Navigation activeView="ticket" /> 
      
      <h1>Ticket Page</h1>
    </div>
  );
};

export default Ticket;

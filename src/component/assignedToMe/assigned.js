import React from 'react';
import   './assignedto.css';
import Navigation from '../native/navigation';

const Assigned = () => {
  return (
    <div className="inbox-container">
    <Navigation activeView={"assigned"} />

    <div className="inbox-parts">
      <h2>Assigned To</h2>
      {/* Add more content for the Dashboard as needed */}
    </div>
  </div>
  );
};

export default Assigned;

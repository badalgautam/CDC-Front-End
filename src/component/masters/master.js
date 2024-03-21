import React from 'react';
import   './master.css';
import Navigation from '../native/navigation';

const Master = () => {
  return (
    <div className="inbox-container">
    <Navigation activeView={"masters"} />

    <div className="inbox-parts">
      <h2>Master</h2>
      {/* Add more content for the Dashboard as needed */}
    </div>
  </div>
  );
};

export default Master;

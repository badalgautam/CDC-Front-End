import React from 'react';
import   './report.css';
import Navigation from '../native/navigation';

const Reports = () => {
  return (
    <div className="inbox-container">
      <Navigation activeView={"reports"} />

      <div className="inbox-parts">
        <h2>Reports</h2>
        {/* Add more content for the Dashboard as needed */}
      </div>
    </div>
  );
};

export default Reports;

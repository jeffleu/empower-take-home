import React from 'react';
import Trackers from './Trackers.tsx';
import MonthlyReport from './MonthlyReport.tsx';

const Analysis = () => {
  return (
    <div className="analysis-wrapper">
      <h2 className="title">Analysis</h2>
      <Trackers />
      <MonthlyReport />
    </div>
  );
};

export default Analysis;

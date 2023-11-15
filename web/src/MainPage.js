import React from 'react';
import WeeklyGrid from './WeeklyGrid';
import IoTSettings from './IOTSettings';

function MainPage({ onStartStudy }) {
  return (
    <div>
      <h1>Study Tracker</h1>
      <button onClick={onStartStudy}>Start Study</button>
      <WeeklyGrid />
      <IoTSettings />
    </div>
  );
}

export default MainPage;

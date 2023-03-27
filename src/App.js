import React, { useState } from 'react';
import Timer from './components/Timer';
import { initialTimerModes } from './components/Timer';
import './styles/App.css';
import { Helmet } from 'react-helmet';

const TITLE = 'QA Cafe Pomodor';

function App() {


  const [currentMode, setCurrentMode] = useState(initialTimerModes.POMODORO);

  const updateCurrentMode = (mode) => {
    setCurrentMode(mode);
  };

  return (
    <div className={`App ${currentMode && currentMode.label ? currentMode.label.replace(/\s+/g, '-').toLowerCase() : ""
      }`}>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <Timer onModeChange={updateCurrentMode} />
    </div>
  );
}

export default App;

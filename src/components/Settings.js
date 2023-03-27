import React, { useState } from 'react';
import '../styles/Settings.css';
import { initialTimerModes } from './Timer';

function Settings({ timerModes, onUpdateDurations, onClose }) {
  const [localTimerModes, setLocalTimerModes] = useState(timerModes || initialTimerModes);

  const handleSave = () => {
    onUpdateDurations(localTimerModes);
    onClose();
  };

  const Dropdowns = () => {
    const handleChange = (e, modeLabel) => {
      setLocalTimerModes({
        ...localTimerModes,
        [modeLabel]: { ...localTimerModes[modeLabel], minutes: parseInt(e.target.value, 10) },
      });
    };

    return (
      <div className="settings-content">
        <h2>Settings</h2>
        {Object.values(localTimerModes).map((m) => (
          <div key={m.label}>
            <label htmlFor={`${m.label}-dropdown`}>{m.label}</label>
            <select
              id={`${m.label}-dropdown`}
              value={m.minutes}
              onChange={(e) => handleChange(e, m.label)}
            >
              {Array.from({ length: 60 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="settings">
      <Dropdowns />
      <button className="save-settings" onClick={handleSave}>
        Save
      </button>
      <button className="close-settings" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

export default Settings;
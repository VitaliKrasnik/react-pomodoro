import React, { useState, useEffect } from 'react';
import Settings from './Settings';
import { FaExpand, FaTrash, FaWrench } from 'react-icons/fa';
import '../styles/Timer.css';
import phoneRingSound from '../sounds/phonering.mp3';
import buttonClick from '../sounds/click.wav';

export const initialTimerModes = {
  POMODORO: { minutes: 25, backgroundColor: 'rgb(186, 73, 73)', label: 'Pomodoro' },
  SHORT_BREAK: { minutes: 5, backgroundColor: 'rgb(56, 133, 138)', label: 'Short Break' },
  LONG_BREAK: { minutes: 15, backgroundColor: 'rgb(57, 112, 151)', label: 'Long Break' },
};

const motivationalMessages = [
  "You got this!",
  "Keep up the good work!",
  "Stay focused!",
  "Believe in yourself!",
  "One step at a time.",
  "Your effort will pay off!"
];

function Timer({ onModeChange }) {
    const [timerModes, setTimerModes] = useState(initialTimerModes);
    const [mode, setMode] = useState(timerModes.POMODORO);
    const [minutes, setMinutes] = useState(mode ? mode.minutes : null);
    const [seconds, setSeconds] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [pomodoros, setPomodoros] = useState(0);
    const [motivationalMessage, setMotivationalMessage] = useState("");
    const [showSettings, setShowSettings] = useState(false);
    const [timerEnded, setTimerEnded] = useState(false);
  
    const handleSaveSettings = (updatedTimerModes) => {
      setTimerModes(updatedTimerModes);
      setMode((prevMode) => {
        return {
          ...prevMode,
          minutes: updatedTimerModes[prevMode.label].minutes,
        };
      });
      setShowSettings(false);
    };
  
    useEffect(() => {
      let interval;
      if (timerActive) {
        interval = setInterval(() => {
          setSeconds((prevSeconds) => {
            if (prevSeconds === 0) {
              setMinutes((prevMinutes) => prevMinutes - 1);
              return 59;
            } else {
              return prevSeconds - 1;
            }
          });
        }, 1000);
      }
  
      return () => clearInterval(interval);
    }, [timerActive]);
  
    useEffect(() => {
      onModeChange(mode);  
      setMinutes(mode.minutes);
      setSeconds(0);
      setTimerActive(false);
    }, [mode]);
  
    useEffect(() => {
      if (timerActive && minutes === 0 && seconds === 0) {
        const audio = new Audio(phoneRingSound);
        audio.play();
        setTimerActive(false);
        setTimerEnded(true);
      }
    }, [timerActive, minutes, seconds]);
  
    const getRandomMotivationalMessage = () => {
      const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
      return motivationalMessages[randomIndex];
    };
  
    const playButtonClickSound = () => {
      const audio = new Audio(buttonClick);
      audio.play();
    };
  
    const toggleTimer = () => {
      playButtonClickSound();
      if (!timerActive && minutes === mode.minutes && seconds === 0 && mode.label === timerModes.POMODORO.label) {
        setPomodoros(pomodoros + 1);
        setMotivationalMessage(getRandomMotivationalMessage());
      }
      setTimerActive(!timerActive);
      setTimerEnded(false);
    };
  
    const resetTimer = () => {
      setMinutes(mode.minutes);
      setSeconds(0);
      setTimerActive(false);
    };
  
    const deletePomodoros = () => {
      setPomodoros(0);
    };
  
    const handleFullscreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    };
  
    const handleSettingsScreen = () => {
      setShowSettings((prevShowSettings) => !prevShowSettings);
    };
  
  
  
    return (
  
        <div className="counter-area" style={{ backgroundColor: mode.backgroundColor }}>
        {showSettings && (
          <Settings
            timerModes={timerModes}
            onUpdateDurations={handleSaveSettings}
            onClose={() => setShowSettings(false)}
          />
        )}
        <div className="tabs">
          {Object.values(timerModes).map((m) => (
            <button
              key={m.label}
              className={`tab ${mode.label === m.label ? 'active' : ''}`}
              onClick={() => setMode(m)}
              style={{ backgroundColor: mode.label === m.label ? mode.backgroundColor : 'transparent' }} // Add this line
            >
              {m.label}
            </button>
          ))}
        </div>
        <div className="motivational-message">{motivationalMessage}</div>
        <h1 className="timer">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </h1>
        <div className="buttons">
          <button
            className="start-button"
            onClick={toggleTimer}
            style={{ color: mode.backgroundColor }}
          >
            {timerActive ? 'Pause' : 'START'}
          </button>
        </div>
        <div className="pomodoro-section">
          <div className="pomodoro-icons">
            {[...Array(pomodoros)].map((_, i) => (
              <div key={i} className="pomodoro-icon" />
            ))}
          </div>
          <button
            className="delete-pomodoros"
            onClick={deletePomodoros}
            style={{ backgroundColor: mode.backgroundColor }} // Add this line
          >
            <FaTrash />
          </button>
        </div>


        <button className="fullscreen" onClick={handleFullscreen}>
          <FaExpand />
        </button>
        <button className="settingsScreen" onClick={handleSettingsScreen}>
          <FaWrench />
        </button>

      </div>

      
    );
}

export default Timer;

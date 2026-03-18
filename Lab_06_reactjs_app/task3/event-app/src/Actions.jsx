import { useState } from 'react';
import './Actions.css';

const Actions = () => {
  const [message, setMessage] = useState('');
  const [bgColor, setBgColor] = useState('#0f172a'); // Default dark background
  const [hoverTextColor, setHoverTextColor] = useState('#e2e8f0');

  const handleShowMessage = () => {
    setMessage('Hello! This is a premium interactive message ✨');
  };

  const handleChangeBackground = () => {
    const randomColors = ['#1e1b4b', '#312e81', '#14532d', '#7f1d1d', '#4c1d95', '#0f172a'];
    const newColor = randomColors[Math.floor(Math.random() * randomColors.length)];
    setBgColor(newColor);
  };

  const handleShowAlert = () => {
    alert('Wow! This is an interactive alert triggered by React events.');
  };

  const handleMouseOver = () => {
    setHoverTextColor('#38bdf8'); // Changes to a nice neon blue on hover
  };

  const handleMouseOut = () => {
    setHoverTextColor('#e2e8f0'); // Reverts to original
  };

  return (
    <div className="action-wrapper" style={{ backgroundColor: bgColor }}>
      <div className="action-card">
        <h2 
          className="interactive-title"
          style={{ color: hoverTextColor }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          Hover over me to change my color!
        </h2>

        {message && (
          <div className="message-box slide-down">
            {message}
          </div>
        )}

        <div className="button-grid">
          <button className="action-btn btn-msg" onClick={handleShowMessage}>
            <span className="icon">💬</span> Show Message
          </button>
          
          <button className="action-btn btn-bg" onClick={handleChangeBackground}>
            <span className="icon">🎨</span> Change Background
          </button>
          
          <button className="action-btn btn-alert" onClick={handleShowAlert}>
            <span className="icon">🚨</span> Show Alert
          </button>
        </div>
      </div>
    </div>
  );
};

export default Actions;

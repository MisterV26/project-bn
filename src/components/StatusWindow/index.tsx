import React from 'react';
import './style.css';

const statusImage = require('../../globals/images/Emotion_windows_exe5.png');

export const StatusWindow = () => {
  return (
    <div className="status-window-container">
        <div className="status-window" style={{backgroundImage: `url(${statusImage})`}}></div>
    </div>
  )
}

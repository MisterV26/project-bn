import React from 'react'
import './style.css';

interface Props {
    playerHp: number;
}

export const HpMeter = ({playerHp}:Props) => {
  return (
    <div className="hp-meter-container">
        <p className="hp-blue">{playerHp ?? 0}</p>
    </div>
  )
}

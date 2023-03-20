import React from 'react';
import { IEnemy } from '../../Interfaces/IEnemy';
import './style.css';

export const EnemyHpMeter = (enemy: IEnemy) => {
  return (
    <div className="enemy-hp-meter-container">
        <p>
        {enemy.hp}
        </p>
    </div>
  )
}

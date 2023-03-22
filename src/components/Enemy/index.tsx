import React, { useEffect, useState } from 'react'
import { usePosition } from '../../hooks/usePosition';
import { IEnemy } from '../../Interfaces/IEnemy';
import { EnemyHpMeter } from '../EnemyHpMeter';
import './style.css';
const bassImage = require('../../globals/images/Forte_EXE5_b.gif');
const ENEMYWIDTH = 100;
const ENEMYHEIGHT = 100;

interface Props {
  isCustomizing: boolean;
  enemy: IEnemy;
}

export const Enemy = ({enemy, isCustomizing}: Props) => {
  
  const enemyPosition = usePosition(ENEMYWIDTH, ENEMYHEIGHT);

useEffect(() => {
}, []);

  return (
    <>
    {
      <div 
      className={`enemy ${isCustomizing ? "--standby" : "--active"}`} 
      style={{
        bottom: enemyPosition.calculatePosition(enemy.position).y, 
        left: enemyPosition.calculatePosition(enemy.position).x
      }}>
        <div className="enemy_sprite" style={{backgroundImage: `url(${bassImage})`}}>
        <EnemyHpMeter {...enemy} />
        </div>
      </div>
    }
    
    </>
  )
}
 
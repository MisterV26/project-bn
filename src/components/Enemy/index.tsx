import React, { useEffect, useState } from 'react'
import { usePosition } from '../../hooks/usePosition';
import { IEnemy } from '../../Interfaces/IEnemy';
import { EnemyHpMeter } from '../EnemyHpMeter';
import './style.css'

const ENEMYWIDTH = 100;
const ENEMYHEIGHT = 100;

export const Enemy = (props: IEnemy) => {
  
  const enemyPosition = usePosition(ENEMYWIDTH, ENEMYHEIGHT);

useEffect(() => {
}, []);

  return (
    <>
    {
      <div 
      className="enemy" 
      style={{
        bottom: enemyPosition.calculatePosition(props.position).y, 
        left: enemyPosition.calculatePosition(props.position).x
      }}>
        <EnemyHpMeter {...props} />
      </div>
    }
    
    </>
  )
}
 
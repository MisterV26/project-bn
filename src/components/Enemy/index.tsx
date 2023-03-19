import React, { useEffect, useState } from 'react'
import { usePosition } from '../../hooks/usePosition';
import { IEnemy } from '../../Interfaces/IEnemy';
import './style.css'

const ENEMYWIDTH = 100;
const ENEMYHEIGHT = 100;

export const Enemy = ({position}: IEnemy) => {
  
  const enemyPosition = usePosition(ENEMYWIDTH, ENEMYHEIGHT);

useEffect(() => {
}, []);

  return (
    <>
    {
      <div 
      className="enemy" 
      style={{
        bottom: enemyPosition.calculatePosition(position).y, 
        left: enemyPosition.calculatePosition(position).x
      }}></div>
    }
    </>
  )
}
 
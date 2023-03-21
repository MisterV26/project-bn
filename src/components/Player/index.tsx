import React, { useEffect, useState } from 'react';
import { usePosition } from '../../hooks/usePosition';
import { IPlayer } from '../../Interfaces/IPlayer';
import './style.css';
const megamanImage = require('../../globals/images/MM_EXE4_b_reg.png');


const PLAYERWIDTH = 100;
const PLAYERHEIGHT = 100;

export const Player = ({position}: IPlayer) => {
  
  const playerPosition = usePosition(PLAYERWIDTH, PLAYERHEIGHT);

useEffect(() => {
}, []);

  return (
    <>
    {
      <div 
      className="player" 
      style={{
        bottom: playerPosition.calculatePosition(position).y, 
        left: playerPosition.calculatePosition(position).x
      }}>
        <div className="player_sprite" style={{backgroundImage: `url(${megamanImage})`}}></div>
      </div>
    }
    </>
  )
}
 
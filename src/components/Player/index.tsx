import React, { useEffect, useState } from 'react';
import { usePosition } from '../../hooks/usePosition';
import { IPlayer } from '../../Interfaces/IPlayer';
import './style.css';
const megamanImage = require('../../globals/images/MM_EXE4_b_reg.png');
const PLAYERWIDTH = 100;
const PLAYERHEIGHT = 100;

interface Props {
  isCustomizing: boolean;
  player: IPlayer;
}

export const Player = ({player, isCustomizing}: Props) => {
  
  const playerPosition = usePosition(PLAYERWIDTH, PLAYERHEIGHT);

useEffect(() => {
}, []);

  return (
    <>
    {
      <div 
      className={`player ${isCustomizing ? "--standby" : "--active"}`}  
      style={{
        bottom: playerPosition.calculatePosition(player.position).y, 
        left: playerPosition.calculatePosition(player.position).x
      }}>
        <div className="player_sprite" style={{backgroundImage: `url(${megamanImage})`}}></div>
      </div>
    }
    </>
  )
}
 
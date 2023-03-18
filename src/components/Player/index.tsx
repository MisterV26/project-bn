import React, { useEffect, useState } from 'react'
import { usePosition } from '../../hooks/usePosition';
import { ICoordinates } from '../../Interfaces/ICoordinates'
import { IPlayer } from '../../Interfaces/IPlayer'
import './style.css'

const PLAYERWIDTH = 100;
const PLAYERHEIGHT = 100;

export const Player = ({position}: IPlayer) => {
  
  const playerPosition = usePosition(PLAYERWIDTH, PLAYERHEIGHT);
  const [player, setPlayer] = useState<IPlayer>({
    position:{
      x : playerPosition.calculatePosition(position).x,
      y : playerPosition.calculatePosition(position).y
    }
  });

  useEffect(() => {
    console.log(player);
  });

  return (
    <div 
    className="player" 
    style={{
      bottom: player.position.y, 
      left: player.position.x
    }}></div>
  )
}
 
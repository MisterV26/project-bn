import React, { useContext, useEffect, useState } from 'react';
import { usePosition } from '../../hooks/usePosition';
import { IPlayer } from '../../Interfaces/IPlayer';
import './style.css';
import { Sprite } from '../Sprite';
import { SpriteDataContext } from '../../scenes/Battle/Battle';
const megamanImage = require('../../globals/images/MM_EXE4_b_reg.png');
const PLAYERWIDTH = 100;
const PLAYERHEIGHT = 100;

interface Props {
  isCustomizing: boolean;
  player: IPlayer;
  battleIsPaused: boolean;
}

export const Player = ({player, isCustomizing, battleIsPaused}: Props) => {

  const {spriteData, setSpriteData} = useContext(SpriteDataContext);
  let entity = spriteData['megaman'];
  let sprite = entity.sprite;
  
  const playerPosition = usePosition(PLAYERWIDTH, PLAYERHEIGHT);

  return (
    <>
    {
      <div 
      className={`player ${isCustomizing ? "--standby" : "--active"}`}  
      style={{
        bottom: playerPosition.calculatePosition(player.position).y, 
        left: playerPosition.calculatePosition(player.position).x
      }}>
        <Sprite spriteData={entity} state="idle" battleIsPaused={battleIsPaused}/>
      </div>
    }
    </>
  )
}
 
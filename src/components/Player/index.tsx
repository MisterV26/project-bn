import React, { useContext, useEffect, useState } from 'react';
import { usePosition } from '../../hooks/usePosition';
import { IPlayer } from '../../Interfaces/IPlayer';
import './style.css';
import { Sprite } from '../Sprite';
import { BattleContext, SpriteDataContext } from '../../scenes/Battle/Battle';
const megamanImage = require('../../globals/images/MM_EXE4_b_reg.png');
const PLAYERWIDTH = 100;
const PLAYERHEIGHT = 100;

export const Player = () => {

  const {battleRef} = useContext(BattleContext);
  const {spriteData, setSpriteData} = useContext(SpriteDataContext);

  let isCustomizing = battleRef.current.isCustomizing;
  let player = battleRef.current.player;
  let battleIsPaused = battleRef.current.battleIsPaused;

  // Sprite
  let entity = spriteData['megaman'];
  let sprite = entity.sprite;
  
  const playerPosition = usePosition(sprite.width, sprite.height);

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
 
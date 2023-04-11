import React, { useContext, useEffect, useState } from 'react'
import { usePosition } from '../../hooks/usePosition';
import { IEnemy } from '../../Interfaces/IEnemy';
import { EnemyHpMeter } from '../EnemyHpMeter';
import './style.css';
import { Sprite } from '../Sprite';
import { BattleContext, SpriteDataContext } from '../../scenes/Battle/Battle';

const ENEMYWIDTH = 100;
const ENEMYHEIGHT = 100;

interface Props {
  isCustomizing: boolean;
  enemy: IEnemy;
  ticks: number;
  battleIsPaused: boolean;
}

export const Enemy = () => {
  
  const {battleRef} = useContext(BattleContext);
  const {spriteData, setSpriteData} = useContext(SpriteDataContext);
  
  let ticks = battleRef.current.ticks;
  let isCustomizing = battleRef.current.isCustomizing;
  let enemy = battleRef.current.enemy;
  let battleIsPaused = battleRef.current.battleIsPaused;

  // Sprite
  let entity = spriteData[enemy.name];
  let sprite = entity.sprite;

  const enemyPosition = usePosition(sprite.width, sprite.height);

useEffect(() => {
}, []);

  return (
    <>
    {
      <div 
      className={`enemy ${isCustomizing ? "--standby" : "--active"}`} 
      style={{
        width: sprite.width,
        height: sprite.height,
        bottom: enemyPosition.calculatePosition(enemy.position).y, 
        left: enemyPosition.calculatePosition(enemy.position).x
      }}>
        <div className="enemy_sprite">
        <Sprite spriteData={entity} state="idle" animated="true" ticks={ticks} battleIsPaused={battleIsPaused}/>
        <EnemyHpMeter {...enemy} />
        </div>
      </div>
    }
    
    </>
  )
}
 
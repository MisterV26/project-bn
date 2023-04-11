import React, { useContext } from "react";
import { IBattleProperties } from "../../Interfaces/IBattleProperties";
import { IEnemy } from "../../Interfaces/IEnemy";
import { IPlayer } from "../../Interfaces/IPlayer";
import "./style.css";
import { BattleContext } from "../../scenes/Battle/Battle";


export const Debugger = () => {
  
  const {battleRef} = useContext(BattleContext);
  
  let player = battleRef.current.player;
  let enemy = battleRef.current.enemy;
  let battleProperties: IBattleProperties = battleRef.current.battleProperties;

  return (
    <div className="debugger">
      {battleRef.current.player && (
        <div className="debug debug-player">
          <p>Player_hp: {player.currentHp}</p>
          <p>
            Player_pos: ({player.position.x}, {player.position.y})
          </p>
          <p>Player_status: {player.status}</p>
        </div>
      )}
      {enemy && (
        <div className="debug debug-enemy">
          <p>Enemy_hp: {enemy.hp}</p>
          <p>
            Enemy_pos: ({enemy.position.x}, {enemy.position.y})
          </p>
          <p>Enemy_status: {enemy.status}</p>
        </div>
      )}
      <div className="debug misc">
        <p>Time: {battleRef.current.ticks}</p>
        <p>Custom_bar: {battleProperties?.customBarValue?.toFixed(2)}</p>
        <p>Full_status: {String(battleProperties?.customBarFull)}</p>
        <p>Is customizing: {String(battleProperties.isCustomizing)}</p>
      </div>
    </div>
  );
};

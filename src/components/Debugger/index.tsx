import React, { useContext } from "react";
import { ICustomizerBar } from "../../Interfaces/ICustomizerBar";
import { IEnemy } from "../../Interfaces/IEnemy";
import { IPlayer } from "../../Interfaces/IPlayer";
import "./style.css";
import { BattleContext } from "../../scenes/Battle/Battle";


export const Debugger = () => {
  
  const {battleRef} = useContext(BattleContext);
  
  let player = battleRef.current.player;
  let enemy = battleRef.current.enemy;
  let customBar = battleRef.current.customBar;
  let isCustomizing = battleRef.current.isCustomizing;

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
        <p>Custom_bar: {customBar?.value?.toFixed(2)}</p>
        <p>Full_status: {String(customBar?.full)}</p>
        <p>Is customizing: {String(isCustomizing)}</p>
      </div>
    </div>
  );
};

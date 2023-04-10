import React from "react";
import { ICustomizerBar } from "../../Interfaces/ICustomizerBar";
import { IEnemy } from "../../Interfaces/IEnemy";
import { IPlayer } from "../../Interfaces/IPlayer";
import "./style.css";

interface Props {
  player?: IPlayer;
  enemy?: IEnemy;
  custBar?: ICustomizerBar;
  isCustomizing?: boolean;
  ticks?: number;
}

export const Debugger = ({ ticks, player, enemy, custBar, isCustomizing }: Props) => {
  return (
    <div className="debugger">
      {player && (
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
        <p>Time: {ticks}</p>
        <p>Custom_bar: {custBar?.value?.toFixed(2)}</p>
        <p>Full_status: {String(custBar?.full)}</p>
        <p>Is customizing: {String(isCustomizing)}</p>
      </div>
    </div>
  );
};

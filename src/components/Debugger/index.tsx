import React from "react";
import { IEnemy } from "../../Interfaces/IEnemy";
import { IPlayer } from "../../Interfaces/IPlayer";
import './style.css';

interface Props {
  player?: IPlayer;
  enemy?: IEnemy;
  custValue?: number;
}

export const Debugger = ({ player, enemy, custValue }: Props) => {
  return (
    <div className="debugger">
      {player && (
        <div className="debug-player">
          <p>Player_hp: {player.currentHp}</p>
          <p>
            Player_pos: ({player.position.x}, {player.position.y})
          </p>
          <p>Player_status: {player.status}</p>
        </div>
      )}
      {enemy && (
        <div className="debug-enemy">
          <p>Enemy_hp: {enemy.hp}</p>
          <p>
            Enemy_pos: ({enemy.position.x}, {enemy.position.y})
          </p>
          <p>Enemy_status: {enemy.status}</p>
        </div>
      )}
      <p>Customizer bar: {custValue?.toFixed(2)}</p>
    </div>
  );
};

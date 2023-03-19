import React from 'react'
import { IPlayer } from '../../Interfaces/IPlayer'

interface Props {
    player: IPlayer;
}

export const Debugger = ({player}: Props) => {
  return (
    <div className="debugger">
        <p>Player_hp: {player.hp}</p>
        <p>Player_pos: ({player.position.x}, {player.position.y})</p>
        <p>Player_status: {player.status}</p>
    </div>
  )
}

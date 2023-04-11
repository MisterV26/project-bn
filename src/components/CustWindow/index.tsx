import React, { useContext } from 'react';
import { ChipList } from './ChipList';
import { ChipSelection } from './ChipSelection';
import { ChipWindow } from './ChipWindow';
import './style.css';
import { BattleContext } from '../../scenes/Battle/Battle';

export const CustomWindow = () => {

  const {battleRef} = useContext(BattleContext);

  let isCustomizing = battleRef.current.isCustomizing;

  return (
    <div className={`custom-window-container ${isCustomizing ? "--open" : "--close"}`}>
        <div className="custom-window-col cw-col-1">
            <ChipWindow />
            <ChipList />
        </div>
        <div className="custom-window-col cw-col-2">
            <ChipSelection />
        </div>
    </div>
  )
}

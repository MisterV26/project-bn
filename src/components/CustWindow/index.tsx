import React, { useContext } from 'react';
import { ChipSelect } from './ChipSelect';
import { ChipSelection } from './ChipSelection';
import { ChipWindow } from './ChipWindow';
import './style.css';
import { BattleContext } from '../../scenes/Battle/Battle';
import { IBattleProperties } from '../../Interfaces/IBattleProperties';
import { OkButton } from './OkButton';

export const CustomWindow = () => {

  const {battleRef} = useContext(BattleContext);

  let battleProperties: IBattleProperties = battleRef.current.battleProperties;
  let isCustomizing = battleProperties.isCustomizing;

 
  return (
    <div className={`custom-window-container ${isCustomizing ? "--open" : "--close"}`}>
        <div className="custom-window-col cw-col-1">
            <ChipWindow />
            <ChipSelect />
        </div>
        <div className="custom-window-col cw-col-2">
            <ChipSelection />
            <OkButton />
        </div>
    </div>
  )
}

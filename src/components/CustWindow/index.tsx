import React from 'react';
import { ChipList } from './ChipList';
import { ChipSelection } from './ChipSelection';
import { ChipWindow } from './ChipWindow';
import './style.css';

interface Props {
    isCustomizing: boolean;
}

export const CustomWindow = ({isCustomizing}: Props) => {
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

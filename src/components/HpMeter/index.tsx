import React from "react";
import "./style.css";

interface Props {
  maxHp: number;
  currentHp: number;
}

export const HpMeter = ({ maxHp, currentHp }: Props) => {

  const getHpColor = (max: number, current: number) => {
    //get percentage
    let percent = (current / max) * 100;

    if(percent <= 10){
        return 'hp-red';
    }else{
        return 'hp-blue';
    }
    //change color when under or over 10%
  };

  return (
    <div className="hp-meter-container">
      <p className={getHpColor(maxHp, currentHp)}>{currentHp ?? 0}</p>
    </div>
  );
};

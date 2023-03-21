import React, { useEffect, useState } from "react";
import { Player } from "../../components/Player";
import { Stage } from "../../components/Stage";
import { IPanelsContext } from "../../Interfaces/IPanelsContext";
import { IPanel } from "../../Interfaces/IPanel";
import { IPlayer } from "../../Interfaces/IPlayer";
import "./style.css";
import { Debugger } from "../../components/Debugger";
import { IEnemy } from "../../Interfaces/IEnemy";
import { Enemy } from "../../components/Enemy";
import { HpMeter } from "../../components/HpMeter";
import { CustomBar } from "../../components/CustBar";
import { ICustomizerBar } from "../../Interfaces/ICustomizerBar";
import { StatusWindow } from "../../components/StatusWindow";

export const StageContext = React.createContext({} as IPanelsContext);

export const Battle = () => {
  const [custBar, setCustBar] = useState<ICustomizerBar>({
    value: 1,
    full: false
  });
  const [panels, setPanels] = useState<IPanel[]>([]);
  const [player, setPlayer] = useState<IPlayer>({
    maxHp: 100,
    currentHp: 100,
    status: "normal",
    position: { x: 1, y: 1 },
  });
  const [enemy, setEnemy] = useState<IEnemy>({
    hp: 300,
    status: "normal",
    position: { x: 4, y: 1 },
  });


  const handleKeyPress = (event: any) => {
    const key = event.key;

    if (player) {
      switch (key) {
        case "ArrowRight":
          if (player.position.x < 2) {
            setPlayer((prev) => ({
              ...prev,
              position: { x: prev.position.x++, y: prev.position.y },
            }));
          }
          break;
        case "ArrowLeft":
          if (player.position.x > 0) {
            setPlayer((prev) => ({
              ...prev,
              position: { x: prev.position.x--, y: prev.position.y },
            }));
          }
          break;
        case "ArrowUp":
          if (player.position.y > 0) {
            setPlayer((prev) => ({
              ...prev,
              position: { x: prev.position.x, y: prev.position.y-- },
            }));
          }
          break;
        case "ArrowDown":
          if (player.position.y < 2) {
            setPlayer((prev) => ({
              ...prev,
              position: { x: prev.position.x, y: prev.position.y++ },
            }));
          }
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    const updateCust = () => {
      if(custBar.value >= 100){
        setCustBar(prev => ({...prev, full: true}));
      }
      if(!custBar.full && custBar.value < 100){
        setCustBar(prev => ({...prev, value: prev.value + 0.1}));
      }
    }
    setTimeout(() => updateCust(), 1000 / 60);
  }, [custBar.value, custBar.full]);


  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress, false);
    return () => {
      window.removeEventListener("keydown", handleKeyPress, false);
    }
  }, [player.position]);

  return (
    <StageContext.Provider value={{ panels, setPanels }}>
      <div className="battle">
        <Debugger player={player} enemy={enemy} custBar={custBar} />
        <div className="scene-header">
          <div className="player-status">
            <HpMeter {...player} />
            <StatusWindow />
          </div>
          <CustomBar fillValue={custBar.value}/>
        </div>
        <Player {...player} />
        <Enemy {...enemy} />
        <Stage />
      </div>
    </StageContext.Provider>
  );
};

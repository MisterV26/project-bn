import React, { createContext, useEffect, useRef, useState } from "react";
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
import { CustomWindow } from "../../components/CustWindow";
import { ISpriteDataContext } from "../../Interfaces/ISpriteDataContext";

export const StageContext = createContext({} as IPanelsContext);
export const SpriteDataContext = createContext({} as ISpriteDataContext);

const SpriteData = require('../../globals/SpriteData.json');


export const Battle = () => {
  const [ticks, setTicks] = useState(0);

  const [isCustomizing, setIsCustomizing] = useState(false);
  const [custBar, setCustBar] = useState<ICustomizerBar>({
    value: 1,
    full: false,
  });
  const [spriteData, setSpriteData] = useState(SpriteData);
  const [panels, setPanels] = useState<IPanel[]>([]);
  const [player, setPlayer] = useState<IPlayer>({
    maxHp: 500,
    currentHp: 500,
    status: "normal",
    position: { x: 1, y: 1 },
  });

  const playerRef = useRef(player);
  const customBarRef = useRef(custBar);

  const [enemy, setEnemy] = useState<IEnemy>({
    name: 'bass',
    hp: 1500,
    status: "normal",
    position: { x: 4, y: 1 },
  });

  // Updated whenever player ref state changes
  // You cannot use state to check conditionals because it is async.
  // Use ref to track conditionals.
  playerRef.current = player;
  customBarRef.current = custBar;


  const handleKeyPress = (event: any) => {
    const key = event.key;

    if (player) {
      switch (key) {
        case "ArrowRight":
          if (playerRef.current.position.x < 2) {
            setPlayer((prev) => ({
              ...prev,
              position: { x: prev.position.x+=1, y: prev.position.y },
            }));
          }
          break;
        case "ArrowLeft":
          if (playerRef.current.position.x > 0) {
            setPlayer((prev) => ({
              ...prev,
              position: { x: prev.position.x-=1, y: prev.position.y },
            }));
          }
          break;
        case "ArrowUp":
          if (playerRef.current.position.y > 0) {
            setPlayer((prev) => ({
              ...prev,
              position: { x: prev.position.x, y: prev.position.y-=1 },
            }));
          }
          break;
        case "ArrowDown":
          if (playerRef.current.position.y < 2) {
            setPlayer((prev) => ({
              ...prev,
              position: { x: prev.position.x, y: prev.position.y+=1 },
            }));
          }
          break;
        case "a":
          console.log(custBar.full)
          if(custBar.full){
            setIsCustomizing(true);
            setCustBar((prev) => ({ ...prev, value: 0 }));
          }
          break;
        case "l":
          setIsCustomizing(!isCustomizing);
          setCustBar((prev) => ({ ...prev, full: false }));
          break;
        default:
          break;
      }
      console.log(playerRef.current.position)
    }
  };

  const updateCustomBar = () => {
      if (customBarRef.current.value >= 100) {
        setCustBar((prev) => ({ ...prev, full: true }));
      }
      if (!custBar.full && customBarRef.current.value < 100) {
        setCustBar((prev) => ({ ...prev, value: prev.value + 0.1 }));
      }
  };
  
  useEffect(()=>{
    // Execute IF component successfully mounts.
    let frameId: any;
    // process input
    window.addEventListener("keydown", handleKeyPress, false);
    const frame = (time: any) => {
      
      // Update logic
      setTicks(time);
      updateCustomBar();
      frameId = requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);

    // Cancel animation frame, right before component removed
    return () => {
      window.removeEventListener("keydown", handleKeyPress, false);
      cancelAnimationFrame(frameId);
    };
  }, []);

  // render
  return (
    <StageContext.Provider value={{ panels, setPanels }}>
      <div className="battle">
        <Debugger
          ticks={ticks}
          player={player}
          enemy={enemy}
          custBar={custBar}
          isCustomizing={isCustomizing}
        />
        <CustomWindow isCustomizing={isCustomizing} />
        <div className="scene-header">
          <div
            className={`window-margin ${isCustomizing ? "--open" : "--close"}`}
          ></div>
          <div className="player-status">
            <HpMeter {...player} />
            <StatusWindow />
          </div>
          {!isCustomizing && <CustomBar fillValue={custBar.value} />}
        </div>
        <SpriteDataContext.Provider value={{ spriteData, setSpriteData}}>
        <Player isCustomizing={isCustomizing} player={player}  />
        <Enemy isCustomizing={isCustomizing} enemy={enemy} ticks={ticks} />
        <Stage isCustomizing={isCustomizing}/>
        </SpriteDataContext.Provider>
      </div>
    </StageContext.Provider>
  );
};

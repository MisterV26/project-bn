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
import { IBattleProperties as IBattleProperties } from "../../Interfaces/IBattleProperties";
import { StatusWindow } from "../../components/StatusWindow";
import { CustomWindow } from "../../components/CustWindow";
import { ISpriteDataContext } from "../../Interfaces/ISpriteDataContext";
import { IBattleContext } from "../../Interfaces/IBattleContext";
import { IBattle } from "../../Interfaces/IBattle";
import { useJoypad } from "../../hooks/useJoypad";

export const BattleContext = createContext({} as IBattleContext);
export const StageContext = createContext({} as IPanelsContext);
export const SpriteDataContext = createContext({} as ISpriteDataContext);

const SpriteData = require("../../globals/SpriteData.json");

export const Battle = () => {
  const [ticks, setTicks] = useState(0);

  const [battleProperties, setBattleProperties] = useState<IBattleProperties>({
    customBarValue: 1,
    customBarFull: false,
    isCustomizing: false,
    battleIsPaused: false
  });
  const [spriteData, setSpriteData] = useState(SpriteData);
  const [panels, setPanels] = useState<IPanel[]>([]);
  const [battle, setBattle] = useState<IBattle>({} as IBattle);
  const [player, setPlayer] = useState<IPlayer>({
    maxHp: 500,
    currentHp: 500,
    status: "normal",
    position: { x: 1, y: 1 },
  });

  const [enemy, setEnemy] = useState<IEnemy>({
    name: "bass",
    hp: 1500,
    status: "normal",
    position: { x: 4, y: 1 },
  });

  const ticksRef = useRef(ticks);
  const timeStampRef = useRef("00:00:00");
  const playerRef = useRef(player);
  const enemyRef = useRef(enemy);
  const battlePropertiesRef = useRef(battleProperties);

  const battleRef = useRef({
    ticks: ticksRef.current,
    timeStamp: timeStampRef.current,
    player: playerRef.current,
    enemy: enemyRef.current,
    battleProperties: battlePropertiesRef.current,
  });

  // Updated whenever player ref state changes
  // You cannot use state to check conditionals because it is async.
  // Use ref to track conditionals.
  ticksRef.current = ticks;
  playerRef.current = player;
  battlePropertiesRef.current = battleProperties;

  battleRef.current = {
    ticks: ticksRef.current,
    timeStamp: timeStampRef.current,
    player: playerRef.current,
    enemy: enemyRef.current,
    battleProperties: battlePropertiesRef.current,
  };

  const joypad = useJoypad({battleContext: battleRef, battle: battle, setBattle: setBattle});  



  const updateTime = (s: any) => {
    let ms = s % 1000;
    s = (s - ms) / 1000;

    let secs = s % 60;
    s = (s - secs) / 60;
    
    let mins = s % 60;

    return `${mins < 10 ? '0'+mins : mins}:${secs < 10 ? '0'+secs : secs}:${ms < 10 ? '0'+ms : ms}`;
  }

  const updateCustomBar = () => {
    if (battlePropertiesRef.current.customBarValue >= 100) {
      battlePropertiesRef.current.customBarFull = true;
    }
    if (!battleProperties.customBarFull && battlePropertiesRef.current.customBarValue < 100) {
      battlePropertiesRef.current.customBarValue += 0.1;
    }
  };

  useEffect(() => {
    // Execute IF component successfully mounts.
    let frameId: any;
    // process input
    window.addEventListener("keydown", joypad.handleKeyPress, false);
    
    const frame = (time: any) => {
      // Update logic
      setTicks(time%100);
      if (!battleProperties.battleIsPaused) {
        timeStampRef.current = updateTime(time);
        updateCustomBar();
      }
      frameId = requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);

    // Cancel animation frame, right before component removed
    return () => {
      window.removeEventListener("keydown", joypad.handleKeyPress, false);
      cancelAnimationFrame(frameId);
    };
  }, []);

  // render
  return (
    <BattleContext.Provider value={{ battleRef, battle, setBattle }}>
      <div className="battle">
        <Debugger />
        <CustomWindow />
        <div className="scene-header">
          <div className={`window-margin ${battlePropertiesRef.current.isCustomizing ? "--open" : "--close"}`}></div>
          <div className="player-status">
            <HpMeter {...playerRef.current} />
            <StatusWindow />
          </div>
          {!battlePropertiesRef.current.isCustomizing && (
            <CustomBar fillValue={battlePropertiesRef.current.customBarValue} />
          )}
        </div>
        <SpriteDataContext.Provider value={{ spriteData, setSpriteData }}>
          <Player />
          <Enemy />
          <Stage isCustomizing={battlePropertiesRef.current.isCustomizing} />
        </SpriteDataContext.Provider>
      </div>
    </BattleContext.Provider>
  );
};

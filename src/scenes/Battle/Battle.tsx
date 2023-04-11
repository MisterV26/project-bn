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
import { IBattleContext } from "../../Interfaces/IBattleContext";
import { IBattle } from "../../Interfaces/IBattle";

export const BattleContext = createContext({} as IBattleContext);
export const StageContext = createContext({} as IPanelsContext);
export const SpriteDataContext = createContext({} as ISpriteDataContext);

const SpriteData = require("../../globals/SpriteData.json");

export const Battle = () => {
  const [ticks, setTicks] = useState(0);

  const [customBar, setCustomBar] = useState<ICustomizerBar>({
    value: 1,
    full: false,
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

  const battleIsPausedRef = useRef(false);
  const ticksRef = useRef(ticks);
  const playerRef = useRef(player);
  const enemyRef = useRef(enemy);
  const customBarRef = useRef(customBar);
  const isCustomizingRef = useRef(false);

  const battleRef = useRef({
    battleIsPaused: battleIsPausedRef.current,
    ticks: ticksRef.current,
    player: playerRef.current,
    enemy: enemyRef.current,
    customBar: customBarRef.current,
    isCustomizing: isCustomizingRef.current
  });

  // Updated whenever player ref state changes
  // You cannot use state to check conditionals because it is async.
  // Use ref to track conditionals.
  ticksRef.current = ticks;
  playerRef.current = player;
  customBarRef.current = customBar;

  battleRef.current = {
    battleIsPaused: battleIsPausedRef.current,
    ticks: ticksRef.current,
    player: playerRef.current,
    enemy: enemyRef.current,
    customBar: customBarRef.current,
    isCustomizing: isCustomizingRef.current
  };

  const handleKeyPress = (event: any) => {
    const key = event.key;

    switch (key) {
      case "ArrowRight":
        if (ifCanMovePlayer() && playerRef.current.position.x < 2) {
          playerRef.current.position.x += 1;
        }
        break;
      case "ArrowLeft":
        if (ifCanMovePlayer() && playerRef.current.position.x > 0) {
          playerRef.current.position.x -= 1;
        }
        break;
      case "ArrowUp":
        if (ifCanMovePlayer() && playerRef.current.position.y > 0) {
          playerRef.current.position.y -= 1;
        }
        break;
      case "ArrowDown":
        if (ifCanMovePlayer() && playerRef.current.position.y < 2) {
          playerRef.current.position.y += 1;
        }
        break;
      case "a":
        if (customBarRef.current.full) {
          isCustomizingRef.current = true;
          togglePauseBattle();
          customBarRef.current.value = 0;
        }
        break;
      case "l":
        isCustomizingRef.current = false;
        togglePauseBattle();
        customBarRef.current.full = false;
        break;

      case "Enter":
        console.log(6);
        if (!isCustomizingRef.current) {
          togglePauseBattle();
        }
        break;
      default:
        break;
    }
  };

  const ifCanMovePlayer = () => {
    return player && !battleIsPausedRef.current;
  };

  const togglePauseBattle = (state?: boolean) => {
    if (state) {
      battleIsPausedRef.current = state;
      return;
    }
    battleIsPausedRef.current = !battleIsPausedRef.current;
  };

  const updateCustomBar = () => {
    if (customBarRef.current.value >= 100) {
      customBarRef.current.full = true;
    }
    if (!customBar.full && customBarRef.current.value < 100) {
      customBarRef.current.value += 0.1;
    }
  };

  useEffect(() => {
    // Execute IF component successfully mounts.
    let frameId: any;
    // process input
    window.addEventListener("keydown", handleKeyPress, false);
    const frame = (time: any) => {
      // Update logic
      setTicks(time);
      if (!battleIsPausedRef.current) {
        updateCustomBar();
      }
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
    <BattleContext.Provider value={{ battleRef, battle, setBattle }}>
      <div className="battle">
        <Debugger />
        <CustomWindow />
        <div className="scene-header">
          <div className={`window-margin ${isCustomizingRef.current ? "--open" : "--close"}`}></div>
          <div className="player-status">
            <HpMeter {...playerRef.current} />
            <StatusWindow />
          </div>
          {!isCustomizingRef.current && (
            <CustomBar fillValue={customBarRef.current.value} />
          )}
        </div>
        <SpriteDataContext.Provider value={{ spriteData, setSpriteData }}>
          <Player />
          <Enemy />
          <Stage isCustomizing={isCustomizingRef.current} />
        </SpriteDataContext.Provider>
      </div>
    </BattleContext.Provider>
  );
};

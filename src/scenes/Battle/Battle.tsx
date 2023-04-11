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

const SpriteData = require("../../globals/SpriteData.json");

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

  const battleIsPaused = useRef(false);
  const ticksRef = useRef(ticks);
  const playerRef = useRef(player);
  const customBarRef = useRef(custBar);

  const [enemy, setEnemy] = useState<IEnemy>({
    name: "bass",
    hp: 1500,
    status: "normal",
    position: { x: 4, y: 1 },
  });

  // Updated whenever player ref state changes
  // You cannot use state to check conditionals because it is async.
  // Use ref to track conditionals.
  ticksRef.current = ticks;
  playerRef.current = player;
  customBarRef.current = custBar;

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
          setIsCustomizing(true);
          togglePauseBattle();
          customBarRef.current.value = 0;
        }
        break;
      case "l":
        setIsCustomizing(false);
        togglePauseBattle();
        customBarRef.current.full = false;
        break;

      case "Enter":
        console.log(6);
        if (!isCustomizing) {
          togglePauseBattle();
        }
        break;
      default:
        break;
    }
  };

  const ifCanMovePlayer = () => {
    return player && !battleIsPaused.current;
  };

  const togglePauseBattle = (state?: boolean) => {
    if (state) {
      battleIsPaused.current = state;
      return;
    }
    battleIsPaused.current = !battleIsPaused.current;
  };

  const updateCustomBar = () => {
    if (customBarRef.current.value >= 100) {
      customBarRef.current.full = true;
    }
    if (!custBar.full && customBarRef.current.value < 100) {
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
      if (!battleIsPaused.current) {
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
    <StageContext.Provider value={{ panels, setPanels }}>
      <div className="battle">
        <Debugger
          ticks={ticksRef.current}
          player={playerRef.current}
          enemy={enemy}
          custBar={customBarRef.current}
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
          {!isCustomizing && (
            <CustomBar fillValue={customBarRef.current.value} />
          )}
        </div>
        <SpriteDataContext.Provider value={{ spriteData, setSpriteData }}>
          <Player
            isCustomizing={isCustomizing}
            player={playerRef.current}
            battleIsPaused={battleIsPaused.current}
          />
          <Enemy
            isCustomizing={isCustomizing}
            enemy={enemy}
            ticks={ticks}
            battleIsPaused={battleIsPaused.current}
          />
          <Stage isCustomizing={isCustomizing} />
        </SpriteDataContext.Provider>
      </div>
    </StageContext.Provider>
  );
};

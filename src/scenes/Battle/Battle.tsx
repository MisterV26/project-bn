import React, { useEffect, useState } from "react";
import { Player } from "../../components/Player";
import { Stage } from "../../components/Stage";
import { IPanelsContext } from "../../Interfaces/IPanelsContext";
import { IPanel } from "../../Interfaces/IPanel";
import { IPlayer } from "../../Interfaces/IPlayer";
import "./style.css";
import { ICoordinates } from "../../Interfaces/ICoordinates";
import { Debugger } from "../../components/Debugger";

export const StageContext = React.createContext({} as IPanelsContext);

export const Battle = () => {
  const [panels, setPanels] = useState<IPanel[]>([]);
  const [player, setPlayer] = useState<IPlayer>({ hp: 1000, status:'normal', position:{x:1, y:1}});

  const handleKeyPress = (event: any) => {
    const key = event.key;

    if(player){
      switch (key) {
        case "ArrowRight":
          if (player.position.x < 2) {
            setPlayer(prev => ({...prev, position: {x: prev.position.x++, y:prev.position.y}} ));
          }
          break;
        case "ArrowLeft":
          if (player.position.x > 0) {
            setPlayer(prev => ({...prev, position: {x: prev.position.x--, y:prev.position.y}}));
          }
          break;
        case "ArrowUp":
          if (player.position.y > 0) {
            setPlayer(prev => ({...prev, position: {x: prev.position.x, y:prev.position.y--}}));
          }
          break;
        case "ArrowDown":
          if (player.position.y < 2) {
            setPlayer(prev => ({...prev, position: {x: prev.position.x, y:prev.position.y++}}));
          }
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress, false);
    return () => window.removeEventListener("keydown", handleKeyPress, false);
  }, [player.position]);

  return (
    <StageContext.Provider value={{ panels, setPanels }}>
      <div className="battle">
        <Debugger player={player}/>
        <Player {...player} />
        <Stage />
      </div>
    </StageContext.Provider>
  );
};

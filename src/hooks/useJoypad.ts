import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useContext,
} from "react";
import { IBattle } from "../Interfaces/IBattle";
import { IBattleProperties } from "../Interfaces/IBattleProperties";

interface Props {
  battleContext: MutableRefObject<any>;
  battle: IBattle;
  setBattle: Dispatch<SetStateAction<IBattle>>;
}

export const useJoypad = ({ battleContext, battle, setBattle }: Props) => {
  let player = battleContext.current.player;
  let battleProperties: IBattleProperties =
    battleContext.current.battleProperties;

  const ifCanMovePlayer = () => {
    return player && !battleProperties.battleIsPaused;
  };

  const togglePauseBattle = (state?: boolean) => {
    if (state) {
        battleProperties.battleIsPaused = state;
      return;
    }
    battleProperties.battleIsPaused = !battleProperties.battleIsPaused;
  };

  return {
    handleKeyPress: (event: any) => {
      const key = event.key;

      switch (key) {
        case "ArrowRight":
          if (ifCanMovePlayer() && player.position.x < 2) {
            player.position.x += 1;
          }
          if(battleProperties.isCustomizing){
            battleContext.current.cursorSlotPosition.x += 1;
          }
          break;
        case "ArrowLeft":
          if (ifCanMovePlayer() && player.position.x > 0) {
            player.position.x -= 1;
          }
          if(battleProperties.isCustomizing){
            battleContext.current.cursorSlotPosition.x -= 1;
          }
          break;
        case "ArrowUp":
          if (ifCanMovePlayer() && player.position.y > 0) {
            player.position.y -= 1;
          }
          break;
        case "ArrowDown":
          if (ifCanMovePlayer() && player.position.y < 2) {
            player.position.y += 1;
          }
          break;
        case "a":
          if (
            battleProperties.customBarFull &&
            !battleProperties.isCustomizing
          ) {
            battleProperties.isCustomizing = true;
            battleProperties.customBarValue = 0;
            togglePauseBattle();
          }
          break;
        case "l":
          battleProperties.isCustomizing = false;
          battleProperties.customBarFull = false;
          togglePauseBattle();
          break;

        case "Enter":
          if (!battleProperties.isCustomizing) {
            togglePauseBattle();
          }
          break;
        default:
          break;
      }
    },
  };
};

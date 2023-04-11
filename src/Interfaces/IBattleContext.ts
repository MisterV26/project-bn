import { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";
import { IPanel } from "./IPanel";
import { IPlayer } from "./IPlayer";
import { IBattle } from "./IBattle";

export interface IBattleContext {
    battleRef: any;
    battle: IBattle;
    setBattle: Dispatch<SetStateAction<IBattle>>
  }
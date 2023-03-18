import { Dispatch, SetStateAction } from "react";
import { IPanel } from "./IPanel";
import { IPlayer } from "./IPlayer";

export interface IPanelsContext {
    panels: IPanel[];
    setPanels: Dispatch<SetStateAction<IPanel[]>>
  }
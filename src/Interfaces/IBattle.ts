import { IPanel } from "./IPanel";

export interface IBattle {
    battleIsPaused: boolean;
    panels: IPanel[];
}
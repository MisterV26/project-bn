import { ICoordinates } from "./ICoordinates";
import { IPanelType } from "./IPanelType";

export interface IPanel {
    id: number;
    position: ICoordinates;
    type: "player" | "enemy";
    status: "normal" | "cracked";
}
import { ICoordinates } from "./ICoordinates";
import { IPanelType } from "./IPanelType";

export interface IPanel {
    id: any;
    position: ICoordinates;
    type: "player" | "enemy";
    status: "normal" | "cracked";
}
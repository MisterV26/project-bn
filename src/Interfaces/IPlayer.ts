import { ICoordinates } from "./ICoordinates";

export interface IPlayer {
    hp: number;
    position: ICoordinates;
    status?: string;

}
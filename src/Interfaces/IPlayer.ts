import { ICoordinates } from "./ICoordinates";

export interface IPlayer {
    maxHp: number;
    currentHp: number;
    position: ICoordinates;
    status?: string;

}
import { ICoordinates } from "./ICoordinates";

export interface IEnemy {
    hp: number;
    position: ICoordinates;
    status?: string;

}
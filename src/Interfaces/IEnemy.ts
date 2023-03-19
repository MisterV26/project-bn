import { ICoordinates } from "./ICoordinates";

export interface IEnemy {
    hp?: any;
    position: ICoordinates;
    status?: string;

}
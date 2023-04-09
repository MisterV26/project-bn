import { ICoordinates } from "./ICoordinates";

export interface IEnemy {
    name: string;
    hp: number;
    position: ICoordinates;
    status?: string;

}
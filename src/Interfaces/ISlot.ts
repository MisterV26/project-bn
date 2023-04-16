import { IChip } from "./IChip";

export interface ISlot {
    [key: number]: string | number;
    id?: number;
    hover?: boolean;
    chip?: IChip;
    position?: { x: number; y: number };
  }
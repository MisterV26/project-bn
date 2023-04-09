import { Dispatch, SetStateAction } from "react";

export interface ISpriteDataContext {
    spriteData: any;
    setSpriteData: Dispatch<SetStateAction<any>>
  }
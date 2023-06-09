import { ICoordinates } from "../Interfaces/ICoordinates";

export const usePosition = (width: number, height: number) => {
  return {
    calculatePosition: (position: ICoordinates): ICoordinates => {
      const panelWidth = 191;
      const panelHeight = 86;

      let resultPosition: ICoordinates = {
        x: 0,
        y: 0,
      };

      const calculateX = (x: number): number =>
        panelWidth * (x + 1) - panelWidth / 2 - width / 2;
      const calculateY = (y: number): number =>
        panelHeight * 3 + 20 - panelHeight * y - height / 4;

      resultPosition = {
        x: calculateX(position.x) + 3,
        y: calculateY(position.y),
      };
      return resultPosition;
    },
  };
};

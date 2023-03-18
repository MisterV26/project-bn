import { ICoordinates } from "../Interfaces/ICoordinates";

interface Entity {
    width: number,
    height: number
}

export const usePosition = (width: number, height: number) => {
return {
    calculatePosition : (position: ICoordinates):ICoordinates => {
        const panelWidth = 190;
        const panelHeight = 86;
    
        let resultPosition: ICoordinates = {
          x:0,
          y:0
        };
    
        const calculateX = (x: number): number => ((panelWidth * (x + 1)) - (panelWidth / 2)) - (width / 2);
        const calculateY = (y: number): number => ((((panelHeight * 3) + 20) - (panelHeight * y)) - (height / 2))
    
    
        resultPosition = {
          x: calculateX(position.x),
          y: calculateY(position.y)
        }
        return resultPosition;
      }
}
}
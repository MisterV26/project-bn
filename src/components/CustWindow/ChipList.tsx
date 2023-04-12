import React, { useContext, useEffect, useRef, useState } from "react";
import { BattleContext } from "../../scenes/Battle/Battle";

interface ISlot {
  [key: number]: string | number;
  id?: number;
  hover?: boolean;
  chip?: IChip;
  position?: { x: number; y: number };
}

interface IChip {
  id?: string;
  name?: string;
  code?: string;
}

export const ChipList = () => {
  const {battleRef} = useContext(BattleContext);

  let cursorPosition = battleRef.current.cursorSlotPosition;

  const [cursorPos, setCursorPos] = useState(cursorPosition);

  let slots = useRef<ISlot[][]>([]);

  const setupSlots = async () => {
    const ROWS = 2;
    const COLUMNS = 5;

    let index = 0;
    let slotsToBeSet: ISlot[][] = [];

    let slot: ISlot;

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLUMNS; col++) {
        if (index < 8) {
          slot = {
            id: index,
            position: { x: col, y: row },
            hover: false,
          };
          if (!slotsToBeSet[row]) {
            slotsToBeSet[row] = [];
          }
          slotsToBeSet[row][col] = slot;
          index++;
        }
      }
    }
    return slotsToBeSet;
  };

  const resetCursor = () => {
    slots.current.map((row) => {
      row.map((slot) => {
        slot.hover = false;
      })
    })
  }

  const cursorSlot = (x: number, y:number) => {
  
    resetCursor();
    slots.current[y][x] = {...slots.current[y][x], hover:true};
  };

  useEffect(() => {
    const setup = async () => {
      let initialSlots = await setupSlots();
      slots.current = initialSlots;
      cursorSlot(cursorPosition.x, cursorPosition.y);
    };
    setup();
  }, [cursorPosition.x]);

  return (
    <div className="chip-list-container">
      {slots.current &&
        slots.current.length > 0 &&
        slots.current.map(
          (row, index) =>
            row &&
            row.length > 0 &&
            row.map((slot, index) => (
              <div className="list-chip" key={index}>
                <div className="list-chip-icon">
                  <div
                    className={`list-chip-cursor ${
                      slot.hover ? "--hover" : ""
                    }`}
                  ></div>
                </div>
                <div className="list-chip-letter">{slot.chip?.code ?? "-"}</div>
              </div>
            ))
        )}
    </div>
  );
};

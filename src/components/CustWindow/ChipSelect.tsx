import React, { useContext, useEffect, useRef, useState } from "react";
import { BattleContext } from "../../scenes/Battle/Battle";
import { IChip } from "../../Interfaces/IChip";
import { ISlot } from "../../Interfaces/ISlot";

export const ChipSelect = () => {
  const { battleRef } = useContext(BattleContext);

  let cursorPosition = battleRef.current.cursorSlotPosition;
  let slots: ISlot[][] = battleRef.current.slots;


  return (
    <>
    <div className="chip-select-header">C h i p  S e l e c t</div>
    <div className="chip-select-container">
      {battleRef.current.slots &&
        slots.length > 0 &&
        slots.map(
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
    </>
  );
};

import React, { useContext, useEffect, useState } from "react";
import { panelTypeMap } from "../../globals/PanelMap";
import { IPanel } from "../../Interfaces/IPanel";
import { IPlayer } from "../../Interfaces/IPlayer";
import { BattleContext, StageContext } from "../../scenes/Battle/Battle";
import { Panel } from "../Panel";
import "./style.css";

interface Props {
  isCustomizing: boolean;
}

export const Stage = ({isCustomizing}: Props) => {
  const { battle, setBattle } = useContext(BattleContext);

  const ROWS = 3;
  const COLUMNS = 6;

  const getPanelType = (index: number): "player" | "enemy" => {
    return panelTypeMap[index]?.type ?? "enemy";
  };

  const setupPanels = async () => {
    let index = 0;
    let panelsToBeSet: IPanel[] = [];
    let panel: IPanel;

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLUMNS; col++) {
        panel = {
          id: index,
          position: { x: col, y: row },
          type: getPanelType(index),
          status: "normal",
        };
        panelsToBeSet.push(panel);
        index++;
      }
    }
    return panelsToBeSet;
  };

  useEffect(() => {
    const setUp = async () => {
      let initialPanels = await setupPanels();
      setBattle((prev)=>({...prev, panels: initialPanels}));
    };
    setUp();
  }, []);

  return (
    <div className={`stage ${isCustomizing ? "--customizing" : "--battling"}`}>
      <div className="stage-overlay"></div>
      {battle.panels && battle.panels.length > 0 ? (
        battle.panels.map((panel: IPanel) => <Panel key={panel.id} {...panel} />)
      ) : (
        <></>
      )}
    </div>
  );
};

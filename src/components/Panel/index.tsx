import React, { useState } from "react";
import { IPanel } from "../../Interfaces/IPanel";

import "./style.css";

export const Panel = (props: IPanel) => {
  const [panelProps, setPanelProps] = useState(props);

  const getPanelType = (panelType: string) => {
    if (panelType === "player") {
      return "panel-player";
    }

    if (panelType === "enemy") {
      return "panel-enemy";
    }
  };

  const panelDebug = (
    <span className="panel-debug">
      id: {props.id} | 
      pos: [{props.position.x}, {props.position.y}] | 
      type:{" "}
      {props.type} |
      status: {props.status}
    </span>
  );

  return (
    <div className="panel-container">
      <div className={`panel ${getPanelType(props.type)}`}>
        <div className="inner-panel">
        {panelDebug}
        </div>
      </div>
    </div>
  );
};

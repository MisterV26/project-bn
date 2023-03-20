import React, { useEffect, useRef, useState } from "react";
import "./style.css";

interface Props {
    fillValue: number;
}

export const CustomBar = ({fillValue=0}: Props) => {


  let customBarRef = useRef<any>(null);

  const calculateFill = (fillValue: number) => {

    return (fillValue / 100) * (customBarRef.current?.clientWidth ?? 0);
  };

  return (
    <div className="custom-bar-container">
      <div className="custom-bar-header">
        <p>Custom</p>
      </div>
      <div className="custom-bar" ref={customBarRef}>
      <div className="fill" style={{width: calculateFill(fillValue)}}></div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";

export const ChipList = () => {
  const [chipList, setChipList] = useState([{}]);

  useEffect(() => {
    setChipList([{}, {}, {}, {}, {}, {}, {}, {}]);
  }, []);

  return (
    <div className="chip-list-container">
      {chipList.map((chip, index) => (
        <div className="list-chip" key={index}>
          <div className="list-chip-icon"></div>
          <div className="list-chip-letter" >X</div>
        </div>
      ))}
    </div>
  );
};

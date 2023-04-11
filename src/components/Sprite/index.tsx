import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.css";
import { BattleContext } from "../../scenes/Battle/Battle";
import { IBattleProperties } from "../../Interfaces/IBattleProperties";
import { EnemyHpMeter } from "../EnemyHpMeter";

interface Images {
  [key: string]: any;
}

const images: Images = {
  sheet_megaman: require("../../globals/images/MM_EXE4_b_reg.png"),
  sheet_forte: require("../../globals/images/Forte_EXE5_b.gif"),
};

export const Sprite = ({ ...props }) => {
  const [frameIndex, setFrameIndex] = useState(0);
  const { battleRef } = useContext(BattleContext);

  let battleProperties: IBattleProperties = battleRef.current.battleProperties;
  let battleIsPaused = battleProperties.battleIsPaused;
  let isCustomizing = battleProperties.isCustomizing;

  let sprite = props.spriteData.sprite;
  let sheet = images[sprite.sheet];
  let scale = 8.5;

  let globalTicks = battleRef.current.ticks;
  let ticks = useRef(0);
  let frame = useRef(0);
  let incrementDirection = useRef(1);

  const getSprite = (sequence: string, animated: boolean = false) => {
    let index = frameIndex;

    if (!animated) {
      index = 0;
    }

    let properties = {
      backgroundImage: `url(${sheet})`,
      backgroundPosition: `${sprite[sequence][index].x}px ${sprite[sequence][index].y}px`,
      backgroundSize: `1440px`,
      width: `${sprite[sequence][index].width}px`,
      height: `${sprite[sequence][index].height}px`,
    };

    return properties;
  };

  const loopAnimationIndex = () => {
    frame.current += incrementDirection.current;

    if (0 === frame.current % (sprite[props.state].length - 1)) {
      incrementDirection.current *= -1;
    }
    setFrameIndex(frame.current);
  };

  const updateAnimation = (speed: number) => {
    ticks.current += 1;
    if (0 === ticks.current % speed) {
      ticks.current = 0;
      loopAnimationIndex();
    }
  };

  useEffect(() => {
    if (!battleIsPaused) {
      updateAnimation(8);
    }
  }, [globalTicks]);

  return (
    props && (
      <div
        className={`entity_object ${isCustomizing ? "--standby" : "--active"}`}
      >
        <div
          className={`entity_sprite`}
          style={{ ...getSprite(props.state, props.animated) }}
        ></div>
        {props.spriteData.entityType === 'enemy' && <EnemyHpMeter {...battleRef.current.enemy} />}
      </div>
    )
  );
};

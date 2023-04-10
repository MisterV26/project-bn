import React, { useEffect, useRef, useState } from 'react';
import './style.css';

interface Images {
    [key: string]: any;
  }
  
  const images: Images = {
    "sheet_megaman": require('../../globals/images/MM_EXE4_b_reg.png'),
    "sheet_forte": require('../../globals/images/Forte_EXE5_b.gif'),
  }

export const Sprite = ({...props}) => {

    const [sIndex, setSIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    let sprite = props.spriteData.sprite;
    let sheet = images[sprite.sheet];
    let scale = 8.5;

    let inc = useRef(1);
    let v = useRef(0);

    const getSprite = (sequence: string, animated:boolean = false) => {
        let index = sIndex;

        if(!animated){ index = 0};

        let properties = {
            backgroundImage: `url(${sheet})`,
            backgroundPosition: `${sprite[sequence][index].x}px ${sprite[sequence][index].y}px`,
            backgroundSize: `1440px`,
            width: `${sprite[sequence][index].width}px`,
            height: `${sprite[sequence][index].height}px`
        };

        return properties;
    };

    useEffect(() => {
        v.current += inc.current;

        if(0 === v.current % (sprite[props.state].length - 1)){
            inc.current *= -1;
        }
        setSIndex(v.current);
    }, [props.ticks]);

    return (
        props &&
        <div 
            className="entity_sprite" 
            style={{...getSprite(props.state, props.animated)}}>
        </div>
  )
}

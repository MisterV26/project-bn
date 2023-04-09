import React from 'react';
import './style.css';

interface Images {
    [key: string]: any;
  }
  
  const images: Images = {
    "sheet_megaman": require('../../globals/images/MM_EXE4_b_reg.png'),
    "sheet_forte": require('../../globals/images/Forte_EXE5_b.gif'),
  }

export const Sprite = ({...props}) => {
    console.log(props)
    let sprite = props.spriteData.sprite;
    let sheet = images[sprite.sheet];
    let scale = 8.5;

    const getSprite = (sequence: string) => {
        return {
                backgroundImage: `url(${sheet})`,
                backgroundPosition: `${sprite[sequence][0].x}px ${sprite[sequence][0].y}px`,
                backgroundSize: `${sprite[sequence][0].width * scale}px`,
                width: `${sprite[sequence][0].width}px`,
                height: `${sprite[sequence][0].height}px`
        }
    };

    return (
        props &&
        <div 
            className="entity_sprite" 
            style={{...getSprite('idle')}}>
        </div>
  )
}

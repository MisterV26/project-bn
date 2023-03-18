import React, { useContext, useEffect, useState } from 'react'
import { IPanel } from '../../Interfaces/IPanel';
import { IPlayer } from '../../Interfaces/IPlayer';
import { StageContext } from '../../scenes/Battle/Battle';
import { Panel } from '../Panel';
import './style.css'


export const Stage = () => {

    const {panels, setPanels} = useContext(StageContext);

    const ROWS = 3;
    const COLUMNS = 6;
    
    const setupPanels = async () => {
        let index = 0;
        let panelsToBeSet:IPanel[] = [];
        let panel: IPanel;

        for(let row = 0; row < ROWS; row++){
            for(let col = 0; col < COLUMNS; col++){
                panel = {
                    id: index,
                    position: {x:col, y:row},
                    type: "player",
                    status: "normal"
                };
                panelsToBeSet.push(panel);
                index++;
            }
        }
        return panelsToBeSet;
    }

    useEffect(() => {
        const setUp = async() =>{
            let initialPanels = await setupPanels();
            setPanels(initialPanels);
        };
        setUp();
    }, []);

  return (
    <div className="stage">
        {
        panels && 
        panels.length > 0 ?
        panels.map((panel: IPanel) => <Panel key={panel.id} {...panel} />)
        :
        <></>
        }
    </div>
  )
}

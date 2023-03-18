import React, { useEffect, useState } from 'react'
import { IPanel } from '../../Interfaces/IPanel';
import { Panel } from '../Panel';
import './style.css'

export const Stage = () => {

    const [panels, setPanels] = useState<IPanel[]>([]);
    const [isLoading, setIsloading] = useState(false);

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
                    position: {x:0, y:0},
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
            setIsloading(true);
            let initialPanels = await setupPanels();
            setPanels(initialPanels);
            setIsloading(false);
        };
        setUp();
    }, []);

  return (
    <div className="stage">
        {
        panels && panels.length > 0 && !isLoading ? panels.map((panel: IPanel) => <Panel key={panel.id} {...panel} />)
        :
        <></>
        }
    </div>
  )
}

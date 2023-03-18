import React, { useState } from 'react'
import { Player } from '../../components/Player'
import { Stage } from '../../components/Stage'
import { IPanelsContext } from '../../Interfaces/IPanelsContext'
import { IPanel } from '../../Interfaces/IPanel'
import { IPlayer } from '../../Interfaces/IPlayer'
import './style.css'

export const StageContext = React.createContext({} as IPanelsContext);

export const Battle = () => {
  

  const [panels, setPanels] = useState<IPanel[]>([]);

  return (
    <StageContext.Provider value={{panels, setPanels}}>
      <div className="battle">
      <Player position={{x:0, y:0}}/>
      <Stage />
    </div>
    </StageContext.Provider>
  )
}

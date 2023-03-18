import React, { useState } from 'react'
import { IPanel } from '../../Interfaces/IPanel';

import './style.css'

export const Panel = (props: IPanel) => {
    const [panelProps, setPanelProps] = useState(props);

  return (
    <div className="panel-container">
        <div className="panel">panel</div>
    </div>
  )
}

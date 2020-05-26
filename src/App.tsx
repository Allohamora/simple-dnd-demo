import React from 'react';

import { Custom } from 'components/Custom';
import { DndProvider } from 'react-dnd';
import Backend from "react-dnd-html5-backend"
import { Items } from 'components/Items';

function App() {
  return (
    <div className="app">
      <DndProvider backend={Backend} >

        <div className="test">
          <Custom />
          <Custom />
        </div>
        
        <Items />
      </DndProvider>
    </div>
  );
}

export default App;

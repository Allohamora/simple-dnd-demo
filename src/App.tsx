import React from 'react';
import { Custom } from 'components/Custom';
import { DndProvider } from 'react-dnd';
import Backend from "react-dnd-html5-backend"

function App() {
  return (
    <div className="app">
      <DndProvider backend={Backend} >
        <Custom />
        <Custom />
      </DndProvider>
    </div>
  );
}

export default App;

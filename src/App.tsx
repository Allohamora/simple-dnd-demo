import React from 'react';
import { DndProvider } from 'react-dnd';
import Backend from "react-dnd-html5-backend"
import { Items } from 'components/Items';

function App() {
  return (
    <div className="app">
      <DndProvider backend={Backend} >
        <Items />
      </DndProvider>
    </div>
  );
}

export default App;

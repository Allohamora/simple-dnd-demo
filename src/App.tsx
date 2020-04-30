import React from 'react';
import { FormList } from './components/FormList';
import { DndProvider } from 'react-dnd';
import Backend from "react-dnd-html5-backend"

function App() {
  return (
    <div className="app">
      <DndProvider backend={Backend} >
        <FormList />
        <FormList />
      </DndProvider>
    </div>
  );
}

export default App;

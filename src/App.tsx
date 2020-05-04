import React from 'react';
import { DndProvider } from 'react-dnd';
import Backend from "react-dnd-html5-backend"
import { FormList } from './components/FormList';

function App() {
  return (
    <div className="app">
      <DndProvider backend={Backend} >
        <FormList />
      </DndProvider>
    </div>
  );
}

export default App;

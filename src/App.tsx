import React from 'react';

import { DndProvider } from 'react-dnd';
import Backend from "react-dnd-html5-backend"

import { Custom } from "containers/Custom";
import { Items } from "containers/Items";
 
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;

function App() {
  return (
    <div className="app">
      <DndProvider backend={Backend} >

        <Container>

          <Custom />
          <Custom />
          
        </Container>
        
        <Items />
        
      </DndProvider>
    </div>
  );
}

export default App;

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

const H2 = styled.h2`
  text-align: center;
`;

function App() {
  return (
    <div className="app">
      <DndProvider backend={Backend} >

        <H2>Block 1</H2>
        <Container>
          <Custom />
          <Custom />
        </Container>

        <H2>Block 2</H2>
        <Items />
        
      </DndProvider>
    </div>
  );
}

export default App;

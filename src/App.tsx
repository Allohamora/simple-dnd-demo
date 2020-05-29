import React, { useState } from 'react';
import { List } from 'containers/List';
import styled from 'styled-components';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { iQuotes } from 'containers/List/List';

const Container = styled.div`
  display: flex;
`;

interface State {
  [name: string]: {
    title: string,
    quotes: iQuotes,
  }
}

const App = () => {
  const [state, setState] = useState<State>({
    quotes1: {
      title: "Todo",
      quotes: [
        {
          text: "hi",
          id: `quote-1`
        },
        {
          text: "hi4",
          id: `quote-4`
        }
      ],
    },
    quotes2: {
      title: "Progress",
      quotes: [
        {
          text: "hi2",
          id: `quote-2`
        }
      ],
    },
    quotes3: {
      title: "Complete",
      quotes: [
        {
          text: "hi3",
          id: `quote-3`
        }
      ],
    }
  });

  const dragEndHandler = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    const { index: sIndex, droppableId: sId } = source;
    const { index: dIndex, droppableId: dId } = destination;

    if (sId === dId && sIndex === dIndex) return;

    const from = state[sId].quotes;
    const to = state[dId].quotes;

    const resultFrom = [...from.slice(0, sIndex), ...from.slice(sIndex + 1)];

    const resultTo = (sId === dId)
        ? [ ...resultFrom.slice(0, dIndex), from[sIndex],  ...resultFrom.slice(dIndex)]

        : [ ...to.slice(0, dIndex), from[sIndex], ...to.slice(dIndex) ];

    setState({
      ...state,

      [sId]: {
        ...state[sId],
        quotes: resultFrom,
      },

      [dId]: {
        ...state[dId],
        quotes: resultTo,
      }
      
    });
  }

  return (
    <DragDropContext onDragEnd={dragEndHandler} >
      <Container>
        {
          Object.keys(state).map(id => {
            const { title, quotes } = state[id];
            return (
              <List
                key={id}
                title={title}
                quotes={quotes}
                id={id}
              />
            )
          })
        }
      </Container>
    </DragDropContext>
  );
}

export default App;

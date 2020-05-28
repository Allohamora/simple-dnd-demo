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
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const from = state[source.droppableId].quotes;
    const to = state[destination.droppableId].quotes;

    if (source.droppableId === destination.droppableId) {
      const filtered = [...from.slice(0, source.index), ...from.slice(source.index + 1)];
      const first = filtered.slice(0, destination.index);
      const result = [...first, from[source.index], ...filtered.slice(destination.index)];

      setState({
        ...state,
        [source.droppableId]: {
          ...state[source.droppableId],
          quotes: result,
        }
      });
      return;
    }

    const firstTo = to.slice(0, destination.index);
    const resultTo = [...firstTo, from[source.index], ...to.slice(destination.index)];
    const resultFrom = from.filter((_, i) => !(source.index === i));

    setState({
      ...state,
      [source.droppableId]: {
        ...state[source.droppableId],
        quotes: resultFrom,
      },
      [destination.droppableId]: {
        ...state[destination.droppableId],
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

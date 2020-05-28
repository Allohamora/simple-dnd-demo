import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

interface QuoteProps extends iQuote {
    index: number
};

export interface iQuote {
    text: string,
    id: string,
}

const Container = styled.div`
    border: 2px solid rgba(0,0,0, .5);
    margin: 5px 0;
`;

const Quote = (props: QuoteProps) => {

    const {index, id, text} = props;

    return (
        <Draggable 
            index={ index }
            draggableId={ id }
        >
            {(provided, snapshot) => (
                <Container
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {text}
                </Container>
            )}
        </Draggable>
    );
};

export { Quote };
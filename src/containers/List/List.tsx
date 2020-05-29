import React from 'react';
import { Droppable } from "react-beautiful-dnd";
import styled from 'styled-components';
import { Quote } from 'components/Quote';
import { iQuote } from 'components/Quote/Quote';

const Container = styled.div`
    display: flex;
    flex-flow: column wrap;

    width: 100%;

    margin: 5px;
    padding: 5px;

    background-color: white;

    border: 2px solid gray;
    border-radius: 5px;
`;

const Title = styled.h2`
    margin: 0;

    text-align: center;

    border: 2px solid lightgray;
`;

const Quotes = styled.div<{ isOver: boolean }>`
    flex-grow: 1;

    min-height: 100px;

    padding: 5px;

    background-color: ${props => props.isOver ? "lightblue" : "transparent"};
`;

export type iQuotes = iQuote[];

interface ListProps {
    title: string,
    quotes: iQuotes,
    id: string,
};

const List = (props: ListProps) => {

    const { quotes, id } = props;

    return (
        <Container>
            <Title>
                {props.title}
            </Title>

            <Droppable droppableId={id} >
                {(provided, snapshot) => (
                    <Quotes
                        {...provided.droppableProps}
                        isOver={snapshot.isDraggingOver}
                        ref={provided.innerRef}
                    >
                        {quotes.map((quote, i) => (
                            <Quote key={quote.id} {...quote} index={i} />
                        ))}
                        {provided.placeholder}
                    </Quotes>
                )}
            </Droppable>

        </Container>
    );
};

export { List };
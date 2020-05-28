import React from 'react';
import { Droppable } from "react-beautiful-dnd";
import styled from 'styled-components';
import { Quote } from 'components/Quote';
import { iQuote } from 'components/Quote/Quote';

const Container = styled.div`
    background-color: white;
    border: 2px solid gray;

    border-radius: 5px;

    width: 100%;

    margin: 5px;
    padding: 5px;

    display: flex;
    flex-flow: column wrap;
`;

const Title = styled.h2`
    text-align: center;

    border: 2px solid lightgray;
    margin: 0;
`;

const Quotes = styled.div<{ isOver: boolean }>`
    min-height: 100px;
    background-color: ${props => props.isOver ? "lightblue" : "transparent"};

    padding: 5px;
    flex-grow: 1;
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
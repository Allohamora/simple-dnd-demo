import React from 'react';
import { useDrag } from "react-dnd";
import { Item, RemoveHandler } from 'containers/Custom';
import { ItemTypes } from 'dndTypes';
import styled from 'styled-components';

interface ListCellProps {
    item: Item,
    removeHandler: RemoveHandler,
};

const Li = styled.li<{drag?: boolean}>`
    border: 2px solid #95a5a6;
    margin-bottom: 2px;
    opacity: ${ props => props.drag ? ".5" : "1" };
`;

const ListCell = (props: ListCellProps) => {

    const {item, removeHandler} = props;

    const [{ isDrag }, drag] = useDrag({
        item: {
            type: ItemTypes.listCell,
            removeHandler,
            item,
        },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    })

    return (
        <Li
            drag={isDrag}
            ref={drag}
        >
            {
                item.text
            }
        </Li>
    );
};

export { ListCell };
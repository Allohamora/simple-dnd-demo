import React, { useRef } from 'react';
import { Item, ReplaceHandler } from 'containers/Items';
import { useDrag, useDrop, DragObjectWithType } from 'react-dnd';
import { ItemTypes } from 'dndTypes';
import styled from 'styled-components';

interface ItemsCellProps {
    item: Item,
    index: number,
    replaceHandler: ReplaceHandler,
};

export interface ItemDrop extends DragObjectWithType {
    index: number,
    item: Item,
}

const hoverOptions = {
    isReady: true,
    delay: 300,
};

const Li = styled.li<{drag?: boolean, drop?: boolean}>`
    border: 2px solid gray;
    padding: 5px;
    margin: 5px;
    opacity: ${props => props.drag ? ".5" : "1"};
    background-color: ${props => props.drop ? "blue" : "transparent"};
`;

const ItemsCell = (props: ItemsCellProps) => {

    const {item, index, replaceHandler} = props;
    const ref = useRef(null);

    const [{isOver}, drop] = useDrop({
        accept: ItemTypes.itemsCell,
        hover: (item: ItemDrop, monitor) => {
            if( !hoverOptions.isReady ) return;

            if( monitor.isOver() ) {
                hoverOptions.isReady = false;
                replaceHandler(item.item, index);
                setTimeout( () => hoverOptions.isReady = true, hoverOptions.delay );
            }

        },
        collect: monitor => ({
            isOver: monitor.isOver(),
        })
    })

    const [{isDrag}, drag] = useDrag({
        item: {
            type: ItemTypes.itemsCell,
            index,
            item
        },
        collect: monitor => ({
            isDrag: monitor.isDragging(),
        }),
    })

    drop(drag(ref));

    return (
        <Li
            ref={ref}
            drop={isOver}
            drag={isDrag}
         >
            {
                item.text
            }
        </Li>
    );
};

export { ItemsCell };
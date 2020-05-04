import React, { useRef } from 'react';
import { Item, ReplaceHandler } from '../FormList';
import { useDrag, useDrop, DragObjectWithType } from 'react-dnd';
import { ItemTypes } from '../../dndTypes';

interface ListCellProps {
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

const ListCell = (props: ListCellProps) => {

    const {item, index, replaceHandler} = props;
    const ref = useRef(null);

    const [{isOver}, drop] = useDrop({
        accept: ItemTypes.item,
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
            type: ItemTypes.item,
            index,
            item
        },
        collect: monitor => ({
            isDrag: monitor.isDragging(),
        }),
    })

    drop(drag(ref));

    return (
        <li
         ref={ref}
         style={{
            border: "2px solid gray",
            padding: 5,
            margin: 5,
            opacity: isDrag ? ".5" : 1,
            backgroundColor: isOver ? "blue" : "transparent",
        }} >
            {
                item.text
            }
        </li>
    );
};

export { ListCell };
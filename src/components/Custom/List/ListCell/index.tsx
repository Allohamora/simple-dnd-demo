import React from 'react';
import { useDrag } from "react-dnd";
import { Item, RemoveHandler } from '../../../Custom';
import { ItemTypes } from 'dndTypes';

interface ListCellProps {
    item: Item,
    removeHandler: RemoveHandler,
};

const ListCell = (props: ListCellProps) => {

    const {item, removeHandler} = props;

    const [{ isDrag }, drag] = useDrag({
        item: {
            type: ItemTypes.item,
            removeHandler,
            item,
        },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    })

    return (
        <li
            className={ "list__item" + (isDrag ? " drag" : "") }
            ref={drag}
        >
            {
                item.text
            }
        </li>
    );
};

export { ListCell };
import React from 'react';
import { useDrag } from "react-dnd";
import { Item, RemoveHandler } from '../FormList';
import { ItemTypes } from '../../dndTypes';

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
            ref={drag}
            style={{
                backgroundColor: isDrag ? "yellow" : "green"
            }}
        >
            {
                item.text
            }
        </li>
    );
};

export { ListCell };
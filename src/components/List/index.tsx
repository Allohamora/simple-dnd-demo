import React from 'react';
import { Item, RemoveHandler, AddHandler } from '../FormList';
import { ListCell } from '../ListCell';
import { useDrop, DragObjectWithType } from 'react-dnd';
import { ItemTypes } from '../../dndTypes';

interface ListProps {
    items: Item[],
    removeHandler: RemoveHandler,
    addHandler: AddHandler,
};

interface DropArgumentItem extends DragObjectWithType {
    item: Item,
    removeHandler: RemoveHandler,
}

const List = (props: ListProps) => {

    const {items, removeHandler, addHandler} = props;

    const [{isOver}, drop] = useDrop({
        accept: ItemTypes.item,
        drop: (dropItem: DropArgumentItem) => {
            const isSucess: boolean = addHandler(dropItem.item);

            if( isSucess ){
                dropItem.removeHandler(dropItem.item);
            }
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    })

    return (
        <ul
            ref={drop}
            style={{
                backgroundColor: isOver ? "green" : "teal"
            }}
        >
            {
                items.map( item => (
                    <ListCell
                        key={item.id}
                        item={item}
                        removeHandler={removeHandler}
                    />
                ) )
            }
        </ul>
    );
};

export { List };
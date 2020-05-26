import React from 'react';
import { Item, RemoveHandler, AddHandler } from 'containers/Custom';
import { ListCell } from 'components/ListCell';
import { useDrop, DragObjectWithType } from 'react-dnd';
import { ItemTypes } from 'dndTypes';
import styled from 'styled-components';

interface ListProps {
    items: Item[],
    removeHandler: RemoveHandler,
    addHandler: AddHandler,
};

interface DropArgumentItem extends DragObjectWithType {
    item: Item,
    removeHandler: RemoveHandler,
}

const Ul = styled.ul<{drop?: boolean}>`
    transition: all .5s;

    margin-top: 10px;
    min-height: 100px;
    padding: 10px;
    background-color: ${ props => props.drop ? "#3498db" : "#f1c40f" };
    border: 2px solid #e74c3c;
`;

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
        <Ul
            drop={isOver}
            ref={drop}
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
        </Ul>
    );
};

export { List };
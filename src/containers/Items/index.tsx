import React, { useState } from 'react';
import { ItemsCell } from 'components/ItemsCell';
import styled from 'styled-components';

interface ItemsProps {

};

export interface Item {
    id: string,
    text: string,
}

export type ReplaceHandler = (item: Item, index: number) => void; 

const arrReplace = <T extends {}>(arr: T[], item: T, index: number) => {
    const filtered = arr.filter( value => !(value === item) );
    const spliced = filtered.splice(index, filtered.length);
    filtered.push(item, ...spliced);
    return filtered;
}

const Ul = styled.ul`
    padding: 10px 20px;
`;

const Items = (props: ItemsProps) => {

    const [items, setItems] = useState<Item[]>([
        {
            id: "12",
            text: "aa"
        },
        {
            id: "111",
            text: "222"
        },
        {
            id: "ara",
            text: "444",
        }
    ]);

    const replaceHandler = (item: Item, index: number) => {
        setItems(arrReplace(items, item, index));
    };

    return (
        <Ul>
            {
                items.map( (item, i) => (
                    <ItemsCell key={item.id} item={item} index={i} replaceHandler={replaceHandler} />
                ) )
            }
        </Ul>
    );
};

export { Items };
import React from 'react';
import { Item } from '../FormList';

interface ListProps {
    items: Item[],
};

const List = (props: ListProps) => {

    const {items} = props;

    return (
        <ul>
            {
                items.map( item => (
                    <li key={item.id} >
                        {
                            item.text
                        }
                    </li>
                ) )
            }
        </ul>
    );
};

export { List };
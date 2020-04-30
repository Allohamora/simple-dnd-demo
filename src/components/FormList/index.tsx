import React, { useState } from 'react';
import { List } from '../List';

interface FormListProps {
    
};

export interface Item {
    id: string,
    text: string,
}

export type RemoveHandler = (received: Item) => void;
export type AddHandler = (received: Item) => boolean;

const FormList = (props: FormListProps) => {

    const [items, setItems] = useState<Item[]>([]);

    const [value, setValue] = useState("");

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setItems(
            [
                ...items, 
                { 
                    id: (Math.random() * 1e6).toFixed(0),
                    text: value
                }
            ]);
        setValue("");
    };

    const removeHandler = (received: Item) => {
        setItems( items.filter( item => !(item.id === received.id ) ) );
    }

    const addHandler = (received: Item) => {
        const isInItems: boolean = !!items.find( item => item.id === received.id );
        if( isInItems ) return false;

        setItems( [...items, received] );
        return true;
    }

    return (
        <>
            <form onSubmit={submitHandler} >
                <input
                    type="text"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                <button>send</button>
            </form>
            <List items={items} removeHandler={removeHandler} addHandler={addHandler} />
        </>
    );
};

export { FormList };
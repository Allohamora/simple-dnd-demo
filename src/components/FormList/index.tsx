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

        if( !value.trim() ) return;

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
        <div className="form__wrap">
            <form onSubmit={submitHandler} className="form" >
                <input
                    type="text"
                    value={value}
                    placeholder="Enter li text"
                    onChange={e => setValue(e.target.value)}
                />
                <button>send</button>
            </form>
            <List items={items} removeHandler={removeHandler} addHandler={addHandler} />
        </div>
    );
};

export { FormList };
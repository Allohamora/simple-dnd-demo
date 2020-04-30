import React, { useState } from 'react';
import { List } from '../List';

interface FormListProps {

};

export interface Item {
    id: string,
    text: string,
}

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
            <List items={items} />
        </>
    );
};

export { FormList };
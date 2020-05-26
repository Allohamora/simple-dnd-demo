import React, { useState } from 'react';
import { List } from 'containers/List';
import styled from "styled-components";

interface CustomProps {
    
};

export interface Item {
    id: string,
    text: string,
}

export type RemoveHandler = (received: Item) => void;
export type AddHandler = (received: Item) => boolean;

const Wrap = styled.div`
    padding-top: 20px;
    min-width: 100px;
    width: 40%;
`;


const Custom = (props: CustomProps) => {

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
        <Wrap>
            <form onSubmit={submitHandler} >
                <input
                    type="text"
                    value={value}
                    placeholder="Enter item text"
                    onChange={e => setValue(e.target.value)}
                />
                
                <button>send</button>
            </form>

            <List items={items} removeHandler={removeHandler} addHandler={addHandler} />
        </Wrap>
    );
};

export { Custom };
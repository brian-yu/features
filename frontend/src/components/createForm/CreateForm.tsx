import React, {
    useState, useReducer, ChangeEvent, KeyboardEvent, createRef
} from 'react';
import { Redirect } from "react-router-dom";

import { API_HOST } from '../../constants';

const ItemFormList = ({ items, setItems }: any) => {

    const [submittedForm, setSubmittedForm] = useState({id: -1});

    const handleInput = (idx: number, e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;

        // Modify field.
        setItems({ type: 'setText', index: idx, value: text });

        // Remove if empty.
        if (text === '') {
            if (idx > 0) {
                console.log("Removing", idx);
                setItems({ type: 'remove', index: idx });
            }
        } else {
            // Add new field if modifying last.
            if (idx === items.length - 1) {
                setItems({ type: 'add' });
            }
        }
    }

    const handleKeyPress = (idx: number, e: KeyboardEvent) => {
        switch (e.key) {
            // Focus on next field on input.
            case 'Enter':
                if (items[idx + 1]) {
                    items[idx + 1].ref.current.focus();
                }
                break;
            // Focus on previous field on backspace if current field is empty.
            case 'Backspace':
                if (items[idx - 1] && items[idx].text == "") {
                    console.log(items[idx-1]);
                    items[idx - 1].ref.current.focus();
                    e.preventDefault();
                }
                break;
            case 'ArrowUp':
                if (items[idx - 1]) {
                    items[idx - 1].ref.current.focus();
                }
                e.preventDefault();
                break;
            case 'ArrowDown':
                if (items[idx + 1]) {
                    items[idx + 1].ref.current.focus();
                }
                e.preventDefault();
                break;
        }

    }

    const submitForm = () => {

        const formData = {
            password: 'password',
            items: items.filter((item: any) => item.text !== '')
                .map((item: any) => { return { text: item.text } })
        };
        console.log(formData);
        fetch(`${API_HOST}/forms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                setSubmittedForm(data);
            })
    }

    if (submittedForm !== null) {
        if (submittedForm.id >= 0) {
            return (
                <Redirect
                    to={{
                        pathname: "/form/" + submittedForm.id,
                        state: { form: submittedForm }
                    }}
                />
            )
        }
    }

    return (
        <React.Fragment>
            <div>
                {items.map((item: any, idx: number) => {
                    return (
                        <div className="field is-horizontal" key={idx}>
                            <div className="field-label is-normal">
                                <label className="label">Item #{idx + 1}</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="item"
                                            value={item.text}
                                            onChange={e => handleInput(idx, e)}
                                            onKeyDown={e => handleKeyPress(idx, e)}
                                            ref={item.ref}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className="field is-horizontal">
                    <div className="field-label">
                        {/* Left empty for spacing. */}
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <button className="button is-primary" onClick={() => submitForm()}>
                                    Submit
                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

const CreateForm = () => {
    const [items, setItems] = useReducer((items: any[], action: any) => {
        switch (action.type) {
            case "add":
                return [...items, { text: '', ref: createRef() }];
            case "remove":
                return items.filter((_, index) => index !== action.index);
            case "setText":
                return items.map((oldVal, index) => index === action.index ? { text: action.value, ref: oldVal.ref } : oldVal)
            default:
                return items;
        }
    }, [{text: '', ref: createRef()}]);

    return (
        <div className="container">
            <h1 className="title"> Create a new item list </h1>
            <ItemFormList items={items} setItems={setItems} />
        </div>
    );
}

export default CreateForm;
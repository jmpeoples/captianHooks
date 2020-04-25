import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './kart.css';

const InputForm = (props) => {
    // useState takes a value and returns a function
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredPhoto, setEnteredPhoto] = useState('');
    const [enteredVote, setEnteredVote] = useState(0);

    const submitHandler = (event) => {
        event.preventDefault();

        props.onAddGroceries({
            title: enteredTitle,
            photoUrl: enteredPhoto,
            Vote: enteredVote
        })
    }

    return (
        <section>
            <form className="kart-form" onSubmit={submitHandler}>
                <label htmlFor="title">Title</label>
                <input className="form-control" id="title" type="text" value={enteredTitle}
                    onChange={event => {
                        setEnteredTitle(event.target.value)
                    }
                    }
                />

                <label htmlFor="photo">Photo Url</label>
                <input className="form-control" id="photoUrl" type="text" value={enteredPhoto}
                    onChange={event => {
                        setEnteredPhoto(event.target.value)
                    }}
                />
                <h5 className="subText">Add "https://picsum.photos/75/75" to add a random photo</h5>
                <div className="kart-form-submit">
                    <Button type='submit'>Add Groceries </Button>
                </div>
            </form>
        </section>
    );
};

export default InputForm;
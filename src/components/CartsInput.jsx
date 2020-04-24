import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import Carts from './Carts';

class CartsInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: ''}
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        alert('A name was submitted:' + this.state.value);
        event.preventDefault();
    }

    render(){
        return(
            <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                </label>
                <input type='text' value={this.state.value} onChange={this.handleChange}/>
                <h1>{this.state.value}</h1>
            </form>
            <Carts/>
            </div>
        );
    }

}


export default CartsInput;

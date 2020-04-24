import React, { Component } from 'react';
import { Button, Col, Row, Container } from 'react-bootstrap'


class Carts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }


    componentDidMount() {
        fetch('https://foodapp-cf3d8.firebaseio.com/items.json')
            .then((respsonse) => {
                return respsonse.json();
            })
            .then((responseData) => {
                const loadedData = [];
                for (const key in responseData) {
                    loadedData.push({
                        title: responseData[key].title,
                        Vote: responseData[key].Vote
                    })
                }
                this.setState({ posts: loadedData });
                console.log(loadedData);
            })
    }


    render() {
        const content = this.state.posts.map(post => {
            return (
                <div>
                    <h1>{post.title}</h1>
                    <p>{post.vote}</p>
                </div>
            )
        });
        return (
            <div>
                {content}
            </div>
        );
    }
}

export default Carts;
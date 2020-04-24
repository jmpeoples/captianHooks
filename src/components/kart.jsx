import React, { useState, useEffect } from 'react';
import { Col, Row, Container} from 'react-bootstrap';
import photoDATA from './photos';
import {ReactComponent as Liked} from '../images/like.svg';
import {ReactComponent as Cancel} from '../images/close.svg';
import InputForm from './inputForm';
import './kart.css';

const Kart = () => {
    const [userItems, setUserItems] = useState([]);
    const [loading, setLoading] = useState('');

    useEffect(() => {
        fetch('https://foodapp-cf3d8.firebaseio.com/items.json')
        .then(response => {
            return response.json();
        }).then(responseData => {
           const loadedData = [];
           for (const key in responseData){
               loadedData.push({
                   id: key,
                   photo: responseData[key].photoUrl,
                   title: responseData[key].title,
                   Vote: responseData[key].Vote
               })
           }
               setUserItems(loadedData);
               console.log('data updated');
        }).catch((error) => {
            console.log("error");
        });
    }, [loading]);

    useEffect(() => {
        console.log('RENDERING EFFECT');
    }, [userItems]);

    const addGroceries = (items) => {
        fetch('https://foodapp-cf3d8.firebaseio.com/items.json', {
            method: 'POST',
            body: JSON.stringify(items),
            header: { "Content-type" : "application: JSON"} 
        })
        .then(response => {
            return response.json();
        })
        .then(responseData => {
            setUserItems(prevState => 
                [ ...prevState,
                {
                  id: responseData.name,
                  ...items
                }]
            );
        }).catch((error) => {
            console.log("error");
        });
    }

    const voteHandler = (voteId) => {
        const newId = String(voteId); 
        //alert(newId); 
        //alert(`https://foodapp-cf3d8.firebaseio.com/items/${newId}`); 
        //update object by Id
        fetch(`https://foodapp-cf3d8.firebaseio.com/items/${newId}.json`)
        .then(response => {
            return response.json();
        })
        .then(responseData => {
            //console.log(responseData);
            const upVote = responseData.Vote + 1;
            upVoteHandler(upVote, voteId);
        })
    }   

    const upVoteHandler = (upVote, voteId) => {
        fetch(`https://foodapp-cf3d8.firebaseio.com/items/${voteId}.json`, {
            method : "PATCH",
            body: JSON.stringify({Vote: upVote}),
            header: {"Content-type" : "application: JSON"}
        }).then(() => {
            triggerHandler()
        }
           // console.log(loading)
        );
    }

    const cancelHandler = (postId) => {
        //alert("Cancel Button Clicked");
        fetch(`https://foodapp-cf3d8.firebaseio.com/items/${postId}.json`, {
            method : "DELETE"
        }).then(() => {
            triggerHandler()
        })
        .catch((error) => {
            console.log("error");
        })
    }

    const triggerHandler = () => {
        setLoading(true);
        setLoading(false);
    }

    return(
    <Container>
        <Row>
            <Col className="topSpace" md={12}>
                <InputForm onAddGroceries={addGroceries} />
            </Col>
        </Row>
        <Row className="topSpace">
                {userItems.map(post => {
                    return (
                        <Col key={post.id} md={12} className="basket">
                            <img src={post.photo} />
                            <h3>{post.title}</h3>
                            <Liked onClick={(e) => voteHandler(post.id, e)} height={50} width={50} />
                            <h3>{post.Vote}</h3>
                            <Cancel onClick={(e) => cancelHandler(post.id, e)} height={25} width={25}/>
                         </Col>
                 );
             })
            }
        </Row>
    </Container>
    );
}

export default Kart;
import React from "react";
import {Button, Card} from 'react-bootstrap'

const CardElement = props => {
    return (
        <Card style={{ width: '18rem' }} className="aid-card" onClick={ () => props.changeCardFunc(props.id)}>
            <Card.Img variant="top" src={props.logo} />
            <Card.Body>
                <Card.Title> {props.title}</Card.Title>
                <Card.Text>
                    {props.text}
                </Card.Text>
                <Button variant="primary" href={"http://"+props.link}>{props.link}</Button>
            </Card.Body>
        </Card>
    )
}

export default CardElement;
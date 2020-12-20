import React from "react";
import {Container, Row, Col, Card, Button, Form, FormControl, InputGroup} from 'react-bootstrap';
import * as $ from 'jquery';
import {flask_url} from '../App.js';

export default class RequestOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            situation: "",
            identity: "",
            requestedAmount: 0,
            venmo_account: "",
        }
    }

    componentDidMount() {
        //on load, create the cards that will be printed
        var cardListTemp = [];
        //get the cards from db

        $.ajax({
            url: flask_url + "getCardInfo",
            type: "GET",
            data: { 
                'id':this.state.id,
                'num_cards': 1
            },
            error: function (response) {
                alert(response.statusText);
                console.log(response.statusText);
                console.log("failed");
            },
            success: (data) => {
                //got the card data, not iterate through and add to the var
                console.log(data);
                for (var cardItem in data) {
                    var card = data[cardItem];
                    console.log(card[0].name);
                    this.setState({
                        id: card[0].id,
                        logo: card[0].logo,
                        title: card[0].name,
                        text: card[0].description
                    });
                };
                this.setState({
                    cardList: cardListTemp
                })
                console.log(this.cardList);
            }
        });
    }

    /* Forms - START */
    updateSituation()
    {
        this.setState({
            situation: document.getElementById("situation_text").value,
        })
        console.log("Updated");
    }

    updateIdentity()
    {
        this.setState({
            identity: document.getElementById("identity_text").value,
        })
        console.log("Updated");
    }

    updateRequestAmount()
    {
        this.setState({
            requestedAmount: document.getElementById("requested_amount").value
        })
        console.log("Updated");
    }

    updateVenmoAccount()
    {
        this.setState({
            venmo_account: document.getElementById("venmo_account").value
        })
        console.log("Updated");
    }

    submit()
    {
        if(this.state.situation === "")
        {
            // situation was not filled
            console.log("situation was not filled");
            return;
        }
        if(this.state.identity === "")
        {
            //identity was not filled
            console.log("identity was not filled");
            return;
        }
        if(this.state.venmo_account === "")
        {
            //venmo_account was not filled
            console.log("venmo_account was not filled");
            return;
        }
        if(this.state.requestedAmount <= 0)
        {
            //requested amount is invalid
            console.log("requested amount is invalid!");
            return;
        }
        //no errors!

        $.ajax({
            url: flask_url + "requestAid",
            type: "GET",
            data: {
                'user_id':this.state.id,
                'situation':this.state.situation,
                'identities':this.state.identity,
                'amount':this.state.requestedAmount,
                'venmo_username':this.state.venmo_account
            },
            error: function (response) {
                alert(response.statusText);
                console.log(response.statusText);
                console.log("failed");
            },
            success: () => {
                console.log("Successful Post");
            }
        });

        this.props.requestAidFunc(null);
    }
    /* Forms - END */
    render() {
        return (
            <Container fluid className="overlay-container">
                <Row className="justify-content-md-center mt-5">
                    <Col md="auto">
                        <img alt= {this.state.title +" Logo"} src={this.props.logo} />
                    </Col>
                    <Col md="auto">
                        <Card style={{ width: '50rem' }}>
                            <Card.Body>
                                <Card.Title> {this.state.title} <Button className="ml-3" variant="primary" style={{float:"right", marginTop:'0'}} onClick={() => this.props.requestAidFunc(null)}>Cancel</Button> </Card.Title>
                                <Card.Text>
                                    {this.state.text}
                                </Card.Text>
                                {/* Form for inputting requested amount of money */}
                                <Form.Group>
                                    <Form.Row>
                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Situation</Form.Label>
                                            <Form.Control id="situation_text" as="textarea" rows={3} cols={60} onChange={() => this.updateSituation()} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row style={{width:"80%"}}>
                                        <Form.Label>Please list your identities, separated by a comma (,)</Form.Label>
                                        <FormControl id="identity_text" placeholder="Black, Trans, Queer, Low Income, Asian, ..." onChange={() => this.updateIdentity()} />
                                    </Form.Row>
                                    <Form.Row className="mt-3" style={{width:"30%"}}>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                            <InputGroup.Text>$</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control id="requested_amount" placeholder="Requested Amount" onChange={() => this.updateRequestAmount()} />
                                        </InputGroup>
                                    </Form.Row>
                                    <Form.Row className="mt-3" >
                                        <Form.Label>Note: Your username will only be viewable by the manager for this mutual aid and will not be shown on the public request</Form.Label>
                                    </Form.Row>
                                    <Form.Row style={{width:"30%"}}>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                            <InputGroup.Text>@</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control id="venmo_account" placeholder="Venmo-Username" onChange={() => this.updateVenmoAccount()} />
                                        </InputGroup>
                                    </Form.Row>
                                    <Form.Row>
                                        <Button className="mb-2 mt-3" type="submit" variant="primary" onClick={() => this.submit()}>Request Aid</Button>
                                    </Form.Row>
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}
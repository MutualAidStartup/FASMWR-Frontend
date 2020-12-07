import React from "react";
import {Container, Row, Col, Card, Button, Form, FormControl, InputGroup} from 'react-bootstrap';
import * as $ from 'jquery';
import {flask_url} from '../App.js';

const Overlay = props => {
    var situation = "";
    var identity = "";
    var requestedAmount = 0;

    /* Forms - START */
    function updateSituation()
    {
        situation = document.getElementById("situation_text").value;
        console.log("Updated");
    }

    function updateIdentity()
    {
        identity = document.getElementById("identity_text").value;
        console.log("Updated");
    }

    function updateRequestAmount()
    {
        requestedAmount = document.getElementById("requested_amount").value;
        console.log("Updated");
    }

    function submit()
    {
        if(situation === "")
        {
            // situation was not filled
            console.log("situation was not filled");
            return;
        }
        if(identity === "")
        {
            //identity was not filled
            console.log("identity was not filled");
            return;
        }
        if(requestedAmount <= 0)
        {
            //requested amount is invalid
            console.log("requested amount is invalid!");
            return;
        }
        //no errors!
        console.log(situation);

        $.ajax({
            url: flask_url + "requestAid",
            type: "GET",
            data: {
                'situation':situation,
                'identity':identity,
                'requestedAmount':requestedAmount
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

        props.requestAidFunc(null);
    }
    /* Forms - END */

    return (
        <Container fluid className="overlay-container">
            <Row className="justify-content-md-center mt-5">
                <Col md="auto">
                    <img alt="Happy Valley Mutual Aid Logo" src={props.logo} />
                </Col>
                <Col md="auto">
                    <Card style={{ width: '50rem' }}>
                        <Card.Body>
                            <Card.Title> {props.title} <Button className="ml-3" variant="primary" style={{float:"right", marginTop:'0'}} onClick={() => props.requestAidFunc(null)}>Cancel</Button> </Card.Title>
                            <Card.Text>
                                {props.text}
                            </Card.Text>
                            {/* Form for inputting requested amount of money */}
                            <Form.Group>
                                <Form.Row>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Situation</Form.Label>
                                        <Form.Control id="situation_text" as="textarea" rows={3} cols={60} onChange={() => updateSituation()} />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row style={{width:"80%"}}>
                                    <Form.Label>Please list your identities, separated by a comma (,)</Form.Label>
                                    <FormControl id="identity_text" placeholder="Black, Trans, Queer, Low Income, Asian, ..." onChange={() => updateIdentity()} />
                                </Form.Row>
                                <Form.Row className="mt-3" style={{width:"30%"}}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl id="requested_amount" placeholder="Requested Amount" onChange={() => updateRequestAmount()} />
                                    </InputGroup>
                                </Form.Row>
                                <Form.Row>
                                    <Button className="mb-2 mt-3" type="submit" variant="primary" onClick={() => submit()}>Request Aid</Button>
                                </Form.Row>
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Overlay;
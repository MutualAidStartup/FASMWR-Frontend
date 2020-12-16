import React from "react";
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';

export default class GrantOrDeny extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            approved: this.props.approved,
            requestedAmount: this.props.requestedAmount,
            responseId: this.props.responseId
        }
    }

    componentDidMount() {
        console.log(this.state.requestedAmount);
    }

    changeGranted() {
        document.getElementById("granted_amount").value = document.getElementById("AmountSlider").value
    }

    changeSlider() {
        document.getElementById("AmountSlider").value = document.getElementById("granted_amount").value
        this.setState({
            grant: document.getElementById("AmountSlider").value,
        })
    }

    updateRequestAmount() {
        var value = Math.round(100*document.getElementById("granted_amount").value)/100;
        if (value>this.state.requestedAmount)
        {
            value = this.state.requestedAmount;
        }
        document.getElementById("granted_amount").value = value;
        this.changeSlider();
        this.setState({
            grant: value,
        })
    }

    changeToMax() {
        document.getElementById("granted_amount").value = this.state.requestedAmount;
        this.changeSlider();
        this.setState({
            grant: this.state.requestedAmount,
        })
    }

    /* Forms - END */
    render() {
        return (
            <div className="overlay-container">
                <Container>
                    {this.state.approved==="grant" && (
                        <Card className="">
                            <Row className="mx-5 my-2">
                                <Col>
                                    How much are you able to grant?
                                </Col>
                            </Row>
                            <Row className="mx-5">
                                <Col>
                                    <Form.Row className="mx-0">
                                        <InputGroup>
                                            <Form.Control id="AmountSlider" type="range" min={0.00} max={this.state.requestedAmount} step={1} defaultValue={0.00} onChange={()=>this.changeGranted()}/>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>$</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control id="granted_amount" placeholder="0.00" onBlur={() => this.updateRequestAmount()} />
                                        </InputGroup>
                                    </Form.Row>
                                </Col>
                                <Col sm={8}>
                                    <Button onClick={()=>this.changeToMax()}>Max</Button>
                                </Col>
                            </Row>
                            <Row className="mx-5 my-2">
                                <Col>
                                    <Button id="grant" onClick={() => this.props.grantAmount(Document.getElementById("grant").value)}>Grant</Button>
                                    <Button onClick={() => this.props.cancel(null)}>Cancel</Button>
                                </Col>
                            </Row>
                        </Card>
                    )}
                    {this.state.approved==="deny" && (
                        <Row className="justify-content-md-center mt-5">
                            <Card className="py-2">
                                <Col md="auto">
                                    Are you sure you would like to <b style={{ color: 'red' }}>DENY</b> this request?
                                </Col>
                                <Col>
                                    <Button>Yes</Button>
                                    <Button onClick={() => this.props.cancel(null)}>No</Button>
                                </Col>
                            </Card>
                        </Row>
                    )}
                </Container>
            </div>
        )
    }
}
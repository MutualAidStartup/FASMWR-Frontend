import React from "react";
import { Button, Navbar, Nav, Form, FormControl, Container, Row, Col, Card } from 'react-bootstrap';
import * as $ from 'jquery';
import {flask_url} from '../App.js';

export class HeaderNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginOrRegister: null,
            email: null,
            password: null,
        }
        this.setLoginOrRegister = this.setLoginOrRegister.bind(this);
        this.logout = this.logout.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.submit = this.submit.bind(this);
    }

    setLoginOrRegister(value) {
        this.setState({
            loginOrRegister: value
        })
        console.log("Setting loginorregiseter to: " + value);
    }

    logout() {
        //for now, just have it not login and instead just fake a login to the id
        this.props.setLoggedIn(null);
    }

    /* Forms - start */

    updateEmail() {
        this.setState({
            email: document.getElementById("username_entry").value,
        });
        console.log("Updated");
    }

    updatePassword() {
        this.setState({
            password: document.getElementById("password_entry").value,
        });
        console.log("Updated");
    }

    submit() {
        if(this.state.email === null || this.state.email === "")
        {
            // situation was not filled
            console.log("username was not filled");
            return;
        }
        if(this.state.password === null || this.state.password === "")
        {
            //identity was not filled
            console.log("password was not filled");
            return;
        }
        //no errors!

        $.ajax({
            url: flask_url + this.state.loginOrRegister,
            type: "GET",
            data: {
                'email':this.state.email,
                'password':this.state.password
            },
            error: function (response) {
                alert(response.statusText);
                console.log(response.statusText);
                console.log("failed");
            },
            success: (data) => {
                console.log("Successful GET: ");
                console.log(data);
                this.props.changeToken(data.token);
                this.props.changeId(data.id);
                this.setLoginOrRegister(null);
            }
        });
    }

    /* Forms - end */
    render() {
        return (
            <div>
                {this.state.loginOrRegister && (
                    <Container fluid className="overlay-container">
                        <Row className="justify-content-md-center mt-5">
                            <Col md="auto">
                                <img alt="Happy Valley Mutual Aid Logo" src={this.props.logo} />
                            </Col>
                            <Col md="auto">
                                <Card style={{ width: '50rem' }}>
                                    <Card.Body>
                                        <Card.Title> {this.state.loginOrRegister} <Button className="ml-3" variant="primary" style={{ float: "right", marginTop: '0' }} onClick={() => this.setLoginOrRegister()}>Cancel</Button> </Card.Title>
                                        {/* Form for inputting requested amount of money */}
                                        <Form.Group>
                                            <Form.Row className="ml-0" style={{ width: "50%" }}>
                                                <Form.Label>Email</Form.Label>
                                                <FormControl id="username_entry" onChange={() => this.updateEmail()} />
                                            </Form.Row>
                                            <Form.Row className="ml-0 mt-1" style={{ width: "50%" }}>
                                                <Form.Label>Password</Form.Label>
                                                <FormControl id="password_entry" onChange={() => this.updatePassword()} />
                                            </Form.Row>
                                            <Form.Row>
                                                <Button className="mt-2 ml-1 " type="submit" variant="primary" onClick={() => this.submit()}>{this.state.loginOrRegister}</Button>
                                            </Form.Row>
                                        </Form.Group>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                )}
                {!this.props.token && (
                    <Navbar bg="dark" variant="dark" className="nav-bar-font nav-bar">
                        <Nav href="#home" className="nav-logo pr-3">
                            FASMWR
                    </Nav>
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#about">About</Nav.Link>
                        </Nav>
                        <Form inline>
                            <div className="pr-2" style={{ color: "white", fontSize: "16pt", verticalAlign: "middle" }}>
                                Find a mutual aid near you!
                        </div>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        <Form inline className="ml-4">
                            <Button variant="outline-success" className="mr-2" onClick={() => this.setLoginOrRegister("Register")}>Register</Button>
                            <Button variant="outline-success" className="mr-5" onClick={() => this.setLoginOrRegister("Login")}>Login</Button>
                        </Form>
                    </Navbar>
                )}
                {this.props.token && (
                    <Navbar bg="dark" variant="dark" className="nav-bar-font nav-bar">
                        <Nav href="#home" className="nav-logo pr-3">
                            FASMWR
                    </Nav>
                        <Nav className="mr-auto">
                            <Nav.Link href="#account">Account</Nav.Link>
                            <Nav.Link href="#requests">Requests</Nav.Link>
                        </Nav>
                        <Form inline className="ml-4">
                            <Button variant="outline-success" className="mr-5" onClick={() => this.logout()}>Logout</Button>
                        </Form>
                    </Navbar>
                )}
            </div>
        )
    }
}

export default HeaderNav;
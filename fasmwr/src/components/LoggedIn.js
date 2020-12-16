/*
    Authors: Timothy Poehlman,
 */
import React from 'react';
import * as $ from 'jquery';
import { flask_url } from '../App.js';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import GrantOrDeny from './grantordeny.js'

// Import bootstrap items
import { Row, Col, Button, Form, FormControl, InputGroup } from 'react-bootstrap';

export default class LoggedIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            email: "",
            token: null, // This token is what verifies that we actually logged in
            name: "",
            desc: "",
            location: "",
            link: "",
            image: "",
            requests: [],
            linked: null, //this will hold the auth tocken when not null, if null they are not verified.  On page load we will most likely need to check if the token is still valid by doing a redundant query with it then tossing the info
            approvalOverlay: null,
            requestedAmount: null,
            //VENMO
            venmoUsername: null,
            venmoPassword: null,
            venmoToken: null,
            two_factor: null,
            venmoCode: "",
            otp_secret: null,
            //VENMO PROFILE
            balance: '00.00'
        }
        this.getAccountData = this.getAccountData.bind(this);
        this.updateName = this.updateName.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updateLocation = this.updateLocation.bind(this);
        this.updateLink = this.updateLink.bind(this);
        this.updateDesc = this.updateDesc.bind(this);
        this.updateImg = this.updateImg.bind(this);
        this.submit = this.submit.bind(this);
        this.loginVenmo = this.loginVenmo.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updateCode = this.updateCode.bind(this);
        this.submitCode = this.submitCode.bind(this);
        this.unlinkVenmo = this.unlinkVenmo.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.changeApproval = this.changeApproval.bind(this);
    }

    componentDidMount() {
        //Component mounted, query database to set the state varaibles
        let _token = this.props.token;
        if (_token) {
            this.setState({
                token: _token,
                id: this.props.id
            });
            this.getAccountData(_token, this.props.id);
            this.getRequestData(this.props.id);
        }
        else {
            console.log("Bad Token");
            alert("Bad Token - Logged Out");
            this.props.setLoggedIn(null);
        }
    }

    getRequestData(id) {
        //on load, create the cards that will be printed
        var requestsTemp = [];
        //get the cards from db

        $.ajax({
            url: flask_url + "view_requests",
            type: "GET",
            data: {
                'user_id': id,
                'num_requests': 3
            },
            error: function (response) {
                alert(response.statusText);
                console.log(response.statusText);
                console.log("failed");
            },
            success: (data) => {
                //got the card data, not iterate through and add to the var
                console.log(data);
                for (var counter = 0; counter < data["request"].length; counter++) {
                    var requestObj = data["request"][counter];
                    console.log(requestObj.situation);
                    requestsTemp.push(
                        { id: requestObj.id, situation: requestObj.situation, identities: requestObj.identities, amount: requestObj.amount }
                    );
                }
                this.setState({
                    requests: requestsTemp
                })
            }
        });
    }

    changeApproval(id, state, amount) {
        this.setState({
            approvalOverlay: state,
            responseId: id,
            requestedAmount: amount,
        })
    }

    getAccountData(_token, id) {
        console.log("id is " + id);
        $.ajax({
            url: flask_url + "getAccountData",
            type: "GET",
            data: {
                'userId': id,
                'token': _token,
            },
            error: function (response) {
                alert(response.statusText);
                console.log(response.statusText);
                console.log("failed");
            },
            success: (data) => {
                console.log("Successful Post");
                this.setState({
                    userId: data.id,
                    name: data.name,
                    email: data.email,
                    location: data.location,
                    link: data.link,
                    description: data.description,
                    image: data.image,
                    venmoToken: data.venmoToken,
                });
                this.getProfile();
            }
        });
    }

    updateName() {
        this.setState({
            name: document.getElementById("org_name").value,
        })
        console.log("Updated");
    }

    updateEmail() {
        this.setState({
            email: document.getElementById("org_email").value,
        })
        console.log("Updated");
    }

    updateLocation() {
        this.setState({
            location: document.getElementById("org_loc").value,
        })
        console.log("Updated");
    }

    updateLink() {
        this.setState({
            link: document.getElementById("org_link").value,
        })
        console.log("Updated");
    }

    updateDesc() {
        this.setState({
            description: document.getElementById("desc_text").value,
        })
        console.log("Updated");
    }

    updateImg() {
        this.setState({
            image: document.getElementById("image_form").value,
        })
        console.log("Updated");
    }

    submit() {
        console.log("submitting...");
        $.ajax({
            url: flask_url + "editAccount",
            type: "GET",
            data: {
                'token': this.state.token,
                'userId': this.state.id,
                'name': this.state.name,
                'email': this.state.email,
                'location': this.state.location,
                'link': this.state.link,
                'description': this.state.description,
                'image': this.state.image,
            },
            error: function (response) {
                alert(response.statusText);
                console.log(response.statusText);
                console.log("failed");
            },
            success: (data) => {
                alert(data);
                console.log("Successful Post");
            }
        });
    }

    updateUsername() {
        this.setState({
            venmoUsername: document.getElementById("username").value,
        });
        console.log("Updated");
    }

    updatePassword() {
        this.setState({
            venmoPassword: document.getElementById("password").value,
        });
        console.log("Updated");
    }

    loginVenmo() {
        console.log("Attempting Venmo Verification");
        $.ajax({
            url: flask_url + "verifyVenmoAcc",
            type: "GET",
            data: {
                'username': this.state.venmoUsername,
                'password': this.state.venmoPassword,
                'token': this.state.token,
                'userId': this.state.id
            },
            error: function (response) {
                alert(response.statusText);
                console.log(response.statusText);
                console.log("failed");
            },
            success: (data) => {
                console.log(data);
                console.log("Successful verification return");
                this.setState({
                    venmoToken: data.token,
                    two_factor: data.two_factor,
                    otp_secret: data.otp_secret
                });
            }
        })
    }

    updateCode() {
        this.setState({
            venmoCode: document.getElementById("code").value,
        });
        console.log("Updated");
    }

    submitCode() {
        console.log("Verifying code");
        $.ajax({
            url: flask_url + "verifyVenmoCode",
            type: "GET",
            data: {
                'token': this.state.token,
                'userId': this.state.id,
                'code': this.state.venmoCode,
                'otp_secret': this.state.otp_secret
            },
            error: function (response) {
                alert(response.statusText);
                console.log(response.statusText);
                console.log("failed");
            },
            success: (data) => {
                console.log(data);
                console.log("Successful verification return");
                this.setState({
                    venmoToken: data.token
                });
            }
        })
    }

    unlinkVenmo() {
        this.setState({
            venmoToken: null,
            two_factor: null,
        });
        $.ajax({
            url: flask_url + "venmoLogOut",
            type: "GET",
            data: {
                'token': this.state.token,
                'userId': this.state.id,
                'code': this.state.venmoToken,
            },
            error: function (response) {
                alert(response.statusText);
                console.log(response.statusText);
                console.log("failed");
            },
            success: (data) => {
                console.log(data);
                console.log("Successful verification return");
            }
        });
    }

    getProfile() {
        $.ajax({
            url: flask_url + "getVenmoProfile",
            type: "GET",
            data: {
                'userId': this.state.id,
                'token': this.state.token,
                'venmo_token': this.state.venmoToken,
            },
            error: function (response) {
                alert(response.statusText);
                console.log(response.statusText);
                console.log("failed");
            },
            success: (data) => {
                console.log(data);
                console.log("Successful verification return");
                this.setState({
                    balance: data.venmo_balance
                })
            }
        });
    }

    render() {
        return (
            <div style={{ height: "100%" }}>
                {/* This is the overlay viewed when confirming the grant or the deny 
                 NOTE: Right now it looks weird when displaying but that is due to the debug row.
                 Once the debug row is removed it should be flush with the nav bar like the requestoverlay
                */}
                {this.state.approvalOverlay && (
                    <GrantOrDeny
                        approved={this.state.approvalOverlay} // approvalOverlay holds the grant/deny string
                        cancel={this.changeApproval}
                        responseId={this.state.responseId}
                        requestedAmount={this.state.requestedAmount}
                    />
                )}
                <Row>
                    {this.props.page === "account" && (
                        <Col className="account-container ml-5">
                            <Row />
                            <Row className="mt-3 mx-5">
                                <Col>
                                    <h1>Modify your Mutual Aid project!</h1>
                                </Col>
                                <Col style={{ float: "right", verticalAlign: "center" }} xs={1}>
                                    <Button type="submit" className="mt-2" style={{ float: "right" }} variant="primary" onClick={() => this.submit()}>Update</Button>
                                </Col>
                            </Row>
                            <Row className="mx-5 my-3" >
                                <Col>
                                    <Form.Label>Organization Name</Form.Label>
                                    <Form.Control id="org_name" value={this.state.name} onChange={() => this.updateName()} />
                                </Col>
                                <Col>
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control id="org_email" value={this.state.email} onChange={() => this.updateEmail()} />
                                </Col>
                                <Col>
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control id="org_loc" value={this.state.location} onChange={() => this.updateLocation()} />
                                </Col>
                            </Row>
                            <Row className="mx-5 my-3" >
                                <Col sm="4">
                                    <Form.Label>Link/URL</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>https://</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control id="org_link" value={this.state.link} onChange={() => this.updateLink()} />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row className="mx-5 my-3">
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control id="desc_text" as="textarea" rows={3} value={this.state.description} onChange={() => this.updateDesc()} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mx-5 my-3">
                                <Col>
                                    <Form.Group>
                                        <Form.File id="image_form" label="Organization Image" onChange={() => this.updatePhoto()} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row />
                        </Col>
                    )}
                    {this.props.page === "requests" && (
                        <Col className="account-container ml-5">
                            <Row />
                            <Row className="mt-3 mx-5">
                                <Col>
                                    <h1>Active Requests</h1>
                                </Col>
                                <Col>
                                    <h3 style={{ float: "right" }}>Current Balance: {this.state.balance}</h3>
                                </Col>
                                <Col sm="1.5">
                                    <Button style={{ float: "right" }} onClick={() => this.getProfile()}><FontAwesomeIcon icon={faSync} /> Refresh</Button>
                                </Col>
                            </Row>
                            {/* Example request */}
                            <Row className="mx-5 my-3" >
                                <Col>
                                    Situation
                                </Col>
                                <Col>
                                    Identities
                                </Col>
                                <Col>
                                    Requested Amount
                                </Col>
                                <Col style={{ textAlign: "right" }}>
                                    Options
                                </Col>
                            </Row>
                            {this.state.requests.map(({ id, situation, identities, amount }) => (
                                <Row className="mx-5 my-3" style={{ backgroundColor: "#555555" }}>
                                    <Col>
                                        {situation}
                                    </Col>
                                    <Col>
                                        {identities}
                                    </Col>
                                    <Col>
                                        {amount}
                                    </Col>
                                    <Col style={{ textAlign: "right"}}>
                                        <Button type="grant_request" onClick={() => this.changeApproval(id, "grant", amount)} variant="success">
                                            Grant
                                        </Button>
                                        <Button type="deny_request" onClick={() => this.changeApproval(id, "deny", amount)} variant="danger">
                                            Deny
                                        </Button>
                                    </Col>
                                </Row>
                            ))}
                            <Row />
                        </Col>
                    )}
                    <Col sm={2} className="account-container-venmo mx-5" style={{ float: "right" }}>
                        {!this.state.venmoToken && (
                            <div>
                                <h2 className="mt-2">Link your Venmo Account</h2>
                                {!this.state.two_factor && (
                                    <Form.Group className="mx-2">
                                        <Form.Row style={{ width: "60%" }}>
                                            <Form.Label>Email Address</Form.Label>
                                            <FormControl id="username" placeholder="Email Address" onChange={() => this.updateUsername()} />
                                        </Form.Row>
                                        <Form.Row style={{ width: "60%" }} className="mt-2">
                                            <Form.Label>Password</Form.Label>
                                            <FormControl id="password" type="password" placeholder="Password" onChange={() => this.updatePassword()} />
                                        </Form.Row>
                                        <Form.Row style={{ width: "60%" }} className="mt-3">
                                            <Button variant="success" className="mr-5" onClick={() => this.loginVenmo()}>Login</Button>
                                        </Form.Row>
                                    </Form.Group>
                                )}
                                {this.state.two_factor && (
                                    <Form.Group className="mx-2">
                                        <Form.Row style={{ width: "60%" }}>
                                            <Form.Label>Enter the code sent to your phone</Form.Label>
                                            <FormControl id="code" placeholder="Code" onChange={() => this.updateCode()} />
                                        </Form.Row>
                                        <Form.Row style={{ width: "60%" }} className="mt-3">
                                            <Button variant="success" className="mr-5" onClick={() => this.submitCode()}>Submit</Button>
                                        </Form.Row>
                                    </Form.Group>
                                )}
                            </div>
                        )}
                        {this.state.venmoToken && (
                            <div className="my-2">
                                <h2 className="mt-2">Your Venmo account is linked!</h2>
                                <Button onClick={() => this.unlinkVenmo()}>Unlink</Button>
                            </div>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        venmo token: {this.state.venmoToken}
                    </Col>
                </Row>
            </div>
        );
    }
}
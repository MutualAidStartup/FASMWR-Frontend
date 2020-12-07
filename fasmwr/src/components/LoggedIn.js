/*
    Authors: Timothy Poehlman,
 */
import React from 'react';
import logo from '../images/logo.jpg';
import CardElement from './cardelement.js';

// Import bootstrap items
import {Row, Col} from 'react-bootstrap';

export default class LoggedIn extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            token: props.token, // This token is what verifies that we actually logged in
            name: null,
            about: null,
            location: null,
            link: null,
            image: null,
        }
    }

    componentDidMount() {
        //Component mounted, query database to set the state varaibles
        let _token = this.props.token;
        if(_token) {
            this.setState({
                token: _token,
            });
            this.getAccountData(_token);
        }
        else
        {
            console.log("Bad Token");
            alert("Bad Token - Logged Out");
            //this.props.setLoggedIn(null);
        }
    }

    getAccountData(_token, id)
    {

    }

    render() {
        return (
            <div>
                <Row>
                    <Col className="ml-5 my-3 ">
                        Modify your Mutual Aid project!
                        <Button/>
                    </Col>
                </Row>
                <Row>
                    <Col className="ml-5 my-3 ">
                        {/* In the future, change this to display your mutual aid, for now have it just hardcoded */}
                        {this.state.name}
                    </Col>
                </Row>
                <Row>
                    <Col className="ml-5 my-3 ">
                        {/* In the future, change this to display your mutual aid, for now have it just hardcoded */}
                        {this.state.about}
                    </Col>
                </Row>
            </div>
        );
    }
}
/*
    Authors: Timothy Poehlman,
 */
import React from 'react';
import logo from '../images/logo.jpg';
import CardElement from './cardelement.js';

// Import bootstrap items
import {Row, Col} from 'react-bootstrap';

export default class Visitor extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Row>
                <Col className="ml-5 my-3 ">
                    {/* In the future, change this to display different mutual aids, for now have it just hardcoded */}
                    <CardElement
                        // As of now my plan is to change it so it only passes the id, and the cardelement.js handles the database query
                        id={'0001'}
                        logo={logo}
                        title={"Happy Valley Mutual Aid"}
                        text={"Neighborhood-based, volunteer-run mutual aid org in Bellingham, WA. On the land of the Lummi and Nooksack Nations. Donations are not tax-deductible."}
                        link={"linktr.ee/hvma"}
                        //this will later be changed to send over the id, but for now it is 0001 since everything is hardcoded and not through the db
                        changeCardFunc={this.props.changeCardFunc}
                    />
                </Col>
            </Row>
        );
    }
}
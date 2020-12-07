/*
    Authors: Timothy Poehlman,
 */
import React from 'react';
import logo from '../images/logo.jpg';
import CardElement from './cardelement.js';
import * as $ from 'jquery';
import {flask_url} from '../App.js';

// Import bootstrap items
import {Row, Col} from 'react-bootstrap';
export default class Visitor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cardList: [],
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
                'num_cards':3
            },
            error: function (response) {
                alert(response.statusText);
                console.log(response.statusText);
                console.log("failed");
            },
            success: (data) => {
                //got the card data, not iterate through and add to the var
                console.log(data);
                for (var counter=0;counter<data["cards"].length;counter++)
                {
                    var card = data["cards"][counter];
                    console.log(card.name);
                    cardListTemp.push(
                        <Col className="ml-5 my-3" style={{minWidth:"250px"}} sm={2}>
                            <CardElement
                            id={card.id}
                            logo={card.logo}
                            title={card.name}
                            text={card.description}
                            link={card.link}
                            //this will later be changed to send over the id, but for now it is 0001 since everything is hardcoded and not through the db
                            changeCardFunc={this.props.changeCardFunc}
                            />
                        </Col>
                    );
                }
                this.setState({
                    cardList: cardListTemp
                })
                console.log(this.state.cardList);
            }
        });
    }

    render() {
        return (
            <Row>
                <Col className="ml-5 my-3" style={{minWidth:"250px"}} sm={2}>
                    {/* In the future, change this to display different mutual aids, for now have it just hardcoded */}
                    <CardElement
                        // As of now my plan is to change it so it only passes the id, and the cardelement.js handles the database query
                        id={'2'}
                        logo={logo}
                        title={"Happy Valley Mutual Aid"}
                        text={"Neighborhood-based, volunteer-run mutual aid org in Bellingham, WA. On the land of the Lummi and Nooksack Nations. Donations are not tax-deductible."}
                        link={"linktr.ee/hvma"}
                        //this will later be changed to send over the id, but for now it is 0001 since everything is hardcoded and not through the db
                        changeCardFunc={this.props.changeCardFunc}
                    />
                </Col>
                {this.state.cardList}
            </Row>
        );
    }
}
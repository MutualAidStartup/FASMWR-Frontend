/*
  Authors: Timothy Poehlman,
 */
import React from 'react'
import logo from './images/logo.jpg';
import HeaderNav from './components/navbar.js';
import CardElement from './components/cardelement.js';
import Overlay from './components/cardoverlay.js';
import RequestOverlay from './components/requestoverlay.js';
import './App.css';

// Import bootstrap items
import {Container, Row, Col} from 'react-bootstrap'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      active_card: null,
      request_aid: null,
    };
    this.changeCard = this.changeCard.bind(this);
    this.requestAid = this.requestAid.bind(this);
  }

  changeCard(active_card) {
    this.setState({
      active_card: active_card
    });
    console.log("Set state to "+active_card);
  }

  //set the request_aid state to the id of mutual aid that is being requested
  requestAid(id) {
    this.setState({
      request_aid: id
    });
    console.log("Requesting aid to "+id);
  }

  render() {
    return (
      <div className="App">
        <HeaderNav/>
        {this.state.active_card && !this.state.request_aid && (
          <Overlay
            id={'0001'}
            // As of now my plan is to change it so it only passes the id, and the cardelement.js handles the database query
            logo={logo}
            title={"Happy Valley Mutual Aid"}
            text={"Neighborhood-based, volunteer-run mutual aid org in Bellingham, WA. On the land of the Lummi and Nooksack Nations. Donations are not tax-deductible."}
            link={"linktr.ee/hvma"}
            changeCardFunc={this.changeCard}
            requestAidFunc={this.requestAid}
          />
        )}
        {this.state.request_aid && (
          <RequestOverlay 
            id={'0001'}
            // As of now my plan is to change it so it only passes the id, and the cardelement.js handles the database query
            logo={logo}
            title={"Happy Valley Mutual Aid"}
            text={"Neighborhood-based, volunteer-run mutual aid org in Bellingham, WA. On the land of the Lummi and Nooksack Nations. Donations are not tax-deductible."}
            link={"linktr.ee/hvma"}
            changeCardFunc={this.changeCard}
            requestAidFunc={this.requestAid}
          />
        )}
        <Container fluid className="main-container">
          <Row>
            <Col>
              This is a debug row!
            </Col>
            <Col>
              Active Card: {this.state.active_card}
            </Col>
          </Row>
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
                changeCardFunc={this.changeCard}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
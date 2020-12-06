/*
  Authors: Timothy Poehlman,
 */
import React from 'react'
import logo from './images/logo.jpg';
import HeaderNav from './components/navbar.js';
import CardElement from './components/cardelement.js';
import './App.css';

// Import bootstrap items
import {Container, Row, Col} from 'react-bootstrap'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      active_card: '0000',
    };
    this.changeCard = this.changeCard.bind(this);
  }

  changeCard(active_card) {
    this.setState({
      active_card: active_card
    });
    console.log("Set state to "+active_card);
  }

  render() {
    return (
      <div className="App">
        <HeaderNav/>

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
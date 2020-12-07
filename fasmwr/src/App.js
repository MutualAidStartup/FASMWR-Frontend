/*
  Authors: Timothy Poehlman,
 */
import React from 'react';
import logo from './images/logo.jpg';
import HeaderNav from './components/navbar.js';
import Overlay from './components/cardoverlay.js';
import RequestOverlay from './components/requestoverlay.js';
import Visitor from './components/Visitor.js';
import LoggedIn from './components/LoggedIn.js';
import './App.css';

// Import bootstrap items
import {Container, Row, Col} from 'react-bootstrap';

export const flask_url = "http://127.0.0.1:5000/";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      id: null,
      token: null,
      active_card: null,
      request_aid: null,
      page: null,
    };
    this.changeCard = this.changeCard.bind(this);
    this.requestAid = this.requestAid.bind(this);
    this.setLoggedIn = this.setLoggedIn.bind(this);
    this.changeToken = this.changeToken.bind(this);
    this.changeId = this.changeId.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  setLoggedIn(value) {
    this.setState({
      token: value
    });
    console.log("login success");
  }

  changeCard(new_active_card) {
    this.setState({
      active_card: new_active_card
    });
    console.log("Set state to "+ new_active_card);
  }

  //set the request_aid state to the id of mutual aid that is being requested
  requestAid(id) {
    this.setState({
      request_aid: id
    });
    console.log("Requesting aid to "+id);
  }

  changeId(value) {
    this.setState({
      id: value,
    })
    console.log("Changed id to "+value)
  }

  changeToken(value) {
    this.setState({
      token: value,
    })
    console.log("Changed token to "+value)
  }

  changePage(value) {
    this.setState({
      page: value,
    })
    console.log("Changed page to "+value)
  }

  render() {
    return (
      <div className="App">
        <HeaderNav
          token={this.state.token}
          setLoggedIn={this.setLoggedIn}
          changeToken={this.changeToken}
          changeId={this.changeId}
          changePage={this.changePage}
        />
        {this.state.active_card && !this.state.request_aid && (
          <Overlay
            id={this.state.active_card}
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
            <Col>
              server url: {flask_url}
            </Col>
            <Col>
              id: {this.state.id}
            </Col>
            <Col>
              token: {this.state.token}
            </Col>
          </Row>
          {/* THIS IS ONLY DISPLAYED WHEN USER IS NOT LOGGED IN (VISITOR) */}
          {!this.state.token && (
            <Visitor 
              changeCardFunc={this.changeCard}
            />
          )}
          {/* THIS IS ONLY DISPLAYED WHEN USER IS LOGGED IN (USER) */}
          {this.state.token && (
            <LoggedIn 
              id={this.state.id}
              token={this.state.token}
              page={this.state.page}
            />
          )}
        </Container>
      </div>
    );
  }
}
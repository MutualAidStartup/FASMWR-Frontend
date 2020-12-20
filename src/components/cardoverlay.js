import React from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import * as $ from 'jquery';
import { flask_url } from '../App.js';

export class Overlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
        };
    }

    componentDidMount() {
        //on load, create the cards that will be printed
        var cardListTemp = [];
        //get the cards from db

        $.ajax({
            url: flask_url + "getCardInfo",
            type: "GET",
            data: { 
                'id':this.state.id,
                'num_cards': 3 
            },
            error: function (response) {
                alert(response.statusText);
                console.log(response.statusText);
                console.log("failed");
            },
            success: (data) => {
                //got the card data, not iterate through and add to the var
                console.log(data);
                for (var cardItem in data) {
                    var card = data[cardItem];
                    console.log(card[0].name);
                    this.setState({
                        id: card[0].id,
                        logo: card[0].logo,
                        title: card[0].name,
                        text: card[0].description,
                        link: card[0].link
                    });
                };
                this.setState({
                    cardList: cardListTemp
                })
                console.log(this.cardList);
            }
        });
}
render() {
    return (
        <Container fluid className="overlay-container">
            <Row className="justify-content-md-center mt-5">
                <Col md="auto">
                    <img alt="Happy Valley Mutual Aid Logo" src={this.state.logo} />
                </Col>
                <Col md="auto">
                    <Card style={{ width: '50rem' }}>
                        <Card.Body>
                            <Card.Title> {this.state.title} <Button className="ml-3" variant="primary" style={{ float: "right", marginTop: '0' }} onClick={() => this.props.changeCardFunc(null)}>Go Back</Button> </Card.Title>
                            <Card.Text>
                                {this.state.text}
                            </Card.Text>
                            {!this.state.link==="" &&(
                                <Button variant="primary" className="mr-3" href={"http://" + this.state.link}>{this.state.link}</Button>
                            )}
                            <Button className="" variant="primary" onClick={() => this.props.requestAidFunc(this.state.id)}>Request Aid</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
}

export default Overlay;
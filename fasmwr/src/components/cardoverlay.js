import React from "react";
import {Container, Row, Col, Card, Button} from 'react-bootstrap'

const Overlay = props => {
    return (
        <Container fluid className="overlay-container">
            <Row className="justify-content-md-center mt-5">
                <Col md="auto">
                    <img alt="Happy Valley Mutual Aid Logo" src={props.logo} />
                </Col>
                <Col md="auto">
                    <Card style={{ width: '50rem' }}>
                        <Card.Body>
                            <Card.Title> {props.title} <Button className="ml-3" variant="primary" style={{float:"right", marginTop:'0'}} onClick={() => props.changeCardFunc(null)}>Go Back</Button> </Card.Title>
                            <Card.Text>
                                {props.text}
                            </Card.Text>
                            <Button variant="primary" href={"http://"+props.link}>{props.link}</Button>
                            <Button className="ml-3" variant="primary" onClick={() => props.requestAidFunc(props.id)}>Request Aid</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Overlay;
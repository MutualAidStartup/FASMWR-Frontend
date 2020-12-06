import logo from './images/logo.jpg';
import './App.css';

// Import bootstrap items
import {Button, Container, Row, Col, Navbar, Nav, Card} from 'react-bootstrap'

function App() {

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" className="nav-bar-font">
        <Navbar.Brand href="#home">
          <img src={logo} className="hv-logo" alt="logo" />
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Nav float="right">
          FASMWR
        </Nav>
      </Navbar>
      <Container fluid className="main-container">
        <Row>
          <Col className="ml-5 my-3 ">
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={logo} />
              <Card.Body>
                <Card.Title>Happy Valley Mutual Aid</Card.Title>
                <Card.Text>
                  Neighborhood-based, volunteer-run mutual aid org in Bellingham, WA. On the land of the Lummi and Nooksack Nations.
                  Donations are not tax-deductible.
                </Card.Text>
                <Button variant="primary" href="http://linktr.ee/hvma">linktr.ee/hvma</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

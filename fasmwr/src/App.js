import logo from './images/logo.jpg';
import HeaderNav from './components/navbar.js';
import CardElement from './components/cardelement.js';
import './App.css';

// Import bootstrap items
import {Container, Row, Col} from 'react-bootstrap'

function App() {
  return (
    <div className="App">
      <HeaderNav/>

      <Container fluid className="main-container">
        <Row>
          <Col className="ml-5 my-3 ">
            {/* In the future, change this to display different mutual aids, for now have it just hardcoded */}
            <CardElement
              logo={logo}
              title={"Happy Valley Mutual Aid"}
              text={"Neighborhood-based, volunteer-run mutual aid org in Bellingham, WA. On the land of the Lummi and Nooksack Nations. Donations are not tax-deductible."}
              link={"linktr.ee/hvma"}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

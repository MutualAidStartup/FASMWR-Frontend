import React from "react";
import {Button, Navbar, Nav, Form, FormControl} from 'react-bootstrap'

const HeaderNav = props => {
    return (
        <Navbar bg="dark" variant="dark" className="nav-bar-font">
            <Nav href="#home" className="nav-logo pr-3">
                FASMWR
            </Nav>
            <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Form inline>
                <div className="pr-2" style={{color:"white", fontSize:"16pt", verticalAlign:"middle"}}>
                Find a mutual aid!
                </div>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
            </Form>
        </Navbar>
    )
}

export default HeaderNav;
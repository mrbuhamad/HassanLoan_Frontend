import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

// import masterStore from "../stores/masterStore";

function Webnavbar() {
  const style = { backgroundColor: "#000034" };

  return (
    <div>
      <Navbar variant="dark" style={style}>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Active Loans</Nav.Link>
          <Nav.Link href="#pricing">Participant</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
    </div>
  );
}
export default Webnavbar;

import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import masterStore from "../stores/masterStore";

function Webnavbar() {
  const style = { backgroundColor: "#000034" };

  const handleChange = (event) => {
    masterStore.filterPart(event.target.value);
  };

  return (
    <div>
      <Navbar variant="dark" style={style}>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link>
            <NavLink
              style={{ color: "gray" }}
              activeStyle={{ fontWeight: "bold", color: "white" }}
              to="/home/"
            >
              Home
            </NavLink>
          </Nav.Link>

          <Nav.Link>
            <NavLink
              style={{ color: "gray" }}
              activeStyle={{ fontWeight: "bold", color: "white" }}
              to="/participants/"
            >
              Participant
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink
              style={{ color: "gray" }}
              activeStyle={{ fontWeight: "bold", color: "white" }}
              to="/ActiveLoans/"
            >
              Active Loans
            </NavLink>
          </Nav.Link>
        </Nav>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            onChange={handleChange}
          />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
    </div>
  );
}
export default Webnavbar;

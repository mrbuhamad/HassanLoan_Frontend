import React, { Component } from "react";
import { observer } from "mobx-react";

import { Row, Col, Spinner, Card, Button } from "react-bootstrap";

//store
import masterStore from "../../stores/masterStore";

class PartDetaile extends Component {
  participants = this.props.participants;
  partID = this.props.match.params.partID;

  componentDidMount() {
    masterStore.fetchLoans(this.partID);
    console.log("Loans", masterStore.Loans);
  }

  render() {
    return masterStore.loadingLoans ? (
      <Spinner animation="border" variant="primary" size="l" />
    ) : (
      <div>
        <h1>{masterStore.Loans.name}</h1>
        <Col>
          <Card
            border="info"
            style={{ width: "18rem" }}
            onClick={() => this.fetchLoans}
          >
            <Card.Header style={{ backgroundColor: "#e3f2fd" }}></Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Text>{masterStore.Loans.name}</Card.Text>
                </Col>
                <Col>
                  <Card.Text>settled Loans</Card.Text>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Card.Text>hold amount: KD</Card.Text>
                </Col>
                <Col>
                  <Card.Text>profit amount:</Card.Text>
                </Col>
              </Row>

              <Button variant="primary">Add Loan </Button>
            </Card.Body>
          </Card>
        </Col>
      </div>
    );
  }
}
export default observer(PartDetaile);

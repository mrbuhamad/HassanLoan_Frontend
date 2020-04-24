import React, { Component } from "react";
import { observer } from "mobx-react";

import { Row, Col, Container, Card, Button } from "react-bootstrap";

//store

// "name": "محمد بوحمد",
//         "part_hold_amount": 350,
//         "part_profit_amount": 50,
//         "settled_loans": 0,
//         "active_loans": 1

class PartCard extends Component {
  participants = this.props.participants;
  render() {
    return (
      <div>
        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{this.participants.name}</Card.Title>
              <Row>
                <Col>
                  <Card.Text>
                    <p>Active Loans {this.participants.active_loans}</p>
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text>
                    <p>settled Loans {this.participants.settled_loans} </p>
                  </Card.Text>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Card.Text>
                    <p>hold amount: {this.participants.part_hold_amount}KD</p>
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text>
                    <p>
                      profit amount: {this.participants.part_profit_amount}KD{" "}
                    </p>
                  </Card.Text>
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
export default observer(PartCard);

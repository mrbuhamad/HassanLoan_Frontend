import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import { Row, Col, Container, Card, Button } from "react-bootstrap";

//store
import masterStore from "../../stores/masterStore";

class PartCard extends Component {
  participants = this.props.participants;

  fetchLoans = () => {
    const id = this.participants.id;
    masterStore.fetchLoans(id);
  };
  render() {
    return (
      <div>
        <Col>
          <Card border="info" style={{ width: "18rem" }}>
            <Link
              to={`/Loans/${this.participants.id}`}
              onClick={() => this.fetchLoans}
            >
              <Card.Header style={{ backgroundColor: "#e3f2fd" }}>
                {this.participants.name}
              </Card.Header>
            </Link>

            <Card.Body>
              <Row>
                <Col>
                  <Card.Text>
                    Active Loans {this.participants.active_loans}
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text>
                    settled Loans {this.participants.settled_loans}
                  </Card.Text>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Card.Text>
                    hold amount: {this.participants.part_hold_amount}KD
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text>
                    profit amount: {this.participants.part_profit_amount}KD{" "}
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

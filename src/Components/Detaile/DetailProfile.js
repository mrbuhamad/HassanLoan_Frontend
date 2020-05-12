import React, { Component } from "react";
import { observer } from "mobx-react";

import { Row, Col } from "react-bootstrap";

class DetailProfile extends Component {
  participants = this.props.participants;

  render() {
    return (
      <div>
        <Row>
          <Col>
            <h5>Active Loans {this.participants.active_loans}</h5>
          </Col>
          <Col>
            <h5>settled Loans {this.participants.settled_loans}</h5>
          </Col>
        </Row>

        <Row>
          <Col>
            <h5>hold amount: {this.participants.part_hold_amount}KD</h5>
          </Col>
          <Col>
            <h5>profit amount: {this.participants.part_profit_amount}KD</h5>
          </Col>
        </Row>
      </div>
    );
  }
}
export default observer(DetailProfile);

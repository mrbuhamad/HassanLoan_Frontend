import React, { Component } from "react";
import { observer } from "mobx-react";

import { Col, Spinner, Card, ProgressBar, Button } from "react-bootstrap";

//store
import masterStore from "../../stores/masterStore";
import pymentsStore from "../../stores/paymentsStore";

class PartDetaile extends Component {
  participants = this.props.participants;
  loan = this.props.loan;
  prograss = (this.loan.paid_amount / this.loan.totla_loan_amount) * 100;

  handleShow = () => {
    pymentsStore.fetchPayments(this.loan.id);
    pymentsStore.handleShow();
  };
  render() {
    return masterStore.loadingLoans ? (
      <Spinner animation="border" variant="primary" size="l" />
    ) : (
      <div>
        <Col>
          <button
            onClick={this.handleShow}
            style={{ padding: 0, border: "none", background: "none" }}
          >
            <Card border="info" style={{ width: "18rem" }}>
              <Card.Header style={{ backgroundColor: "#e3f2fd" }}>
                <h5>
                  Loan # 0{this.loan.id} {" -- "}({this.loan.loan_amount} KD)
                </h5>
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  {this.loan.paid_amount} kd / {this.loan.loan_amount} KD
                </Card.Title>
                <ProgressBar animated now={this.prograss} />

                <Card.Text>start date: {this.loan.date}</Card.Text>
                <Card.Text>hold_amount {this.loan.hold_amount} KD</Card.Text>

                <Card.Text>
                  profit_amount {this.loan.profit_amount} KD
                </Card.Text>

                <Card.Text>paid_amount {this.loan.paid_amount} KD</Card.Text>

                <Button>Add Pyment</Button>
              </Card.Body>
            </Card>
          </button>
        </Col>
      </div>
    );
  }
}
export default observer(PartDetaile);

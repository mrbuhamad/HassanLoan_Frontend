import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Col, Spinner, Card, ProgressBar } from "react-bootstrap";

//store
import masterStore from "../../stores/masterStore";
import pymentsStore from "../../stores/paymentsStore";
import loanStore from "../../stores/loanStore";

// component
import UpdateLoanCard from "./UpdateLoanCard";

import style from "../style";

class ActiveLoanCard extends Component {
  state = {
    prograss:
      (this.props.loan.paid_amount / this.props.loan.totla_loan_amount) * 100,
  };

  participants = masterStore.partObj;
  loan = this.props.loan;

  setprogress = (prograss) =>
    this.setState({
      prograss: prograss,
    });

  getstatus = () =>
    this.loan.status === "error paid_amount more than totla_loan_amount "
      ? "Error: Loan over payed"
      : `Status: ${this.loan.status}`;

  style = () => {
    if (this.loan.status === "Active") {
      return "primary";
    } else if (this.loan.status === "Settled") {
      return "dark";
    } else {
      return "danger";
    }
  };

  styletext = () => {
    if (this.loan.status === "Settled" || this.loan.status === "Active") {
      return "dark";
    } else {
      return "danger";
    }
  };

  styleHeader = () => {
    if (this.loan.status === "Active") {
      return "#e3f2fd";
    } else if (this.loan.status === "Settled") {
      return "#CCD1D1";
    } else {
      return "#FADBD8";
    }
  };

  render() {
    if (masterStore.loadingPart || loanStore.loandignActiv) {
      return <Spinner animation="border" variant="primary" size="l" />;
    } else if (
      pymentsStore.showUpdateCard &&
      pymentsStore.editLoanId === this.loan
    ) {
      return (
        <UpdateLoanCard
          loan={this.loan}
          participants={this.props.participants}
        />
      );
    } else {
      const partobj = masterStore.participants.find((part) => {
        if (part.id === this.loan.participant) {
          return true;
        }
      });

      return (
        <div>
          <Col>
            <Link
              to={`/Loans/${partobj.id}/`}
              style={{ textDecoration: "none" }}
              onClick={this.fetchdata}
            >
              <Card
                border={this.style()}
                text={this.styletext()}
                className="text-center"
                style={style.activPart}
              >
                <Card.Header style={{ backgroundColor: this.styleHeader() }}>
                  <h4> {partobj.name}</h4>
                  <h5>
                    Loan # 0{this.loan.id} {" -- "}({this.loan.loan_amount} KD)
                  </h5>
                </Card.Header>
                <Card.Body>
                  <Card.Title>
                    {this.loan.paid_amount} kd / {this.loan.totla_loan_amount}{" "}
                    KD
                  </Card.Title>
                  <ProgressBar
                    animated
                    variant={this.style()}
                    now={this.state.prograss}
                  />

                  <Card.Text>start date: {this.loan.date}</Card.Text>
                  <Card.Text>hold_amount {this.loan.hold_amount} KD</Card.Text>

                  <Card.Text>
                    profit_amount {this.loan.profit_amount} KD
                  </Card.Text>

                  <Card.Text>paid_amount {this.loan.paid_amount} KD</Card.Text>

                  <Card.Text>{this.getstatus()} </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </div>
      );
    }
  }
}
export default observer(ActiveLoanCard);

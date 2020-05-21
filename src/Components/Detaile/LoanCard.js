import React, { Component } from "react";
import { observer } from "mobx-react";

import { Col, Spinner, Card, ProgressBar, Button } from "react-bootstrap";

//store
import masterStore from "../../stores/masterStore";
import pymentsStore from "../../stores/paymentsStore";
import loanStore from "../../stores/loanStore";

// component
import UpdateLoanCard from "./UpdateLoanCard";
import PymentModal from "../Modal/PymentModal";

import style from "../style";

class LoanCard extends Component {
  state = {
    show: false,
    prograss:
      (this.props.loan.paid_amount / this.props.loan.totla_loan_amount) * 100,
  };

  participants = masterStore.partObj;
  loan = this.props.loan;

  handleClose = () => this.setState({ show: false });

  handleShowModal = () => this.setState({ show: true });

  handleShow = () => {
    pymentsStore.fetchPayments(this.loan.id);
    pymentsStore.handleShow();
  };

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
  handleShowUpdate = () => {
    masterStore.specifyPart(this.participants.id);
    pymentsStore.handleShowUpdate(this.loan);
  };

  componentWillUnmount() {
    pymentsStore.clearPayment();
  }

  render() {
    if (masterStore.loadingLoans && loanStore.loandignActiv) {
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
      const handleShowPymentModal = () => {
        masterStore.specifyloan(this.loan.id);
        pymentsStore.handleShowModal();
      };
      return (
        <div>
          {/*   modal ---------------- modal  */}
          <PymentModal setprogress={this.setprogress} loan={this.loan} />
          {/*   modal ---------------- modal  */}

          <Col>
            <button
              onClick={this.handleShow}
              style={{ padding: 0, border: "none", background: "none" }}
            >
              <Card
                border={this.style()}
                text={this.styletext()}
                className="text-center"
                style={style.activPart}
              >
                <Card.Header style={{ backgroundColor: this.styleHeader() }}>
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

                  <Button
                    variant={this.style()}
                    onClick={handleShowPymentModal}
                  >
                    Add Pyment
                  </Button>
                  <Button
                    variant={this.style()}
                    onClick={this.handleShowUpdate}
                  >
                    Edit Loan
                  </Button>
                </Card.Body>
              </Card>
            </button>
          </Col>
        </div>
      );
    }
  }
}
export default observer(LoanCard);

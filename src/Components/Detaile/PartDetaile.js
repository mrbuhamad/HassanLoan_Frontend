import React, { Component } from "react";
import { observer } from "mobx-react";

import {
  Modal,
  Spinner,
  Card,
  Button,
  FormControl,
  Form,
  Row,
  Col,
  Container,
} from "react-bootstrap";

//store
import masterStore from "../../stores/masterStore";
import pymentsStore from "../../stores/paymentsStore";

//components
import LoanCard from "./LoanCard";
import Pyments from "./Pyments";

class PartDetaile extends Component {
  state = {
    show: false,
    loan_amount: "",
    hold_amount: "",
    profit_amount: "",
    date: "",
  };

  participants = this.props.participants;
  partID = this.props.match.params.partID;

  componentDidMount() {
    masterStore.fetchLoans(this.partID);
    console.log("Loans", masterStore.Loans);
  }

  handleClose = () => this.setState({ show: false });

  handleShow = () => this.setState({ show: true });

  handleChangeamount = (event) => {
    this.setState({ loan_amount: event.target.value });
  };
  handleChangehold = (event) => {
    this.setState({ hold_amount: event.target.value });
  };
  handleChangeprofit = (event) => {
    this.setState({ profit_amount: event.target.value });
  };
  handleChangedate = (event) => {
    this.setState({ date: event.target.value });
  };

  handleSubmit = () => {
    let nameloan = {
      participant: this.partID,
      loan_amount: this.state.loan_amount,
      hold_amount: this.state.hold_amount,
      profit_amount: this.state.profit_amount,
      date: this.state.date,
    };
    masterStore.addLoan(nameloan);
    this.handleClose();
  };

  render() {
    return masterStore.loadingLoans ? (
      <Spinner animation="border" variant="primary" size="3" />
    ) : (
      <div>
        {/*   modal ---------------- modal  */}
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Loan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                loan_amount
              </Form.Label>
              <Col sm={8}>
                <FormControl
                  placeholder="loan_amount"
                  value={this.state.loan_amount}
                  onChange={this.handleChangeamount}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                hold_amount
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  placeholder="hold_amount"
                  value={this.state.hold_amount}
                  onChange={this.handleChangehold}
                />
              </Col>
              <Form.Label column sm={3}>
                profit_amount
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  placeholder="profit_amount"
                  value={this.state.profit_amount}
                  onChange={this.handleChangeprofit}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                date
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="date"
                  placeholder="date"
                  value={this.state.date}
                  onChange={this.handleChangedate}
                />
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        {/*   modal ---------------- modal  */}
        <Container>
          <Card border="info">
            <Card.Header
              style={{
                backgroundColor: "#e3f2fd",
                fontSize: "2rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {masterStore.Loans.name}
            </Card.Header>
            <Button variant="primary" onClick={this.handleShow}>
              Add Loan{" "}
            </Button>

            <Card.Body>
              <Row>
                {masterStore.Loans.loans.map((loan) => {
                  return <LoanCard key={loan.id} loan={loan} />;
                })}
              </Row>
            </Card.Body>
          </Card>

          <Card border="info">
            <Pyments />
          </Card>
        </Container>
      </div>
    );
  }
}
export default observer(PartDetaile);

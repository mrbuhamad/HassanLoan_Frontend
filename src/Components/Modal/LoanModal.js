import React, { Component } from "react";
import { observer } from "mobx-react";

import { Modal, Button, FormControl, Form, Row, Col } from "react-bootstrap";

//store
import masterStore from "../../stores/masterStore";
import holdStore from "../../stores/holdStore";

class LoanModal extends Component {
  state = {
    loan_amount: "",
    hold_amount: "",
    profit_amount: "",
    date: "",
  };

  partID = this.props.partID;

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
    holdStore.addHoldFLoan(nameloan);
    masterStore.handleCloseLoan();
  };

  render() {
    return (
      <Modal
        show={masterStore.showLoanModal}
        onHide={masterStore.handleCloseLoan}
      >
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
          <Button variant="secondary" onClick={masterStore.handleCloseLoan}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default observer(LoanModal);

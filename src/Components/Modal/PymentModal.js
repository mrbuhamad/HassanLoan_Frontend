import React, { Component } from "react";
import { observer } from "mobx-react";

import { Modal, Button, FormControl, Form, Row, Col } from "react-bootstrap";

//store
import pymentsStore from "../../stores/paymentsStore";

class PymentModal extends Component {
  state = {
    pyment: "",
    date: "",
  };

  loan = this.props.loan;

  handleChangeamount = (event) => {
    this.setState({ pyment: event.target.value });
  };

  handleChangedate = (event) => {
    this.setState({ date: event.target.value });
  };

  addPayment = () => {
    const pyment = {
      loan: this.loan.id,
      pyment: this.state.pyment,
      date: this.state.date,
    };
    pymentsStore.addPayment(pyment);
    let newPaidAmount =
      Number(this.props.loan.paid_amount) + Number(this.state.pyment);

    this.props.setprogress(
      (newPaidAmount / this.props.loan.totla_loan_amount) * 100
    );

    pymentsStore.handleCloseModal();
  };

  render() {
    return (
      <Modal
        show={pymentsStore.showPymentModal}
        onHide={pymentsStore.handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add pyment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Pyment
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
          <Button variant="secondary" onClick={pymentsStore.handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={this.addPayment}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default observer(PymentModal);

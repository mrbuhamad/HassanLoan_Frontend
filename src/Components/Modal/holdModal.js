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

class holdModal extends Component {
  state = {
    part_hold_amount: "",
    reasoning: "",
    date: "",
  };

  partID = this.props.partID;

  handleChangeamount = (event) => {
    this.setState({ part_hold_amount: event.target.value });
  };
  handleChangehold = (event) => {
    this.setState({ hold_amount: event.target.value });
  };
  handleChangedate = (event) => {
    this.setState({ date: event.target.value });
  };

  handleSubmit = () => {
    let nameloan = {
      participant: this.partID,
      part_hold_amount: this.state.part_hold_amount,
      hold_amount: this.state.hold_amount,
      date: this.state.date,
    };
    masterStore.addLoan(nameloan);
    masterStore.handleCloseLoan();
  };

  render() {
    return (
      <Modal
        show={masterStore.showholdModal}
        onHide={masterStore.handleCloseLoan}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Hold</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              part_hold_amount
            </Form.Label>
            <Col sm={8}>
              <FormControl
                placeholder="part_hold_amount"
                value={this.state.part_hold_amount}
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

export default observer(holdModal);

import React, { Component } from "react";
import { observer } from "mobx-react";

import { Modal, Button, FormControl, Form, Row, Col } from "react-bootstrap";

//store
import holdStore from "../../stores/holdStore";

class HoldModaal extends Component {
  state = {
    part_hold_amount: "",
    reasoning: "",
    date: "",
  };

  partID = this.props.partID;

  handleChangeamount = (event) => {
    this.setState({ part_hold_amount: event.target.value });
  };

  handleChangedate = (event) => {
    this.setState({ date: event.target.value });
  };

  handleSubmit = () => {
    let part_hold_amount = this.state.part_hold_amount;
    if (holdStore.reasoning === "capital withdraw") {
      part_hold_amount = part_hold_amount * -1;
    } else {
      part_hold_amount = part_hold_amount;
    }

    let holdObj = {
      participant: this.partID,
      part_hold_amount: part_hold_amount,
      reasoning: holdStore.reasoning,
      date: this.state.date,
    };
    holdStore.addHold(holdObj);
    holdStore.handleCloseHold();
  };

  render() {
    return (
      <Modal show={holdStore.showHoldModal} onHide={holdStore.handleCloseHold}>
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
          <Button variant="secondary" onClick={holdStore.handleCloseHold}>
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

export default observer(HoldModaal);

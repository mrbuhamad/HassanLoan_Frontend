import React, { Component } from "react";
import { observer } from "mobx-react";

import {
  Col,
  Spinner,
  Card,
  ProgressBar,
  Button,
  Modal,
  Form,
  Row,
  FormControl,
} from "react-bootstrap";

//store
import masterStore from "../../stores/masterStore";
import pymentsStore from "../../stores/paymentsStore";

class LoanCard extends Component {
  state = {
    show: false,
    pyment: "",
    date: "",
    prograss:
      (this.props.loan.paid_amount / this.props.loan.totla_loan_amount) * 100,
  };

  participants = this.props.participants;
  loan = this.props.loan;

  handleClose = () => this.setState({ show: false });

  handleShowModal = () => this.setState({ show: true });

  handleChangeamount = (event) => {
    this.setState({ pyment: event.target.value });
  };

  handleChangedate = (event) => {
    this.setState({ date: event.target.value });
  };

  handleShow = () => {
    pymentsStore.fetchPayments(this.loan.id);
    pymentsStore.handleShow();
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
    console.log(newPaidAmount);
    this.setState({
      prograss: (newPaidAmount / this.props.loan.totla_loan_amount) * 100,
    });
    this.handleClose();
  };

  render() {
    return masterStore.loadingLoans ? (
      <Spinner animation="border" variant="primary" size="l" />
    ) : (
      <div>
        {/*   modal ---------------- modal  */}
        <Modal show={this.state.show} onHide={this.handleClose}>
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
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.addPayment}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        {/*   modal ---------------- modal  */}

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
                <ProgressBar animated now={this.state.prograss} />

                <Card.Text>start date: {this.loan.date}</Card.Text>
                <Card.Text>hold_amount {this.loan.hold_amount} KD</Card.Text>

                <Card.Text>
                  profit_amount {this.loan.profit_amount} KD
                </Card.Text>

                <Card.Text>paid_amount {this.loan.paid_amount} KD</Card.Text>

                {/* <Card.Text>status  {this.loan.status} </Card.Text> */}

                <Button variant="primary" onClick={this.handleShowModal}>
                  Add Pyment
                </Button>
              </Card.Body>
            </Card>
          </button>
        </Col>
      </div>
    );
  }
}
export default observer(LoanCard);

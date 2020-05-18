import React, { Component } from "react";
import { observer } from "mobx-react";

import { Button, Row, Col, Form, FormControl, Card } from "react-bootstrap";

//store
import masterStore from "../../stores/masterStore";
import paymentsStore from "../../stores/paymentsStore";
import holdStore from "../../stores/holdStore";

import style from "../style";

class UpdateLoanCard extends Component {
  state = {
    loan_amount: this.props.loan.loan_amount,
    hold_amount: this.props.loan.hold_amount,
    profit_amount: this.props.loan.profit_amount,
    date: this.props.loan.date,
  };

  loan = this.props.loan;

  handleChangeamount = (event) => {
    this.setState({ loan_amount: Number(event.target.value) });
  };
  handleChangehold = (event) => {
    this.setState({ hold_amount: Number(event.target.value) });
  };
  handleChangeprofit = (event) => {
    this.setState({ profit_amount: Number(event.target.value) });
  };
  handleChangedate = (event) => {
    this.setState({ date: event.target.value });
  };

  handleSubmit = () => {
    let nameloan = {
      participant: masterStore.partObj.id,
      loan_amount: this.state.loan_amount,
      hold_amount: this.state.hold_amount,
      profit_amount: this.state.profit_amount,
      date: this.state.date,
    };
    masterStore.editLoan(this.props.loan.id, nameloan);
    holdStore.editHold(this.props.loan.id, nameloan);
    paymentsStore.handlecloseUpdate();
  };

  render() {
    const Loanobj = masterStore.LoanObj;
    if (Loanobj) {
      return (
        <Card
          border="primary"
          text="dark"
          className="text-center"
          style={style.activPart}
        >
          <Card.Header>
            <Form.Group as={Row} controlId="formHorizontaltitle">
              <Form.Label column sm={6}>
                Loan # 0{this.loan.id}
              </Form.Label>
              <Col sm={6}>
                <FormControl
                  placeholder="loan_amount"
                  defaultValue={this.props.loan.loan_amount}
                  onChange={this.handleChangeamount}
                />
              </Col>
            </Form.Group>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <Form.Group controlId="formdate">
                <Form.Label sm={5}>date</Form.Label>
                <Col>
                  <Form.Control
                    type="date"
                    placeholder="date"
                    defaultValue={this.props.loan.date}
                    onChange={this.handleChangedate}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={6}>
                  hold_amount :
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    controlId="formHorizontalhold_amountupdate"
                    placeholder="hold_amount"
                    defaultValue={this.props.loan.hold_amount}
                    onChange={this.handleChangehold}
                  />
                </Col>
                <Form.Label column sm={6}>
                  profit_amount :
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    controlId="formHorizontalprofit_amountupdate"
                    placeholder="profit_amount"
                    defaultValue={this.props.loan.profit_amount}
                    onChange={this.handleChangeprofit}
                  />
                </Col>
              </Form.Group>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button variant="danger" onClick={paymentsStore.handlecloseUpdate}>
              Close Edit
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Edit Loan
            </Button>
          </Card.Footer>
        </Card>
      );
    }
  }
}

export default observer(UpdateLoanCard);

import React, { Component } from "react";
import { observer } from "mobx-react";

import { Container, Spinner, Row, Button } from "react-bootstrap";

//store
import loanStore from "../../stores/loanStore";

// Components
import ActiveLoanCard from "../Detaile/ActiveLoanCard";

class ActiveLoan extends Component {
  loanCards = () => {
    if (!loanStore.loandignActiv) {
      return loanStore.activLoans.map((loan) => {
        return <ActiveLoanCard key={loan.id} loan={loan} />;
      });
    }
  };

  render() {
    if (loanStore.loandignActiv) {
      return <Spinner animation="border" variant="primary" size="l" />;
    } else {
      return (
        <div>
          <Container fluid>
            <Button variant="primary" onClick={this.handleShow}>
              Add Loan{" "}
            </Button>
            <Row>{this.loanCards()}</Row>
          </Container>
        </div>
      );
    }
  }
}
export default observer(ActiveLoan);

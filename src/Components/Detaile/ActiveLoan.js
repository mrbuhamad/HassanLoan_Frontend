import React, { Component } from "react";
import { observer } from "mobx-react";

import {
  Container,
  Spinner,
  Row,
  Button,
  Modal,
  FormControl,
} from "react-bootstrap";

//store
import loanStore from "../../stores/loanStore";

// Components
import ActiveLoanCard from "../Detaile/ActiveLoanCard";

class ActiveLoan extends Component {
  state = {
    show: false,
    name: "",
  };

  //   handleClose = () => this.setState({ show: false });

  //   handleShow = () => this.setState({ show: true });

  //   handleChange = (event) => {
  //     this.setState({ name: event.target.value });
  //   };
  //   handleSubmit = () => {
  //     let nameItem = { name: this.state.name };
  //     masterStore.addParticipants(nameItem);
  //     this.handleClose();
  //   };

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
          {/*   modal ---------------- modal  */}

          {/*   modal ---------------- modal  */}

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

import React, { Component } from "react";
import { observer } from "mobx-react";

import {
  Spinner,
  Card,
  Button,
  Row,
  Container,
  Tabs,
  Tab,
} from "react-bootstrap";

//store
import masterStore from "../../stores/masterStore";
import holdStore from "../../stores/holdStore";

//components
import LoanCard from "./LoanCard";
import Pyments from "./Pyments";
import Holds from "../Holds/Holds";

// Modals
import LoanModal from "../Modal/LoanModal";
import HoldModal from "../Modal/HoldModal";

class PartDetaile extends Component {
  participants = this.props.participants;
  partID = this.props.match.params.partID;

  componentDidMount() {
    masterStore.fetchLoans(this.partID);
    holdStore.fetchHolds(this.partID);
  }

  loanCards = () => {
    if (masterStore.loadingLoans) {
      return null;
    } else {
      return masterStore.Loans.loans.map((loan) => {
        return <LoanCard key={loan.id} loan={loan} />;
      });
    }
  };

  render() {
    return (
      <div>
        {/*   modal ---------------- modal  */}

        <LoanModal partID={this.partID} />
        <HoldModal partID={this.partID} />

        {/*   modal ---------------- modal  */}

        <Container>
          <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
            {/* ---------------- Home tab------------------ */}
            <Tab eventKey="profile" title="Profile"></Tab>

            {/* ---------------- Loan tab------------------ */}
            <Tab eventKey="Loans" title="Loans">
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
                <Button variant="primary" onClick={masterStore.handleShowLoan}>
                  Add Loan{" "}
                </Button>

                <Card.Body>
                  <Row>{this.loanCards()}</Row>
                </Card.Body>
              </Card>

              <Card border="info">
                <Pyments />
              </Card>
            </Tab>

            {/* ---------------- Hold tab------------------ */}

            <Tab eventKey="Hold" title="Hold">
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
                <Card.Body>
                  <Row>
                    <Button
                      variant="primary"
                      onClick={holdStore.handleShowHoldAdd}
                      style={{ flex: 1 }}
                    >
                      Add Hold
                    </Button>
                    <Button
                      variant="danger"
                      onClick={holdStore.handleShowHoldWd}
                      style={{ flex: 1 }}
                    >
                      wethdrow Hold
                    </Button>
                  </Row>
                </Card.Body>
              </Card>

              <Card border="info">
                <Holds />
              </Card>
            </Tab>
          </Tabs>
        </Container>
      </div>
    );
  }
}
export default observer(PartDetaile);

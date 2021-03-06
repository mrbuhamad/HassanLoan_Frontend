import React, { Component } from "react";
import { observer } from "mobx-react";

import { Card, Button, Row, Container, Tabs, Tab } from "react-bootstrap";

//store
import masterStore from "../../stores/masterStore";
import holdStore from "../../stores/holdStore";

//components
import LoanCard from "./LoanCard";
import Pyments from "./Pyments";
import Holds from "../Holds/Holds";
import DetailProfile from "./DetailProfile";

// Modals
import LoanModal from "../Modal/LoanModal";
import HoldModaal from "../Modal/HoldModaal";

class PartDetaile extends Component {
  participants = this.props.participants;
  partID = this.props.match.params.partID;

  componentDidMount() {
    masterStore.fetchLoans(this.partID);
    holdStore.fetchHolds(this.partID);
  }

  loanCards = () => {
    if (!masterStore.loadingLoans) {
      return masterStore.LoanList.map((loan) => {
        return <LoanCard key={loan.id} loan={loan} />;
      });
    }
  };

  choosemodal = () => {
    if (holdStore.showHoldModal) {
      return <HoldModaal partID={this.partID} />;
    } else {
      return <LoanModal partID={this.partID} />;
    }
  };

  render() {
    // console.log("part=",masterStore.partObj )
    // console.log("loanobj=",masterStore.LoanObj)
    return (
      <div>
        {/*   modal ---------------- modal  */}

        {this.choosemodal()}

        {/*   modal ---------------- modal  */}

        <Container>
          <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
            {/* ---------------- Home tab------------------ */}
            <Tab eventKey="profile" title="Profile">
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
                  Edit name
                </Button>

                <Card.Body>
                  <Row>
                    <DetailProfile
                      participants={masterStore.partObj}
                      key={masterStore.partObj.id}
                    />
                  </Row>
                </Card.Body>
              </Card>
            </Tab>

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
                  Add Loan
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

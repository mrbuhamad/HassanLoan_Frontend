import React, { Component } from "react";
import { observer } from "mobx-react";

import { Container, Spinner, Table, Badge } from "react-bootstrap";

//store
import masterStore from "../../stores/masterStore";

// Components
import CashFlowCard from "./CashFlowCard";

// style
import style from "../style";

class Home extends Component {
  render() {
    if (masterStore.loadingcashflow) {
      return <Spinner animation="border" variant="primary" size="l" />;
    } else {
      const cashflow = masterStore.cashflow.map((item, index) => {
        return <CashFlowCard item={item} index={index} />;
      });
      const lastarray = masterStore.cashflow[masterStore.cashflow.length - 1];

      return (
        <Container>
          <Container style={style.Balance}>
            <h4>
              Current Banck balance :{" "}
              <Badge variant="secondary"> {lastarray.balance} KD</Badge>
            </h4>
          </Container>
          <Container fluid>
            <Table responsive bordered size="sm" style={style.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Participant</th>
                  <th>Amount</th>
                  <th>Reasoning</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>{cashflow}</tbody>
            </Table>
          </Container>
        </Container>
      );
    }
  }
}
export default observer(Home);

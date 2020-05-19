import React, { Component } from "react";
import { observer } from "mobx-react";

import { Container, Spinner, Table, Badge } from "react-bootstrap";

//store
import masterStore from "../../stores/masterStore";

// Components
import CashFlowCard from "./CashFlowCard";
import PieChart from "./PieChart";

// style
import style from "../style";

class Home extends Component {
  render() {
    if (masterStore.loadingcashflow) {
      return <Spinner animation="border" variant="primary" size="l" />;
    } else {
      const cashflow = masterStore.cashflow.Cash_flow.map((item, index) => {
        return <CashFlowCard item={item} index={index} />;
      });
      const summery = masterStore.cashflow;
      const bankBalance = summery.Banck_Balance;
      const Assets = summery.Total_Hold;

      return (
        <Container>
          <Container style={style.Balance}>
            <h4>
              Current Banck balance :{" "}
              <Badge variant="secondary"> {bankBalance} KD</Badge>
            </h4>
            <h4>
              Total Assets : <Badge variant="secondary"> {Assets} KD</Badge>
            </h4>
          </Container>
          <Container>
            <PieChart />
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

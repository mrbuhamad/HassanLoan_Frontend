import React, { Component } from "react";
import { observer } from "mobx-react";

import { Table, Spinner } from "react-bootstrap";

//store
import masterStore from "../../stores/masterStore";
import pymentsStore from "../../stores/paymentsStore";

// components
import PymentsCard from "./PymentsCard";

class Pyments extends Component {
  render() {
    const pyments = pymentsStore.payments.map((pyment, index) => {
      return <PymentsCard pyment={pyment} index={index} />;
    });

    if (pymentsStore.showPayments) {
      return masterStore.loadingLoans ? (
        <Spinner animation="border" variant="primary" size="l" />
      ) : (
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Pyment date</th>
              <th>Pyment Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{pyments}</tbody>
        </Table>
      );
    } else {
      return null;
    }
  }
}
export default observer(Pyments);

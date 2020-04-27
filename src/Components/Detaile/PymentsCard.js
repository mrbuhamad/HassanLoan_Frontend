import React, { Component } from "react";
import { observer } from "mobx-react";
import { TrashFill } from "react-bootstrap-icons";

import { Table, Col, Spinner } from "react-bootstrap";

//store
import pymentsStore from "../../stores/paymentsStore";

class PymentsCard extends Component {
  render() {
    return pymentsStore.loadingPayments ? (
      <Spinner animation="border" variant="primary" size="l" />
    ) : (
      <tr>
        <td>1</td>
        <td>{this.props.pyment.date}</td>
        <td>{this.props.pyment.pyment}</td>
        <td>
          <TrashFill color="red" size={25} />
        </td>
      </tr>
    );
  }
}
export default observer(PymentsCard);

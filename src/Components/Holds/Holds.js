import React, { Component } from "react";
import { observer } from "mobx-react";

import { Table, Spinner } from "react-bootstrap";

//store
import holdStore from "../../stores/holdStore";

// components
import HoldCard from "./HoldCard";

class Holds extends Component {
  holdCards = () => {
    if (holdStore.LoandignHold) {
      return <Spinner animation="border" variant="primary" size="3" />;
    } else {
      return holdStore.Hoalds.map((hold, index) => {
        return <HoldCard hold={hold} index={index} />;
      });
    }
  };

  render() {
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Pyment date</th>
            <th>Pyment Amount</th>
            <th>As</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{this.holdCards()}</tbody>
      </Table>
    );
  }
}
export default observer(Holds);

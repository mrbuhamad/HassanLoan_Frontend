import React, { Component } from "react";
import { observer } from "mobx-react";

class CashFlowCard extends Component {
  render() {
    return (
      <>
        <tr>
          <td>{this.props.index + 1}</td>
          <td>{this.props.item.date}</td>
          <td>{this.props.item.participant}</td>
          <td>{this.props.item.amount}</td>
          <td>{this.props.item.reasoning}</td>
          <td>{this.props.item.balance}</td>
        </tr>
      </>
    );
  }
}
export default observer(CashFlowCard);

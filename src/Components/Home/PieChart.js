import React, { Component } from "react";
import { observer } from "mobx-react";
import { Doughnut } from "react-chartjs-2";

//store
import masterStore from "../../stores/masterStore";

class CashFlowCard extends Component {
  summery = masterStore.cashflow;

  Total_Profit = this.summery.Total_Profit;
  loan_Hold = this.summery.loan_Hold;
  Capital_Hold = this.summery.Capital_Hold;

  data = {
    labels: ["Total_Profit", "loan_Hold", "Capital_Hold"],
    datasets: [
      {
        data: [this.Total_Profit, this.loan_Hold, this.Capital_Hold],
        backgroundColor: [
          "rgba(63, 63, 191, 0.7)",
          "rgba(127, 63, 191, 0.7)",
          "rgba(63, 127, 191, 0.9)",
        ],
        label: ["Total_Profit", "loan_Hold", "Capital_Hold"],
      },
    ],
  };
  render() {
    return (
      <>
        <Doughnut data={this.data} />
      </>
    );
  }
}
export default observer(CashFlowCard);

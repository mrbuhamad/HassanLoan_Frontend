import { decorate, observable } from "mobx";
import { instance } from "./instance";

class PaymentsStore {
  showPayments = false;
  Hoalds = [];
  payments = [];
  LoandignHold = true;
  loadingPayments = true;

  fetchPayments = async (loan_id) => {
    try {
      const res = await instance.get(`loan/${loan_id}/pyments/`);
      this.payments = res.data.pyments;
      this.loadingPayments = false;
    } catch (err) {
      console.error(err);
    }
  };

  addPayment = async (data) => {
    try {
      const res = await instance.post("loan/create", data);
    } catch (err) {
      console.error(err);
    }
  };
  handleShow = () => {
    this.showPayments = !this.showPayments;
  };
}

decorate(PaymentsStore, {
  Hoalds: observable,
  payments: observable,
  LoandignHold: observable,
  loadingPayments: observable,
  showPayments: observable,
});

const paymentsStore = new PaymentsStore();
export default paymentsStore;

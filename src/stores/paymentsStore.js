import { decorate, observable } from "mobx";
import { instance } from "./instance";

class PaymentsStore {
  showPayments = false;
  showUpdateCard = false;
  showPymentModal = false;
  loadingPayments = true;
  payments = [];
  editLoanobj = {};

  fetchPayments = async (loan_id) => {
    try {
      const res = await instance.get(`loan/${loan_id}/pyments/`);
      this.payments = res.data.pyments;
      this.loadingPayments = false;
    } catch (err) {
      console.error(err);
    }
  };

  clearPayment = () => {
    this.payments = [];
    this.loadingPayments = true;
  };

  addPayment = async (data) => {
    console.log("pyment data", data);
    try {
      const res = await instance.post("pyments/create", data);
      this.payments.push(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  deletePyment = async (pyment_id, index) => {
    try {
      await instance.delete(`pyments/${pyment_id}/delete`);
      this.payments.splice(index, 1);
    } catch (err) {
      console.error(err);
    }
  };
  handleShow = () => {
    this.showPayments = true;
  };

  handleShowUpdate = (obj) => {
    this.showUpdateCard = true;
    this.editLoanId = obj;
  };

  handlecloseUpdate = () => {
    this.showUpdateCard = false;
    this.editLoanId = {};
  };

  handleShowModal = () => {
    this.showPymentModal = true;
  };

  handleCloseModal = () => {
    this.showPymentModal = false;
  };
}

decorate(PaymentsStore, {
  payments: observable,
  loadingPayments: observable,
  showPayments: observable,
  showUpdateCard: observable,
  editLoanId: observable,
  showPymentModal: observable,
});

const paymentsStore = new PaymentsStore();
export default paymentsStore;

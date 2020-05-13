import { decorate, observable } from "mobx";
import { instance } from "./instance";

class LoanStore {
  activLoans = [];
  Loans = [];
  LoanObj = {};
  loandignActiv = true;
  loadingLoans = true;
  showLoanModal = false;
  showeditLoanModal = false;

  fetchActivLoans = async () => {
    try {
      const res = await instance.get("activLoans/");
      this.activLoans = res.data;
      this.loandignActiv = false;
    } catch (err) {
      console.error(err);
    }
  };

  fetchLoans = async (part_id) => {
    try {
      const res = await instance.get(`participants/${part_id}/loans/`);
      this.Loans = res.data;
      this.loadingLoans = false;
    } catch (err) {
      console.error(err);
    }
  };

  addLoan = async (data) => {
    try {
      const res = await instance.post("loan/create", data);
      const Loan = res.data;
      this.Loans.loans.push(Loan);
    } catch (err) {
      console.error(err);
    }
  };

  editLoan = async (loan_id, data) => {
    try {
      const res = await instance.put(`loan/${loan_id}/update`, data);
      let obj = this.Loans.loans.find((obj) => obj.id === loan_id);
      const loans = this.Loans.loans.filter((loan) => loan.id !== obj.id);
      loans.push(res.data);
      this.Loans.loans = loans;
    } catch (err) {
      console.error(err);
    }
  };

  handleCloseLoan = () => (this.showLoanModal = false);

  handleShowLoan = () => (this.showLoanModal = true);

  handleCloseEditLoan = () => (this.showeditLoanModal = false);

  handleShowEditLoan = (id) => {
    this.LoanObj = this.Loans.loans.find((obj) => obj.id === id);
    this.showeditLoanModal = true;
  };

  get LoanList() {
    return this.Loans.loans.sort((a, b) => b.date - a.date);
  }
}

decorate(LoanStore, {
  activLoans: observable,
  loandignActiv: observable,
});

const loanStore = new LoanStore();
loanStore.fetchActivLoans();
export default loanStore;

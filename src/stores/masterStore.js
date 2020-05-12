import { decorate, observable, computed } from "mobx";
import { instance } from "./instance";

class MasterStore {
  participants = [];
  Loans = [];
  partObj = {};
  LoanObj = {};
  loadingPart = true;
  loadingLoans = true;
  showLoanModal = false;
  showeditLoanModal = false;

  fetchParticipants = async () => {
    try {
      const res = await instance.get("participants/");
      this.participants = res.data;
      this.loadingPart = false;
    } catch (err) {
      console.error(err);
    }
  };
  addParticipants = async (data) => {
    try {
      const res = await instance.post("participants/create/", data);
      const participant = res.data;
      this.participants.push(participant);
    } catch (err) {
      console.error(err);
    }
  };

  specifyPart = (id) => {
    this.partObj = this.participants.find((obj) => obj.id === id);
    localStorage.setItem("partObj", JSON.stringify(this.partObj));
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
      // let index = this.Loans.loans.findIndex((obj) => obj.id === loan_id);
      let obj = this.Loans.loans.find((obj) => obj.id === loan_id);
      const loans = this.Loans.loans.filter((loan) => loan.id !== obj.id);
      loans.push(res.data);
      console.log("1", loans);
      this.Loans.loans = loans;
      // this.Loans[0].loans.splice(index, 1, res.data);
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

  refreshMethod = () => {
    const partObj = JSON.parse(localStorage.getItem("partObj"));
    if (partObj) {
      this.partObj = partObj;
    }
  };

  get participantsList() {
    return this.participants.sort((a, b) => b.active_loans - a.active_loans);
  }

  get LoanList() {
    return this.Loans.loans.sort((a, b) => b.date - a.date);
  }
}

decorate(MasterStore, {
  participants: observable,
  loadingPart: observable,
  Loans: observable,
  loadingLoans: observable,
  showLoanModal: observable,
  showeditLoanModal: observable,
  LoanObj: observable,
  participantsList: computed,
  LoanList: computed,
});

const masterStore = new MasterStore();
masterStore.fetchParticipants();
masterStore.refreshMethod();
export default masterStore;

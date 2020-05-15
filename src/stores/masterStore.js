import { decorate, observable, computed } from "mobx";
import { instance } from "./instance";

class MasterStore {
  participants = [];
  filteredPart = [];
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
      localStorage.setItem("partlist", JSON.stringify(this.participants));
    } catch (err) {
      console.error(err);
    }
  };

  specifyPart = (id) => {
    this.partObj = this.participants.find((obj) => obj.id === id);
    localStorage.setItem("partObj", JSON.stringify(this.partObj));
  };

  filterPart = (query) => {
    this.filteredPart = this.participants;
    const filteredPart = this.participants.filter((part) => {
      return part.name.toLowerCase().includes(query.toLowerCase());
    });

    filteredPart.sort((a, b) => b.active_loans - a.active_loans);
    this.filteredPart = filteredPart;
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

  refreshMethod = () => {
    const partObj = JSON.parse(localStorage.getItem("partObj"));
    const partlist = JSON.parse(localStorage.getItem("partlist"));
    if (partObj && partlist) {
      this.partObj = partObj;
      this.participants = partlist;
    }
  };
  get PartList() {
    if (this.filteredPart.length === 0) {
      return this.participants.sort((a, b) => b.active_loans - a.active_loans);
    } else {
      return this.filteredPart;
    }
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
  filteredPart: observable,
  PartList: computed,
  LoanList: computed,
});

const masterStore = new MasterStore();
masterStore.fetchParticipants();
masterStore.refreshMethod();
export default masterStore;

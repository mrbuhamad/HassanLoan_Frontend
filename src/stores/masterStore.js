import { decorate, observable } from "mobx";
import { instance } from "./instance";

class MasterStore {
  participants = [];
  Loans = [];
  partObj={}
  loadingPart = true;
  loadingLoans = true;
  showLoanModal = false;

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
  
  specifyPart =(id)=>{
   this.partObj= this.participants.find(obj =>obj.id===id)
  }

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
    console.log("add loan row data", data);
    try {
      const res = await instance.post("loan/create", data);
      const Loan = res.data;
      console.log("add loan post post data", Loan);

      this.Loans.loans.push(Loan);
    } catch (err) {
      console.error(err);
    }
  };

  handleCloseLoan = () => (this.showLoanModal = false);

  handleShowLoan = () => (this.showLoanModal = true);
}

decorate(MasterStore, {
  participants: observable,
  loadingPart: observable,
  Loans: observable,
  loadingLoans: observable,
  showLoanModal: observable,
});

const masterStore = new MasterStore();
masterStore.fetchParticipants();
export default masterStore;

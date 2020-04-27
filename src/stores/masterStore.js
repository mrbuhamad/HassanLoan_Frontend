import { decorate, observable } from "mobx";
import { instance } from "./instance";

class MasterStore {
  participants = [];
  Loans = [];
  loadingPart = true;
  loadingLoans = true;

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
}

decorate(MasterStore, {
  participants: observable,
  loadingPart: observable,
  Loans: observable,
  loadingLoans: observable,
});

const masterStore = new MasterStore();
masterStore.fetchParticipants();
export default masterStore;

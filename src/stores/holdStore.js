import { decorate, observable } from "mobx";
import { instance } from "./instance";

class HoldStore {
  Hoalds = [];
  LoandignHold = true;
  showHoldModal = false;
  reasoning = "";

  fetchHolds = async (part_id) => {
    try {
      const res = await instance.get(`participants/${part_id}/hold/`);
      this.Hoalds = res.data.hold_amounts;
      this.LoandignHold = false;
    } catch (err) {
      console.error(err);
    }
  };

  addHold = async (data) => {
    try {
      const res = await instance.post("hold/create", data);
      this.Hoalds.push(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  addHoldFLoan = (hold) => {
    const loanHold = {
      part_hold_amoun: hold.hold_amount,
      reasoning: "throu loan",
      date: hold.data,
    };
    this.Hoalds.push(loanHold);
  };

  deleteHold = async (hold_id, index) => {
    try {
      await instance.delete(`hold/${hold_id}/delete`);
      this.Hoalds.splice(index, 1);
    } catch (err) {
      console.error(err);
    }
  };

  handleCloseHold = () => (this.showHoldModal = false);

  handleShowHoldAdd = () => {
    this.showHoldModal = true;
    this.reasoning = "capital increase";
  };

  handleShowHoldWd = () => {
    this.showHoldModal = true;
    this.reasoning = "capital withdraw";
  };
}

decorate(HoldStore, {
  Hoalds: observable,
  LoandignHold: observable,
  showHoldModal: observable,
  reasoning: observable,
});

const holdStore = new HoldStore();
export default holdStore;

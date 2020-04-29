import { decorate, observable } from "mobx";
import { instance } from "./instance";

class HoldStore {
  Hoalds = [];
  LoandignHold = true;
  showHoldModal = false;

  fetchHolds = async (part_id) => {
    try {
      const res = await instance.get(`participants/${part_id}/hold/`);
      this.Hoalds = res.data.hold_amounts;
      this.LoandignHold = false;
      console.log("Hoalds", res.data);
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

  deleteHold = async (pyment_id, index) => {
    try {
      await instance.delete(`pyments/${pyment_id}/delete`);
      this.payments.splice(index, 1);
    } catch (err) {
      console.error(err);
    }
  };

  handleCloseHold = () => (this.showHoldModal = false);

  handleShowHold = () => (this.showHoldModal = true);
}

decorate(HoldStore, {
  Hoalds: observable,
  LoandignHold: observable,
  showHoldModal: observable,
});

const holdStore = new HoldStore();
export default holdStore;

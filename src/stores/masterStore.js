import { decorate, observable } from "mobx";
import { instance } from "./instance";

class MasterStore {
  participants = [];
  loadingPart = true;

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
      console.log(data);
      const res = await instance.post("participants/create/", data);
      const participant = res.data;
      this.participants.push(participant);
    } catch (err) {
      console.error(err);
    }
  };
}

decorate(MasterStore, {
  participants: observable,
  loadingPart: observable,
});

const masterStore = new MasterStore();
masterStore.fetchParticipants();
export default masterStore;

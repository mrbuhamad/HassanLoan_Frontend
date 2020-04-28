import axios from "axios";

export const instance = axios.create({
  baseURL: "http://hassan-loandomain.com/api/",
});

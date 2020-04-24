import axios from "axios";

export const instance = axios.create({
  baseURL: "http://64.225.110.47/api/",
});

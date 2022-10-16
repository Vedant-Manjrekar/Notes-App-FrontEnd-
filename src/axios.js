import axios from "axios";

const instance = axios.create({
  baseURL: "https://notes-applicationn.herokuapp.com",
});

export default instance;

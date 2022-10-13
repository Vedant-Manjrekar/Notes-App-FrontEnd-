import axios from "axios";

const instance = axios.create({
  baseURL: "https://notes-web-application1.herokuapp.com",
});

export default instance;

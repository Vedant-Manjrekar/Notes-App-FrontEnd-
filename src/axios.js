import axios from "axios";

const instance = axios.create({
  baseURL: "https://notes-app-six-rho.vercel.app",
});

export default instance;

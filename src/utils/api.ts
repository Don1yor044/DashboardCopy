import axios from "axios";
const baseURL = axios.create({
  baseURL: "https://api.abusahiy.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export default baseURL;

import axios from "axios";
const baseURL = axios.create({
  baseURL: "https://api.abusahiy.uz",
  headers: {
    "Content-Type": "application/json",
  },
});

export default baseURL;

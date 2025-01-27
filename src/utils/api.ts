import axios from "axios";
const baseURL = axios.create({
  baseURL: "https://mubashshir3767.jprq.site",
  headers: {
    "Content-Type": "application/json",
  },
});

export default baseURL;

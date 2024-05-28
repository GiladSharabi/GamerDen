const axios = require("axios");

const instance = axios.create({
  baseURL: "https://localhost:8080/api/",
});
export default instance;

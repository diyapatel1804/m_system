import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5089/api"
});

export default API;
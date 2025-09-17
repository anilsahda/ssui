import axios from "axios";
import useAuthStore from "./store/useAuthStore";

const API = axios.create({ baseURL: "https://localhost:7071/api" }); // .Net API Url
//const API = axios.create({ baseURL: "http://localhost:4000/api" }); // Node API Url

API.interceptors.request.use((req) => {
  const token = useAuthStore.getState().token;
  if (token) 
    req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
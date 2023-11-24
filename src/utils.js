import axios from "axios";
import Cookies from "js-cookie";
const customFetch = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://aforke-fidelity-app.onrender.com",
  
});
customFetch.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log(token)
    }
    return config;
  }
  //  (error) => Promise.reject(error)
);
export default customFetch;

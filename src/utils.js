import axios from 'axios'
const customFetch = axios.create({
  // baseURL:"http://localhost:5000"
  baseURL: "https://aforke-fidelity-app.onrender.com",
});
export default customFetch
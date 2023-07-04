import axios from 'axios'
const customFetch = axios.create({
  baseURL:"http://localhost:5000"
  // baseURL: "https://bank-node-app.onrender.com",
});
export default customFetch
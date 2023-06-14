import axios from 'axios'
const customFetch = axios.create({
  baseURL:"http://localhost:5000"
  // baseURL:"https://aforke-bank-react-app.netlify.app/"
  // baseURL: "https://bank-node-app.onrender.com",
});
export default customFetch
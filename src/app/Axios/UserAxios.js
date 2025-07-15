import axios from "axios";

const UserAxios = axios.create({
  // baseURL: "http://localhost:5000/user/",
  baseURL:"https://taxi-booking-server.onrender.com",
  headers: { "Content-Type": "Application/json" }
});

export default UserAxios;

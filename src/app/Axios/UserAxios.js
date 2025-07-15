import axios from "axios";

const UserAxios = axios.create({
  baseURL: "http://localhost:5000/user/",
  headers: { "Content-Type": "Application/json" }
});

export default UserAxios;

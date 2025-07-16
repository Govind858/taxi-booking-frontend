import axios from "axios"

const DriverAxios = axios.create({
    baseURL:"http://localhost:5000/taxi-driver/",
    // baseURL:"https://taxi-booking-server.onrender.com",
    headers:{"Content-Type":"Application/json"}
})

export default DriverAxios
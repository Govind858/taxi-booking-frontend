import axios from "axios"

const DriverAxios = axios.create({
    baseURL:"http://localhost:5000/taxi-driver/",
    headers:{"Content-Type":"Application/json"}
})

export default DriverAxios
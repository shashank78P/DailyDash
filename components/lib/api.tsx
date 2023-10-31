import axios from "axios";
// import * from "dotenv/config"
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    // + '/api',
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-headers': true,
        'Content-Type': 'application/json',
    }

});
export default api;

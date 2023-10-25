import axios from "axios";
// import * from "dotenv/config"
console.log("process.env.NEXT_PUBLIC_BACKEND_API_URL =>", process.env.NEXT_PUBLIC_BACKEND_API_URL)
const apiFromData = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    // + '/api',
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'multipart/form-data',
        'type':"formData"
    }

});
export default apiFromData;
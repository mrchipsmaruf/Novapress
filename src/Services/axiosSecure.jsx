import axios from "axios";
import UseAuth from "../Hooks/UseAuth";


const axiosSecure = axios.create({
    baseURL: "http://localhost:3000"
});

axiosSecure.interceptors.request.use(async (config) => {
    const currentUser = UseAuth.currentUser;

    if (currentUser) {
        const token = await currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosSecure;

import axios from "axios";

// axios instance creation
const axiosInstance = axios.create({
    // baseURL: 'http://localhost:5000/api',
    baseURL: 'https://quickcart-backend-5qqz.onrender.com/api',
    // timeout: 5000  //seting timout for the request
});

// Interceptor here for the axios (Optional)
axiosInstance.interceptors.request.use(
    (config) => {
        //we can attacth the auth-token here or can modify the header here 
        const token = localStorage.getItem("auth-token");
        if(token) {
            // config.headers["auth-token"] = `Bearer ${token}`;
            config.headers["auth-token"] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1YWE5ODhlODc4ZmZmMmMzZTJiMWIwIn0sImlhdCI6MTczNDAwMDMxMH0.O5Hh1vbYavl2lApBkLTQ-wngqHvTlwuFAjCLULQ8doE';
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
);

axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        console.error("Axios Error: ", error.response || error.message)
        return Promise.reject(error);  // handle error response globally here
    }
);

export default axiosInstance;
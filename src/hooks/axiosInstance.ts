import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});


axiosInstance.interceptors.request.use(
    (config) => {

        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => {

        return response;
    },
    (error) => {

        if (error.response.status === 401) {

            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

import axios, { AxiosInstance } from 'axios';
const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/v1/'
});

instance.defaults.headers.post['Content-Type'] = 'application/json';

export default instance;
import axios from 'axios';
import store from '../store';
import { push } from 'connected-react-router';

const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 80000
});

service.interceptors.request.use(
    config => config,
    error => {
        console.log(error);
        Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => response,
    error => {
        const { status } = error.response;
        if (status <= 504 && status >= 500) {
            store.dispatch(push('/exception/500'));
        }
        return Promise.reject(error);
    }
);

export default service;

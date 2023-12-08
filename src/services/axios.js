import axios from 'axios';
import { getToken, getRefreshToken, updateToken } from './token';
import process from 'process';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    timeout: 10000,
    validateStatus: function (status) {
        return (status >= 200 && status <= 400 ) || status === 404 
    }
});
instance.interceptors.request.use(
    (config) => {
        const token = getToken();

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalConfig = error?.config;

        if (error.response && error.response.status === 401) {
            const refreshToken = getRefreshToken();
            if (refreshToken) {
                try {
                    const response = await axios.post('http://localhost:8080/api/v1/auth/refresh-token', {
                        refreshToken: refreshToken
                    });
                    if (response.data?.statusCode ===200) {
                        const acessToken = response.data.data.accessToken;
                        updateToken(acessToken);
                        originalConfig.headers['Authorization'] = `Bearer ${acessToken}`;
                        return axios(originalConfig);
                    } else {
                        console.error('Refresh token response is missing accessToken', response);
                        return Promise.reject(error);
                    }
                } catch (refreshError) {
                    localStorage.removeItem('accessToken')
                    localStorage.removeItem('refreshToken')
                    localStorage.removeItem('persist:root')
                    window.location.reload()
                    console.error('Refresh token failed', refreshError);
                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
);
export default instance;

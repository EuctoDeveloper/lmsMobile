import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { clear_storage, LOGIN_URL, NO_TOKEN_URL } from "../../constants/helper";
import { InternalAxiosRequestConfig } from "axios";
import * as SecureStore from 'expo-secure-store';
import { router } from "expo-router";


// const axios_config = axios.create({
//     baseURL: `${window.location.protocol}//${window.location.hostname}`
// })


const axios_config = axios.create({
    baseURL: `https://staging.visionfundindia.in`
});

const redirect_to_login = (): void => {
    router.push("/Pages/login");
}




axios_config.interceptors.request.use(async (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (config.url && NO_TOKEN_URL.includes(config.url.split("/").pop() || "")) {
        return config;
    }
    const token = await SecureStore.getItemAsync("accessToken");
    if (!token) {
        // redirect_to_login();
    } else {
        config.headers.set('Authorization', `${token}`);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axios_config.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
    return response;
}, async (error) => {
    if (error.response && error.response.status === 403) {
        const refreshToken = await SecureStore.getItemAsync("refreshToken");
        if (refreshToken) {
            return axios.get('/auth/refresh', {
                headers: {
                    'refresh-token': refreshToken
                }
            })
            .then(async (res: AxiosResponse) => {
                if (res.status === 200) {
                    await SecureStore.setItemAsync("accessToken", res.data.accessToken);
                    await SecureStore.setItemAsync("refreshToken", res.data.refreshToken);
                    error.config.headers['Authorization'] = res.data.accessToken;

                    return axios(error.config);
                } else {
                    await clear_storage();
                    redirect_to_login();
                }
            })
            .catch(async () => {
                await clear_storage();
                redirect_to_login();
            });
        } else {
            await clear_storage();
            redirect_to_login();
        }
    }
    return Promise.reject(error);
});

export default axios_config;
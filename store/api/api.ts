import axios from "./axios";

export const getApi = (url, auth=false) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${auth ? "/auth" : ""}${url}`)
            .then((response) => {
                if (response.data && response.data.error) reject(response.data.error);
                else resolve(response.data);
            })
            .catch((e) => reject(e));
    });

export const postApi = (url, data, auth=false) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${auth ? "/auth" : ""}${url}`, data)
            .then((response) => {
                if (response.data && response.data.error) reject(response.data.error);
                else resolve(response.data);
            })
            .catch((e) => reject(e));
    });

export const putApi = (url, data, auth=false) =>
    new Promise((resolve, reject) => {
        axios
            .put(`${auth ? "/auth" : ""}${url}`, data)
            .then((response) => {
                if (response.data && response.data.error) reject(response.data.error);
                else resolve(response.data);
            })
            .catch((e) => reject(e));
    });

export const deleteApi = (url, auth=false) =>
    new Promise((resolve, reject) => {
        axios
            .delete(`${auth ? "/auth" : ""}${url}`)
            .then((response) => {
                if (response.data && response.data.error) reject(response.data.error);
                else resolve(response.data);
            })
            .catch((e) => reject(e));
    });

import { API_URL } from "../../config";
import axios from "axios";

function apiCaller(method: string, endpoint: string, body: object, params: object, headers: object) {
    const url: string = `${API_URL}${endpoint}`;
    return axios({
        method,
        url,
        data: body,
        params,
        headers,
    });
}

export const get = (endpoint: string, params: object = {}, headers: object = {}) => {
    return apiCaller('GET', endpoint, {}, params, headers);
};

export const post = (endpoint: string, body: object = {}, params: object = {}, headers: object = {}) => {
    return apiCaller('POST', endpoint, body, params, headers);
};

export const put = (endpoint: string, body: object = {}, params: object = {}, headers: object = {}) => {
    return apiCaller('PUT', endpoint, body, params, headers);
};

export const del = (endpoint: string, body: object = {}, params: object = {}, headers: object = {}) => {
    return apiCaller('DELETE', endpoint, body, params, headers);
};

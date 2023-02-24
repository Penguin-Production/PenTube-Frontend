import axios from 'axios';

import { API_URL } from '../../config';

function apiCaller(
	method: string,
	endpoint: string,
	body: object,
	params: object,
	headers: object
) {
	const url = `${API_URL}${endpoint}`;
	console.log(url);
	return axios({
		method,
		url,
		data: Object.assign({}, body),
		params: Object.assign({}, params),
		headers: Object.assign({}, headers),
	});
}

export const get = (endpoint: string, params: object = {}, headers: object = {}) => {
	return apiCaller('GET', endpoint, {}, params, headers);
};

export const post = (
	endpoint: string,
	body: object = {},
	params: object = {},
	headers: object = {}
) => {
	return apiCaller('POST', endpoint, body, params, headers);
};

export const put = (
	endpoint: string,
	body: object = {},
	params: object = {},
	headers: object = {}
) => {
	return apiCaller('PUT', endpoint, body, params, headers);
};

export const del = (
	endpoint: string,
	body: object = {},
	params: object = {},
	headers: object = {}
) => {
	return apiCaller('DELETE', endpoint, body, params, headers);
};

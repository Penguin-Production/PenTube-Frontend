import { get } from './../helper/apiCaller';

const demo = {
	get: async () => {
		const response = await get('/api/');
		return response.data.results[0];
	},
};

export default demo;

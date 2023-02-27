import { Video } from './../dto/video';
import { get } from './../helper/apiCaller';

type searchApi = {
	get: (content: string) => Promise<any>;
};

export const searchApi: searchApi = {
	get: async (content: string) => {
		const endpoint = '/search?content=' + content;
		return get(endpoint);
	},
};

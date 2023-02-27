import { Video } from '../dto/video';
import { ResponseModal } from './../dto/response';
import { get } from './../helper/apiCaller';

export type VideoApi = {
	getAll: () => Promise<ResponseModal<Array<Video>>>;
	getById: (id: string) => Promise<ResponseModal<Video>>;
};
const videoApi: VideoApi = {
	getAll: async () => {
		const endpoint = '/video';
		return await get(endpoint).then((response): ResponseModal<Array<Video>> => response.data);
	},
	getById: async (id: string) => {
		const endpoint = `/video/${id}`;
		return await get(endpoint).then((response): ResponseModal<Video> => response.data);
	},
};

export default videoApi;

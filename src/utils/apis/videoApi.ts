import { Video } from '../dto/video';
import { ResponseModal } from './../dto/response';
import { get } from './../helper/apiCaller';

export type VideoApi = {
	getAll: () => Promise<ResponseModal<Array<Video>>>;
};
const videoApi: VideoApi = {
	getAll: async () => {
		const endpoint = '/video';
		return await get(endpoint).then((response): ResponseModal<Array<Video>> => response.data);
	},
};

export default videoApi;

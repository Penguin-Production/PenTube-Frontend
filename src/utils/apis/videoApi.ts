import { Video } from '../dto/video';
import { LocalStorageUtils } from '../helper/localStorage';
import { ResponseModal } from './../dto/response';
import { get } from './../helper/apiCaller';

export type VideoApi = {
	getAll: () => Promise<ResponseModal<Array<Video>>>;
	getAllByChannelId: (channelId: string) => Promise<ResponseModal<Array<Video>>>;
	getById: (id: string) => Promise<ResponseModal<Video>>;
	getHistory: () => Promise<ResponseModal<Array<Video>>>;
};
const token = LocalStorageUtils.getItem('token');

const videoApi: VideoApi = {
	getAll: async () => {
		const endpoint = '/video';
		return await get(endpoint).then((response): ResponseModal<Array<Video>> => response.data);
	},
	getAllByChannelId: async (channelId: string) => {
		const endpoint = `/video/channel/${channelId}`;
		return await get(endpoint).then((response): ResponseModal<Array<Video>> => response.data);
	},
	getById: async (id: string) => {
		const endpoint = `/video/${id}`;
		return await get(endpoint).then((response): ResponseModal<Video> => response.data);
	},
	getHistory: async () => {
		const endpoint = `/user/histories`;
		return await get(endpoint, {}, { Authorization: 'Bearer ' + token }).then(
			(response): ResponseModal<Array<Video>> => response.data
		);
	},
};

export default videoApi;

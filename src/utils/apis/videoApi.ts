import { Comment, Video } from '../dto/video';
import { LocalStorageUtils } from '../helper/localStorage';
import { ResponseModal } from './../dto/response';
import { del, get, post, put } from './../helper/apiCaller';

export interface CommentUpdateType {
	content?: string;
	authorId?: string;
}
interface VideoUpdateType {
	title?: string;
	description?: string;
}
interface VideoCreateType {
	title: string;
	description: string;
	url: string;
	totalFrame: number;
	status: string;
	channel: string;
	totalViews: number;
}

export type VideoApi = {
	getAll: () => Promise<ResponseModal<Array<Video>>>;
	getAllByChannelId: (channelId: string) => Promise<ResponseModal<Array<Video>>>;
	getById: (id: string) => Promise<ResponseModal<Video>>;
	createVideo: (body: VideoCreateType) => Promise<ResponseModal<Video>>;
	postComment: (id: string, body: CommentUpdateType) => Promise<ResponseModal<Video>>;
	getComments: (id: string) => Promise<ResponseModal<Comment[]>>;
	updateLike: (id: string, userId: string) => Promise<ResponseModal<Video>>;
	deleteComment: (id: string, commentId: string) => Promise<ResponseModal<Video>>;
	getHistory: () => Promise<ResponseModal<Array<Video>>>;
	updateView: (id: string) => Promise<ResponseModal<Video>>;
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
	createVideo: async (body: VideoCreateType) => {
		const endpoint = '/video';
		return await post(endpoint, body, {}, { Authorization: 'Bearer ' + token }).then(
			(response): ResponseModal<Video> => response.data
		);
	},
	postComment: async (id, body) => {
		const endpoint = `/video/${id}/comments`;
		return await put(endpoint, body, {}, { Authorization: 'Bearer ' + token }).then(
			(response): ResponseModal<Video> => response.data
		);
	},
	getComments: async (id) => {
		const endpoint = `/video/${id}/comments`;
		return await get(endpoint).then((response): ResponseModal<Comment[]> => response.data);
	},
	updateLike: async (id, userId) => {
		const endpoint = `/video/${id}/like`;
		return await post(endpoint, { userId }, {}, { Authorization: 'Bearer ' + token }).then(
			(response): ResponseModal<Video> => {
				console.log(response.data);
				return response.data;
			}
		);
	},
	deleteComment: async (id, commentId) => {
		const endpoint = `/video/${id}/comments/${commentId}`;
		return await del(endpoint, {}, {}, { Authorization: 'Bearer ' + token }).then(
			(response): ResponseModal<Video> => response.data
		);
	},
	getHistory: async () => {
		const endpoint = `/user/histories`;
		return await get(endpoint, {}, { Authorization: 'Bearer ' + token }).then(
			(response): ResponseModal<Array<Video>> => response.data
		);
	},
	updateView: async (id) => {
		const endpoint = `/video/${id}/view`;
		return await put(endpoint, {}, {}, { Authorization: 'Bearer ' + token }).then(
			(response): ResponseModal<Video> => response.data
		);
	},
};

export default videoApi;

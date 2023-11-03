import { LocalStorageUtils } from '../helper/localStorage';
import { del, get, post, put } from './../helper/apiCaller';

type ChannelType = {
	name: string;
	imageUrl: string;
};

const ChannelApi = {
	getListChannel: async () => {
		const token = LocalStorageUtils.getItem('token');
		const response = await get('/channels', {}, { Authorization: 'Bearer ' + token });
		return response.data;
	},
	getChannelById: async (id: string) => {
		const response = await get(`/channels/${id}`, {}, {});
		return response.data;
	},
	createChannel: async (body: ChannelType) => {
		const token = LocalStorageUtils.getItem('token');
		const response = await post('/channels', body, {}, { Authorization: 'Bearer ' + token });
	},
	updateChannel: async (channelId: string, body: ChannelType) => {
		const token = LocalStorageUtils.getItem('token');
		const response = await put(
			`/channels/${channelId}`,
			body,
			{},
			{ Authorization: 'Bearer ' + token }
		);
		return response.data;
	},
	deleteChannel: async (channelId: string) => {
		const token = LocalStorageUtils.getItem('token');
		const response = await del(
			`/channels/${channelId}`,
			{},
			{},
			{ Authorization: 'Bearer ' + token }
		);
		return response.data;
	},
	subscribeChannel: async (channelId: string) => {
		const token = LocalStorageUtils.getItem('token');
		return await post(`/channels/${channelId}`, {}, {}, { Authorization: 'Bearer ' + token });
	},
};

export default ChannelApi;

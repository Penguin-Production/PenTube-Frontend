import { LocalStorageUtils } from '../helper/localStorage';
import { get, post } from './../helper/apiCaller';

type UserUpdateType = {
	name: string;
	email: string;
	avatarUrl: string;
};

const userApi = {
	getInformation: async () => {
		const token = LocalStorageUtils.getItem('token');
		const response = await get('/user/information', {}, { Authorization: 'Bearer ' + token });
		return response.data;
	},
	updateInformation: async (body: UserUpdateType) => {
		const token = LocalStorageUtils.getItem('token');
		const response = await post('/user/update', body, {}, { Authorization: 'Bearer ' + token });
		return response.data;
	},
	updateHistory: async (id: string) => {
		const token = LocalStorageUtils.getItem('token');
		const body = {
			videoId: id,
		};
		const response = await post(
			'/user/update-histories',
			body,
			{},
			{ Authorization: 'Bearer ' + token }
		);
		return response.data;
	},
};

export default userApi;

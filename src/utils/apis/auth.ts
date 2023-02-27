import { post } from '../helper/apiCaller';

type Auth = {
	logout: (token: string, refreshToken: string) => Promise<any>;
};

export const auth: Auth = {
	logout: async (token: string, refreshToken: string) => {
		const endpoint = '/auth/logout';
		return await post(
			endpoint,
			{},
			{},
			{ Authorization: `Bearer ${token}`, RefreshToken: `Bearer ${refreshToken}` }
		);
	},
};

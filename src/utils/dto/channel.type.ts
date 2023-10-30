import { User } from './user';

export type CHANNEL_TYPE = {
	_id: string;
	userId: string | User;
	name: string;
	imageUrl: string;
	subscriber: Array<string | User>;
};

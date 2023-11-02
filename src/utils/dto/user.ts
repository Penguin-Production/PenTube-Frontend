import { StringMap } from 'i18next';

export type User = {
	_id: string;
	name: string;
	role: string;
	status: StringMap;
	avatarUrl: string;
};

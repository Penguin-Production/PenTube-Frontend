import { StringMap } from 'i18next';

export type User = {
	name: string;
	role: string;
	status: StringMap;
	avatarUrl: string;
};

import { StringMap } from 'i18next';

export type User = {
	name: string;
	role: string;
	status: StringMap;
};

export class UserDTO {
	constructor(name: string, role: string, status: string) {}
}

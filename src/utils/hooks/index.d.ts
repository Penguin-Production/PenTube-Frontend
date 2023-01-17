import { SetStateAction, Dispatch } from 'react';

export type UsePersistedState = <T>(
	key: string,
	defaultValue: T | null
) => [T, Dispatch<SetStateAction<T>>];

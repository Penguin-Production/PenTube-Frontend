import { Dispatch, SetStateAction, useState, useEffect } from 'react';

import { LocalStorageUtils } from './../helper/localStorage';

type UsePersistedState = <T>(
	key: string,
	defaultValue: T | null
) => [T, Dispatch<SetStateAction<T>>];

/**
 * Make a local storage state value
 * @param key the key to access the value in local storage
 * @param defaultValue the default value if the value is not available
 * @returns state with the value and the set state function
 */
const usePersistedState: UsePersistedState = <T>(key: string, defaultValue: T | null = null) => {
	const [state, setState] = useState<T>(
		LocalStorageUtils.getItem(key) || (defaultValue as T | null)
	);
	useEffect(() => {
		LocalStorageUtils.setItem(key, state);
	}, [state, setState]);

	return [state, setState];
};

export default usePersistedState;

import { useState, useEffect } from 'react';

import { LocalStorageUtils } from './../helper/localStorage';

const usePersistedState = <T>(key: string, defaultValue: T | Record<string, any> = {}) => {
	const [state, setState] = useState<T>(LocalStorageUtils.getItem(key) || defaultValue);
	useEffect(() => {
		LocalStorageUtils.setItem(key, state);
	}, [state, setState]);

	return [state, setState];
};

export default usePersistedState;

declare interface LocalStorageUtils<T> {
	getItem: (key: string) => T | null;
	setItem: (key: string, value: T) => void;
	removeItem: (key: string) => boolean;
}

export const LocalStorageUtils: LocalStorageUtils<any> = {
	getItem: (key) => {
		const value = localStorage.getItem(key);
		if (!value) return null;
		return JSON.parse(value);
	},
	setItem: (key, value) => {
		localStorage.setItem(key, JSON.stringify(value));
		return value;
	},
	removeItem: (key) => {
		localStorage.removeItem(key);
		return true;
	},
};

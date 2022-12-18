
interface ConfigRuntime {
	readonly API_URL: string;
	readonly NODE_ENV: string;
}
const configRuntime: ConfigRuntime = {
	API_URL: import.meta.env.VITE_API_URL,
	NODE_ENV: import.meta.env.NODE_ENV || 'development',
}
export const { API_URL, NODE_ENV } = configRuntime;
export default configRuntime; 
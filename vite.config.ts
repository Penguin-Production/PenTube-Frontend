import { defineConfig, loadEnv } from 'vite';
import babel from 'vite-plugin-babel';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return defineConfig({
		plugins: [react(), babel()],
	});
};

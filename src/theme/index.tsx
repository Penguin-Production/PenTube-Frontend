import useDarkMode from 'use-dark-mode';

import { createTheme } from '@nextui-org/react';

export const darkTheme = createTheme({
	type: 'dark',
	theme: {
		colors: {
			background: '#1d1d1d',
			primary: '#4ADE7B',
			text: 'white',
			gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
			link: '#5E1DAD',
			myColor: '#ff4ecd',
		},
	},
});

export const lightTheme = createTheme({
	type: 'light',
	theme: {
		colors: {
			background: '#fff',
			text: '#000',
			// you can also create your own color
			gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
			myColor: '#ff4ecd',

			// ...  more colors
		},
	},
});

import { useEffect, useState } from 'react';

import useDarkMode from 'use-dark-mode';

import './App.css';
import Welcome from './pages/Welcome';
import { lightTheme, darkTheme } from './theme';
import demo from './utils/apis/demo';

import { NextUIProvider } from '@nextui-org/react';

const App = () => {
	const darkMode = useDarkMode(false, {
		storageKey: 'theme',
	});
	return (
		<NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
			<Welcome />
		</NextUIProvider>
	);
};

export default App;

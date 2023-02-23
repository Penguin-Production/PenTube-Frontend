import React, { useEffect, useState } from 'react';

import useDarkMode from 'use-dark-mode';

import './App.css';
import Welcome from './pages/Welcome';
import Router from './routes';
import { lightTheme, darkTheme } from './theme';

import { NextUIProvider } from '@nextui-org/react';

const App = () => {
	const darkMode = useDarkMode(false);
	return (
		<NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
			<Router />
		</NextUIProvider>
	);
};

export default App;
